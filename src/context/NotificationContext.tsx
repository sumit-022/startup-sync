import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import { createContext, useEffect, useRef, useState } from "react";

export type NotificationData = {
  title: string;
  body: string;
  timestamp: number;
};

export type JobNotificationData = {
  title?: string;
  body?: string;
  timestamp: number;
  viewed: boolean;
};

export type NotificationId = ReturnType<typeof setTimeout>;

export const NotificationContext = createContext<{
  activeNotifications: NotificationData[];
  scheduleNotification: (
    notification: NotificationData,
    onClear: () => void
  ) => NotificationId;
  replaceNotification: (
    id: NotificationId,
    notification: NotificationData
  ) => void;
  deleteNotification: (id: NotificationId) => void;
  getAllNotifications: () => JobNotificationData[];
}>({
  activeNotifications: [],
  scheduleNotification: (notification) => {
    const n = new Notification(notification.title, {
      body: notification.body,
      timestamp: notification.timestamp,
    });
    return setTimeout(() => {}, 0);
  },
  replaceNotification: () => {},
  deleteNotification: () => {},
  getAllNotifications: () => [],
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [timers, setTimers] = useState<
    { id: NotificationId; data: NotificationData }[]
  >([]);

  const allNotifications = useRef<JobNotificationData[]>([]);

  const triggerNotification = (
    notification: NotificationData,
    onClear: () => void = () => {}
  ) => {
    const n = new Notification(notification.title, {
      body: notification.body,
      timestamp: notification.timestamp,
    });

    n.onclick = () => {
      onClear();
    };

    n.onclose = () => {
      onClear();
    };
  };

  // Ask for permission to use notifications
  useEffect(() => {
    Notification.requestPermission();

    // Fetch the data too
    instance.get("/jobs?populate=*").then((res) => {
      const data = parseAttributes(res.data.data);

      allNotifications.current = data
        .map((job: any) => job?.notification)
        .filter((notif: any) => notif);

      // Schedule notifications for each job
      data.forEach((job: any) => {
        if (job?.notification && job?.notification?.viewed === false) {
          scheduleNotification(
            {
              title: job.notification.title,
              body: job.notification.body,
              timestamp: new Date(job.notification).getTime(),
            },
            () => {
              console.log("CLOSED");
              // Update the notification to viewed
              instance
                .put(`/jobs/${job.id}`, {
                  data: {
                    notification: {
                      ...job.notification,
                      viewed: true,
                    },
                  },
                })
                .then((res) => console.log({ res }));
            }
          );
        }
      });
    });
  }, []);

  const scheduleNotification = (
    notification: NotificationData,
    onClear: () => void = () => {}
  ) => {
    const id = setTimeout(() => {
      triggerNotification(notification, onClear);
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

  const getAllNotifications = () => {
    return allNotifications.current;
  };

  return (
    <NotificationContext.Provider
      value={{
        activeNotifications: timers.map((timer) => timer.data),
        scheduleNotification,
        replaceNotification,
        deleteNotification,
        getAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
