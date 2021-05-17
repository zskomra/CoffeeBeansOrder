import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  let initialToken = localStorage.getItem('token');

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    console.log(token);
  };

  const contextValue = {
    token: token,
    isLoggIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    
  };

  
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
