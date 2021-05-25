import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  roles: [],
  isLoggIn: false,
  isAdmin: false,
  login: (token) => {},
  logout: () => {},
  loginRoles: (roles) => {},
});

export const AuthContextProvider = (props) => {
  let initialToken = localStorage.getItem('token');  
  // let initialRoles = localStorage.getItem('role');
  let initialRoles = [];
  
  const [token, setToken] = useState(initialToken);
  const [roles, setRoles] = useState(initialRoles);
  
  const userIsLoggedIn = !!token;
  const userIsAdmin = roles.includes("ROLE_ADMIN");

  const logoutHandler = () => {
    setToken(null);
    setRoles([]);
    localStorage.removeItem("token");
    localStorage.removeItem("role");    
  };

  const loginHandler = (token) => {
    setToken(token);    
    localStorage.setItem("token", token);
    
  };

  const loginRolesHandler = (roles) => {    
    setRoles(roles);   
    localStorage.setItem("role", roles);
  };

  

  const contextValue = {
    token: token,
    roles: roles,
    isLoggIn: userIsLoggedIn,
    isAdmin: userIsAdmin,
    login: loginHandler,
    logout: logoutHandler,
    loginRoles: loginRolesHandler,
  };

  
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
