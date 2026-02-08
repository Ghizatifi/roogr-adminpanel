interface IsActivated {
  account: boolean;
  email: boolean;
}


export interface Follower {
  id: number;
  name: string;
  email: string;
  phone: string;
  telephone: string;
  type: string;
  isActivated: IsActivated;
  status: number;
  isBanned: boolean;
  ban_reason: string;
  regDate: string;
  address: string;
  countery_id: number | null;
  bio: string;
  rating: number;
  image: string;
  alias: string;
}