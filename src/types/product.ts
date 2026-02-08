export interface Product {
  price: string;
  id: number;
  date: string;
  thumbnail: string;
  videos: string[];
  isActivated: number;
  is_banned: number;
  date_of_ban: string | null;
  ban_reason: string | null;
  author: string;
  author_id: number;
  isPaid: number;
  product_name: string;
  oc_product_description_description: string;
  oc_product_description_meta_description: string;
  oc_product_description_meta_title: string;
  oc_product_description_keyword: string;
  category_name: string;
  category_id: number;
  category_description: string;
  category_meta_description: string;
  category_meta_title: string;
  category_meta_keyword: string;
  images: string[];
}
