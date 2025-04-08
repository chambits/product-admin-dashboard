import { notification } from "antd";
import { createContext, useContext, ReactNode } from "react";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationContextType {
  showNotification: (
    type: NotificationType,
    message: string,
    description?: string
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (
    type: NotificationType,
    message: string,
    description?: string
  ) => {
    api[type]({
      message,
      description,
      placement: "top",
      duration: 3,
    });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
