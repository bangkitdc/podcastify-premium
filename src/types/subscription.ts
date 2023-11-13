export type IApiBaseSubscription = {
  creator_id: number;
  creator_name: string;
  subscriber_id: number;
  subscriber_name: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ISubscriptionRequest = {
  creator_id: number;
  creator_name: string;
  subscriber_id: number;
  status: SUBSCRIPTION_STATUS;
};

export enum SUBSCRIPTION_STATUS {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}
