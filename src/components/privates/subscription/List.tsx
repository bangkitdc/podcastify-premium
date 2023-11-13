import {
  IApiBaseSubscription,
  SUBSCRIPTION_STATUS,
} from '@/types/subscription';
import { useState, useEffect } from 'react';
import TablesHeader from '@/components/shares/tables/TablesHeader';
import TablesData from '@/components/shares/tables/TablesData';
import apiBase from '@/api';
import { useAuth } from '@/contexts';

export default function SubscriberList() {
  const [subscriptions, setSubscriptions] = useState<IApiBaseSubscription[]>(
    [],
  );
  const { user } = useAuth();

  // tables data
  const headers = ['Subscriber ID', 'Subscriber Name', 'Subscription Time', ''];
  const percentage = [15, 50, 25, 5];

  // colsClass = [col-1, col-2, ...];
  const colsClass = [
    '',
    'hidden md:table-cell',
    'whitespace-normal',
    'hidden sm:table-cell',
    '',
  ];

  const fetchData = async () => {
    try {
      if (user && user.user_id) {
        const subscriptionsData = await apiBase()
          .subscription()
          .getSubscribersByCreatorID(user.user_id);
        setSubscriptions(
          subscriptionsData.data.filter(
            (subscription) =>
              subscription.status === SUBSCRIPTION_STATUS.ACCEPTED,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // on mounted
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {subscriptions.every(
        (subscription) => subscription.status != SUBSCRIPTION_STATUS.ACCEPTED,
      ) ? (
        <h1 className="text-center mt-12">No Subscribers</h1>
      ) : (
        <table className="text-clr-text-secondary">
          <TablesHeader
            headers={headers}
            percentage={percentage}
            colsClass={colsClass.slice(1)}
          />
          {subscriptions.map((subscription, i) => {
            const dataContext = [
              'num',
              'subscriber_id',
              'subscriber_name',
              'subscription_time',
            ];

            const dataContent = [
              i + 1,
              subscription.subscriber_id,
              subscription.subscriber_name,
              subscription.created_at.replace('T', ' ').replace('Z', ''),
            ];
            return (
              <TablesData
                key={i}
                dataContext={dataContext}
                dataContent={dataContent}
                colsClass={colsClass}
              />
            );
          })}
        </table>
      )}
    </div>
  );
}
