export interface CategorySubscription {
  category_subscription_id: number;
  customer_id: number;
  oc_category_id: number;
  oc_sub_category_id: number;
  transaction_image: string;
  verification_period: number;
  verified_by: number;
  verified_at: string | null;
  STATUS: string;
  created_at: string;
  name: string;
  category_name: string;
  sub_name: string;
}
