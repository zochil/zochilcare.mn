import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import * as storage from "../lib/storage";

const StateContext = createContext({
  authenticated: false,
  user: null,
  loading: true,
  item: null,
  donationResult: null,
});

const DispatchContext = createContext(null);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        authenticated: true,
        user: payload,
      };
    case "LOGOUT":
      return {
        ...state,
        authenticated: false,
        user: null,
      };
    case "DONATE":
      return {
        ...state,
        item: payload,
      };
    case "DONATE_COMPLETE":
      return {
        ...state,
        donationResult: payload,
      };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      throw new Error(`Uknow action type: ${type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
    item: null,
    donationResult: null,
  });

  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  useEffect(() => {
    async function loadUser() {
      try {
        const accessToken = await storage.getItem("access_token");
        const res = await axios.get("/users/my-profile", {
          headers: {
            "access-token": accessToken,
          },
        });
        dispatch("LOGIN", res.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch("STOP_LOADING");
      }
    }
    async function loadItem(){
      try {
        const item = await storage.getItem("item");
        dispatch("DONATE", JSON.parse(item));
      } catch (error) {
        console.log(error);
      } 
    }
    async function loadResult(){
      try {
        const item = await storage.getItem("donation_result");
        dispatch("DONATE_COMPLETE", item);
      } catch (error) {
        console.log(error);
      } 
    }
    loadItem()
    loadUser();
    loadResult()
  }, []);
  
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
