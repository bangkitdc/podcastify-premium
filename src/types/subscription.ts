export type IApiBaseSubscription = {
  creatorID: number;
  subscriberID: number;
  subscriberName: string;
  status: string;
};

export type ISubscriptionRequest = {
  creator_id: number;
  subscriber_id: number;
  status: SUBSCRIPTION_STATUS;
};

export enum SUBSCRIPTION_STATUS {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}
