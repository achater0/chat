import React from "react";
import { useState } from "react";

const notifications = [
  {
    id: 3,
    title: "Tournament registration is now open!",
    timer: "18m",
  },
  {
    id: 2,
    title: "New high score achieved in Quick Match!",
    timer: "26m",
  },
  {
    id: 1,
    title: "Welcome to CyberPong!",
    timer: "30m",
  },
];

export default function Notifications() {
  const [readIds, setReadIds] = useState<Number[]>([]);
  const notificationCount = notifications.length - readIds.length;

  const markAsRead = (id: number) => {
    if (!readIds.includes(id)) {
      setReadIds((prev) => [...prev, id]);
    }
  };
  return <div className="notifications">
    <div className="header">
      <div className="title">
        <img src="/assets/remind.svg" alt="" />
        <h3>Notifications</h3>
      </div>
      <div
        className="notification-count"
        style={{ display: notificationCount === 0 ? "none" : "block" }}
      >
        {notificationCount}
      </div>
    </div>
    <div className="notif-body">
      {notifications.length !== 0 ? (
        notifications.map((notification) => {
          return (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`notif-instance ${
                readIds.includes(notification.id) ? "read" : ""
              }`}
            >
              <p>{notification.title}</p>
              <span>{notification.timer}</span>
            </div>
          );
        })
      ) : (
        <div className="no-notif">
          <img src="/assets/close-remind.svg" alt="" />
          <p>You don't have any notification</p>
        </div>
      )}
    </div>
  </div>;
}
