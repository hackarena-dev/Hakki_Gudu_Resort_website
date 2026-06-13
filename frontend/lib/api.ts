// API Client service layer to interface with the FastAPI backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface UnavailableRange {
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
}

export interface AvailabilityResponse {
  unavailable_ranges: UnavailableRange[];
}

export interface HoldRequest {
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  num_guests: number;
}

export interface HoldResponse {
  reservation_id: string;
  hold_expires_at: string; // ISO date string
  amount_paise: number;
  amount_display: string;
}

export interface CreateOrderResponse {
  razorpay_order_id: string;
  amount_paise: number;
  currency: string;
  key_id: string;
}

export interface BookCashResponse {
  reservation_id: string;
  booking_ref: string;
  message: string;
}

export interface VerifyPaymentRequest {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Helper to handle response errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.detail || `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export const apiService = {
  /**
   * Fetch availability for a specific month (format: YYYY-MM)
   */
  async fetchAvailability(month: string): Promise<AvailabilityResponse> {
    const response = await fetch(`${API_BASE_URL}/availability?month=${month}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse<AvailabilityResponse>(response);
  },

  /**
   * Place a 10-minute hold on a room
   */
  async createHold(data: HoldRequest): Promise<HoldResponse> {
    const response = await fetch(`${API_BASE_URL}/hold`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse<HoldResponse>(response);
  },

  /**
   * Initialize a Razorpay payment order for a reservation
   */
  async createOrder(reservationId: string): Promise<CreateOrderResponse> {
    const response = await fetch(`${API_BASE_URL}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reservation_id: reservationId }),
    });
    return handleResponse<CreateOrderResponse>(response);
  },

  /**
   * Request a cash booking on-site
   */
  async bookCash(data: HoldRequest): Promise<BookCashResponse> {
    const response = await fetch(`${API_BASE_URL}/book-cash`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse<BookCashResponse>(response);
  },

  /**
   * Verify online payment signature callback
   */
  async verifyPayment(data: VerifyPaymentRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/verify-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Payment signature verification failed");
    }
  },
};
