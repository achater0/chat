import React from "react";
import "../styles/Home.css";
import Notifications from "../ui/Home/Notifications";
import Profile from "../ui/Home/Profile";
import Buttons from "../ui/Home/Buttons";
import RecentActivity from "../ui/Home/RecentActivity";
import LiveActivity from "../ui/Home/LiveActivity";
import NavBar from "../ui/NavBar";

export default function Home() {
  return (
    <div className="container">
      <NavBar />
      <div className="body">
        <Profile />
        <Buttons />
        <Notifications />
        <RecentActivity />
        <LiveActivity />
      </div>
    </div>
  );
}
