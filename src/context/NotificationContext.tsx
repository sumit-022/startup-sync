import { createContext, useEffect, useState } from "react";

export type NotificationData = {
  title: string;
  body: string;
  timestamp: number;
};

export type NotificationId = ReturnType<typeof setTimeout>;

export const NotificationContext = createContext<{
  notifications: NotificationData[];
  scheduleNotification: (notification: NotificationData) => NotificationId;
  replaceNotification: (
    id: NotificationId,
    notification: NotificationData
  ) => void;
  deleteNotification: (id: NotificationId) => void;
}>({
  notifications: [],
  scheduleNotification: (notification) => {
    const n = new Notification(notification.title, {
      body: notification.body,
      timestamp: notification.timestamp,
    });
    return setTimeout(() => {}, 0);
  },
  replaceNotification: () => {},
  deleteNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [timers, setTimers] = useState<
    { id: NotificationId; data: NotificationData }[]
  >([]);

  const triggerNotification = (notification: NotificationData) => {
    const n = new Notification(notification.title, {
      body: notification.body,
      timestamp: notification.timestamp,
    });
  };

  // Ask for permission to use notifications
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  const scheduleNotification = (notification: NotificationData) => {
    const id = setTimeout(() => {
      triggerNotification(notification);
      setTimers(timers.filter((timer) => timer.id !== id));
    }, notification.timestamp - Date.now());

    setTimers([...timers, { id, data: notification }]);

    return id;
  };

  const replaceNotification = (
    id: NotificationId,
    notification: NotificationData
  ) => {
    const newId = setTimeout(() => {
      triggerNotification(notification);
      setTimers(timers.filter((timer) => timer.id !== newId));
    });

    setTimers(
      timers.map((timer) => {
        if (timer.id === id) {
          clearTimeout(timer.id);
          return { id: newId, data: notification };
        }
        return timer;
      })
    );
  };

  const deleteNotification = (id: NotificationId) => {
    clearTimeout(id);
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: timers.map((timer) => timer.data),
        scheduleNotification,
        replaceNotification,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
