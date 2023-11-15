/* eslint-disable react-hooks/rules-of-hooks */
import { IApiBaseResponse } from '@/types/http';
import { api, support } from './support';
import {
  IApiBaseSubscription,
  ISubscriptionRequest,
} from '@/types/subscription';

const subscription = () => {
  const { apiUrl } = support();

  const url = {
    subscription: apiUrl.subscription,
  };

  const getAllSubscriptions = async () => {
    const response = await api.get<IApiBaseResponse<IApiBaseSubscription[]>>(
      url.subscription,
    );

    return response.data;
  };

  const getSubscribersByCreatorID = async (creatorID: number) => {
    const response = await api.get<IApiBaseResponse<IApiBaseSubscription[]>>(
      url.subscription + '?creator_id=' + creatorID,
    );
    return response.data;
  };

  const updateSubscriptionStatus = async (payload: ISubscriptionRequest) => {
    const response = await api.patch<IApiBaseResponse<IApiBaseSubscription>>(
      url.subscription,
      payload,
    );

    return response.data;
  };

  return {
    getAllSubscriptions,
    getSubscribersByCreatorID,
    updateSubscriptionStatus,
  };
};

export default subscription;
