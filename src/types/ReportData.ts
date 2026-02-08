export interface ReportData {
  report_id: number;
  chat_report_id: number;
  customer_id: number;
  product_id: number;
  content: string;
  created_at: string;
  product_name: string;
  product_image: string; 
  reported: string;
  reporter: string;
  status: number;
  close_date: string | null;
  name: string;
}
