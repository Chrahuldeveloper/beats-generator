"use client"

import { useContext,createContext } from "react"

export const BeatsContext = createContext<any>(null)

export const useBeats = () => useContext(BeatsContext);