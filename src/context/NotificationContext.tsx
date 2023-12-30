import instance from "@/config/axios.config";
import parseAttributes from "@/utils/parse-data";
import { createContext, useEffect, useRef, useState } from "react";

export type NotificationData = {
  title: string;
  body: string;
  timestamp: string;
};

export type JobNotificationData = {
  title?: string;
  body?: string;
  timestamp: string;
  viewed: boolean;
};

export type NotificationId = ReturnType<typeof setTimeout>;

export const NotificationContext = createContext<{
  activeNotifications: NotificationData[];
  scheduleNotification: (
    jobId: string,
    notification: NotificationData,
    onClear: () => void
  ) => NotificationId;
  replaceNotification: (jobId: string, notification: NotificationData) => void;
  deleteNotification: (jobId: string) => void;
  getAllNotifications: () => JobNotificationData[];

  refreshNotificationData: (data: JobType[]) => void;
}>({
  activeNotifications: [],
  scheduleNotification: (id, notification) => {
    const n = new Notification(notification.title, {
      body: notification.body,
      timestamp: new Date(notification.timestamp).getTime(),
    });
    return setTimeout(() => {}, 0);
  },
  replaceNotification: () => {},
  deleteNotification: () => {},
  getAllNotifications: () => [],
  refreshNotificationData: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [timers, setTimers] = useState<
    { id: NotificationId; data: NotificationData; jobId: string }[]
  >([]);

  const allNotifications = useRef<JobNotificationData[]>([]);

  const triggerNotification = (
    notification: NotificationData,
    onClear: () => void = () => {}
  ) => {
    const n = new Notification(notification.title, {
      body: notification.body,
      timestamp: new Date(notification.timestamp).getTime(),
    });

    n.onclick = () => {
      onClear();
    };

    n.onclose = () => {
      onClear();
    };
  };

  const scheduleNotifs = (data: JobType[]) => {
    // Schedule notifications for each job
    data.forEach((job) => {
      if (job?.notification && job?.notification?.viewed === false) {
        scheduleNotification(
          job.id.toString(),
          {
            title: job.notification.title,
            body: job.notification.body,
            timestamp: job.notification.timestamp,
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

      scheduleNotifs(data);
    });
  }, []);

  const scheduleNotification = (
    jobId: string,
    notification: NotificationData,
    onClear: () => void = () => {}
  ) => {
    const id = setTimeout(() => {
      triggerNotification(notification, onClear);
      setTimers(timers.filter((timer) => timer.id !== id));
    }, new Date(notification.timestamp).getTime() - Date.now());

    setTimers([...timers, { id, data: notification, jobId }]);

    return id;
  };

  const replaceNotification = (
    jobId: string,
    notification: NotificationData
  ) => {
    console.log({ jobId, notification });
    const newId = setTimeout(() => {
      triggerNotification(notification);
      setTimers(timers.filter((timer) => timer.id !== newId));
    }, new Date(notification.timestamp).getTime() - Date.now());

    setTimers(
      timers.map((timer) => {
        if (timer.jobId === jobId) {
          clearTimeout(timer.id);
          return { id: newId, data: notification, jobId: timer.jobId };
        }
        return timer;
      })
    );
  };

  const deleteNotification = (jobId: string) => {
    const timer = timers.find((timer) => timer.jobId === jobId);
    clearInterval(timer?.id);
    setTimers(timers.filter((timer) => timer.jobId !== jobId));
  };

  const getAllNotifications = () => {
    return allNotifications.current;
  };

  const refreshNotificationData = (data: JobType[]) => {
    allNotifications.current = data
      .map((job: any) => job?.notification)
      .filter((notif: any) => notif);

    scheduleNotifs(data);
  };

  return (
    <NotificationContext.Provider
      value={{
        activeNotifications: timers.map((timer) => timer.data),
        scheduleNotification,
        replaceNotification,
        deleteNotification,
        getAllNotifications,
        refreshNotificationData,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
