import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PrimaryNotification() {
  const notifications = useSelector(
    (state: RootState) => state.notification
  );

  const [notification, setNotification] = useState({ message: "", type: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notifications.length > 0) {
      setNotification(notifications[notifications.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [notifications]);

  return show ? (
    <div
      className={`fixed top-10 max-sm:top-6 left-1/2 transform -translate-x-1/2 max-sm:w-5/6 text-center rounded-lg py-5 px-6 text-sm font-thin z-50 transition-all shadow-lg bg-clr-text-${notification.type}`}
    >
      <div>
        {notification.message}
      </div>
    </div>
  ) : null;
}