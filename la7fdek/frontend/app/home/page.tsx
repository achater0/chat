'use client';

import "./home.css";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import Buttons from "./components/Buttons";
import RecentActivity from "./components/RecentActivity";
import LiveActivity from "./components/LiveActivity";
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
