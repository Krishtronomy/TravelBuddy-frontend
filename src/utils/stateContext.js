import { createContext, useContext } from "react";

// Creates a Global context
export const StateContext = createContext()
export const useGlobalState = () => useContext(StateContext)