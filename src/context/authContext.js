import { createContext, useEffect, useReducer } from "react";
import { Navigate } from "react-router-dom";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: JSON.parse(localStorage.getItem("token")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        token: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.user, state.token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Navigate("/login");
  };

  const isExpired = () => {
    if (
      state.token &&
      state.token.token &&
      state.token.expiredAt &&
      new Date().getTime() > new Date(state.token.expiredAt).getTime()
    ) {
      logout();
      return true;
    }
    return false;
  };

  // console.log("state.tokenxxxxx", state.token.token);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        dispatch,
        isExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};