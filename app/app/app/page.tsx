
"use client"

import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Player from "./components/Player";
import { useState } from 'react';
import { BeatsContext } from "./context/BeatsContext";

export default function Home() {

  const [beats,setbeats] = useState(null)

  return (
    <BeatsContext.Provider value={{beats, setbeats}}>
   <Navbar/>
   <div className="flex">
   <SideBar />
   <Main/>
   <Player/>
    </div>
    </BeatsContext.Provider>
  );
}
