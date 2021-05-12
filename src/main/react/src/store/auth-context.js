const AuthContext = React.createContext({
  token: "",
  isLoggIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
    
  const contextValue = {
    token: "",
    isLoggIn: false,
    login: (token) => {},
    logout: () => {},
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
