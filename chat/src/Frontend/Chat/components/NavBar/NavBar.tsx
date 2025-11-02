
import { FiMessageSquare, FiSettings, FiLogOut } from "react-icons/fi";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar bg-[#ff]">
      <div className="flex items-center w-full">
        <div className="logo">CYBER PONG</div>
        <div className="grow max-w-30"></div>
        <div className="paths flex" >
          <a href="#"  className="home">Home</a>
          <a href="#" className="tournaments">Tournaments</a>
          <a href="#" className="stats">Stats</a>
          <a href="#" className="rankings">Rankings</a>
        </div>
      </div>
      <div className="icons flex gap-x-5 ml-auto">
        <button title="Chat" className=" chat">
          <FiMessageSquare size={22} />
        </button>
        <button title="Settings" className=" settings">
          <FiSettings size={22} />
        </button>
        <button title="Logout" className=" logout">
          <FiLogOut size={22} />
        </button>
      </div>
    </nav>
  );
}



export default NavBar;
