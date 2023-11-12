import {
  IApiBaseSubscription,
  SUBSCRIPTION_STATUS,
} from '@/types/subscription';
import { useDispatch } from 'react-redux';
import { addModal, close, show } from '@/redux/modals/reducer';
import { useRef, useState, useEffect } from 'react';
import PrimaryModal from '@/components/shares/modals/Primary';
import TablesHeader from '@/components/shares/tables/TablesHeader';
import TablesData from '@/components/shares/tables/TablesData';
import apiBase from '@/api';

export default function ManageSubscription() {
  const dispatch = useDispatch();

  const [subscriptions, setSubscriptions] = useState<IApiBaseSubscription[]>(
    [],
  );
  const [subscription, setSubscription] = useState<IApiBaseSubscription>();

  // tables data
  const headers = [
    'Subscriber ID',
    'Subscriber Name',
    'Creator ID',
    'Creator Name',
    'Status',
    '',
  ];
  const percentage = [10, 30, 10, 30, 10, 5];
  // colsClass = [col-1, col-2, ...];
  const colsClass = [
    '',
    'hidden lg:table-cell',
    'whitespace-normal',
    'hidden lg:table-cell',
    'hidden sm:table-cell',
    'hidden md:table-cell',
  ];

  // Create modal reference
  const modalManage = useRef('modalManage');
  dispatch(addModal(modalManage.current));

  const onDisplayModal = (subscription: IApiBaseSubscription) => {
    setSubscription(subscription);
    dispatch(show(modalManage.current));
  };

  const onReject = async () => {
    try {
      if (subscription) {
        await apiBase().subscription().updateSubscriptionStatus({
          subscriber_id: subscription.subscriber_id,
          creator_id: subscription.creator_id,
          creator_name: subscription.creator_name,
          status: SUBSCRIPTION_STATUS.REJECTED,
        });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }

    onCancel();
  };

  const onAccept = async () => {
    try {
      if (subscription) {
        await apiBase().subscription().updateSubscriptionStatus({
          subscriber_id: subscription.subscriber_id,
          creator_id: subscription.creator_id,
          creator_name: subscription.creator_name,
          status: SUBSCRIPTION_STATUS.ACCEPTED,
        });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
    onCancel();
  };

  const onCancel = () => {
    dispatch(close(modalManage.current));
  };

  const fetchData = async () => {
    try {
      const subscriptionsData = await apiBase()
        .subscription()
        .getAllSubscriptions();
      setSubscriptions(
        subscriptionsData.data.filter(
          (subscription) => subscription.status === SUBSCRIPTION_STATUS.PENDING,
        ),
      );
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
        (subscription) => subscription.status != SUBSCRIPTION_STATUS.PENDING,
      ) ? (
        <h1 className="text-center mt-12">No Pending Subscriptions</h1>
      ) : (
        <table className="text-clr-text-secondary">
          <TablesHeader
            headers={headers}
            percentage={percentage}
            colsClass={colsClass.slice(1)}
          />
          {subscriptions.map((subscription, i) => {
            if (subscription.status != SUBSCRIPTION_STATUS.PENDING) return;
            const dataContext = [
              'num',
              'subscriber_id',
              'subscriber_name',
              'creator_id',
              'creator_name',
              'status',
            ];

            const dataContent = [
              i + 1,
              subscription.subscriber_id,
              subscription.subscriber_name,
              subscription.creator_id,
              subscription.creator_name,
              subscription.status,
            ];
            return (
              <TablesData
                key={i}
                dataContext={dataContext}
                dataContent={dataContent}
                onClickManage={() => onDisplayModal(subscription)}
                colsClass={colsClass}
              />
            );
          })}
        </table>
      )}

      <PrimaryModal
        key={modalManage.current}
        id={modalManage.current}
        modalContent={
          <div className="flex flex-col gap-4">
            <h2 className="text-left">
              Edit Subscription for {subscription?.subscriber_name} on Creator{' '}
              {subscription?.creator_name}
            </h2>
            <div className="flex justify-between mt-10">
              <div>
                <button
                  className="text-sm font-bold bg-clr-text-danger hover:bg-clr-text-danger/90 py-2 px-6 rounded-full text-clr-text-black border-clr-background-highlight-one"
                  onClick={onReject}
                >
                  Reject
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="px-1 py-2 hover:text-clr-text-primary-darken text-sm"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  className="text-sm font-bold bg-clr-text-info hover:bg-clr-text-info-hover py-2 px-6 rounded-full text-clr-text-black border-clr-background-highlight-one"
                  onClick={onAccept}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
