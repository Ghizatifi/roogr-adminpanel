export interface VerificationRequest {
  verification_request_id: number;
  customer_id: number;
  verification_type: string;
  verification_type_number: string;
  verification_type_image: string;
  verified: number;
  transaction_image: string;
  verification_period: number;
  verified_by: number;
  verified_at: string | null;
  STATUS: string;
  created_at: string;
  verification_required: number;
  customer_name: string | null;
  name: string | null;
}
