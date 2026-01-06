/**
 * TechNova Payment Service - TBC Bank Integration
 * This service handles interactions with TBC Bank Checkout API.
 */

const TBC_APP_ID = "e34c8477-572e-402f-8c14-f76cc1747a97";
const TBC_API_KEY = "wMnH0x3XcYN7XCJG0OBrKWrfeL7Y6yEt";

export interface PaymentInitiationResponse {
  success: boolean;
  redirectUrl?: string;
  error?: string;
}

/**
 * TBC PAYMENT: Redirects user to the secure TBC Checkout page.
 */
export const initiateTBCPayment = async (amount: number): Promise<PaymentInitiationResponse> => {
  console.log(`[PAYMENT] თიბისი გადახდის ინიცირება: ${amount} GEL`);

  try {
    const tbcCheckoutUrl = `https://checkout.tbcbank.ge/checkout?client_id=${TBC_APP_ID}`;
    window.location.href = tbcCheckoutUrl;

    return {
      success: true,
      redirectUrl: tbcCheckoutUrl
    };
  } catch (error) {
    console.error("TBC redirection failed:", error);
    return {
      success: false,
      error: "ვერ მოხერხდა თიბისის გადახდის გვერდზე გადასვლა."
    };
  }
};

/**
 * MOCK PAYMENT: This fixes the build error in CheckoutPage.tsx
 */
export const initiateMockPayment = async (amount: number): Promise<PaymentInitiationResponse> => {
  return initiateTBCPayment(amount);
};

export const initiateStripePayment = async (amount: number): Promise<PaymentInitiationResponse> => {
  return { success: false, error: "Stripe გადახდა საქართველოში შეზღუდულია." };
};

export const initiateBOGPayment = async (amount: number): Promise<PaymentInitiationResponse> => {
  return { success: false, error: "BOG გადახდა დროებით მიუწვდომელია." };
};