
/**
 * TechNova Payment Service (API-Ready Structure)
 * 
 * This service handles interactions with payment gateways. 
 * Updated to include Stripe as the primary choice for global real-world payments.
 */

export interface PaymentInitiationResponse {
  success: boolean;
  redirectUrl?: string;
  transactionId?: string;
  clientSecret?: string; // Specific for Stripe
  error?: string;
}

const MOCK_DELAY = 1500;

/**
 * STRIPE API ENDPOINT: /api/pay/stripe
 * Recommended choice for real-world Visa/Mastercard payments.
 */
export const initiateStripePayment = async (amount: number, orderId: string): Promise<PaymentInitiationResponse> => {
  console.log(`[API CALL] POST /api/pay/stripe - Amount: ${amount}, OrderID: ${orderId}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // REAL LOGIC TO ADD ON BACKEND:
      // 1. Initialize Stripe (npm install stripe)
      // 2. Create a PaymentIntent: stripe.paymentIntents.create({ amount, currency: 'usd' })
      // 3. Return the 'client_secret' to the frontend.
      
      resolve({
        success: true,
        transactionId: `STRIPE-${Math.random().toString(36).substr(2, 9)}`,
        clientSecret: "pi_mock_secret_12345", // This would be the real client secret from Stripe
        redirectUrl: "/#/payment-success",
      });
    }, MOCK_DELAY);
  });
};

/**
 * MOCK API ENDPOINT: /api/pay/mock
 */
export const initiateMockPayment = async (amount: number): Promise<PaymentInitiationResponse> => {
  console.log(`[API CALL] POST /api/pay/mock - Amount: ${amount}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `MOCK-${Math.random().toString(36).substr(2, 9)}`,
        redirectUrl: "/#/payment-success", 
      });
    }, MOCK_DELAY);
  });
};

/**
 * TBC API ENDPOINT: /api/pay/tbc
 */
export const initiateTBCPayment = async (amount: number, orderId: string): Promise<PaymentInitiationResponse> => {
  console.log(`[API CALL] POST /api/pay/tbc - Amount: ${amount}, OrderID: ${orderId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `TBC-${Math.random().toString(36).substr(2, 9)}`,
        redirectUrl: "https://checkout.tbcbank.ge/mock-payment-page",
      });
    }, MOCK_DELAY);
  });
};

/**
 * BOG API ENDPOINT: /api/pay/bog
 */
export const initiateBOGPayment = async (amount: number, orderId: string): Promise<PaymentInitiationResponse> => {
  console.log(`[API CALL] POST /api/pay/bog - Amount: ${amount}, OrderID: ${orderId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `BOG-${Math.random().toString(36).substr(2, 9)}`,
        redirectUrl: "https://ipay.ge/mock-payment-page",
      });
    }, MOCK_DELAY);
  });
};
