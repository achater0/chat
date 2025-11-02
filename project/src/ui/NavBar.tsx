import React from "react";
import Title from "./Title";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", link: "", selected: true },
  { name: "Tournaments", link: "", selected: false },
  { name: "Stats", link: "", selected: false },
  { name: "Rankings", link: "", selected: false },
];

export default function NavBar() {
  return (
    <nav className="navigation">
      <div className="left-wrapper">
        <Title className="title-size"/>
        <ul>
          {navItems.map((navItem) => {
            return (
              <li key={navItems.indexOf(navItem)}>
                <Link className={`link ${navItem.selected? "selected" : ""}`} to={navItem.link}>{navItem.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="nav-buttons">
        <Link to="" className="chat-btn"><img src="/assets/Message.svg" alt="" /></Link>
        <Link to="" className="settings-btn"><img src="/assets/gear.svg" alt="" /></Link>
        <Link to="" className="logout-btn"><img src="/assets/logout.svg" alt="" /></Link>
      </div>
    </nav>
  );
}
