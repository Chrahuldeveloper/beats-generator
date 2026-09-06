import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Player from "./components/Player";

export default function Home() {
  return (
   <>
   <Navbar/>
   <div className="flex">
   <SideBar/>
   <Main/>
   <Player/>
   </div>
   </>
  );
}
