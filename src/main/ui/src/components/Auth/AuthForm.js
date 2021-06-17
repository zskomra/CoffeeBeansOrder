import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const { useState, useRef, useContext } = require("react");

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHanlder = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHanlder = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    setIsLoading(true);
    let url;
    const request = {
      username: enteredEmail,
      password: enteredPassword,
    };
    if (isLogin) {
      url = "/api/auth/signin";
    } else {
      url = "/api/auth/signup";
    }
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = data.message;
            alert(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.token);
        authCtx.loginRoles(data.roles);
        if (isLogin) {
          history.replace("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHanlder}>
        <div className={classes.info}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailInputRef} type="email" id="email" required />
        </div>
        <div className={classes.info}>
          <label htmlFor="password">Your Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request..</p>}
          <button
            className={classes.toggle}
            type="button"
            onClick={switchAuthModeHanlder}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
