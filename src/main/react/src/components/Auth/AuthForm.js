import classes from "./AuthForm.module.css";

const { useState, useRef } = require("react");

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHanlder = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHanlder = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredEmail, enteredPassword);
    setIsLoading(true);
    let url;
    const request = {
        username : enteredEmail,
        password : enteredPassword
    }
    if(isLogin) {
        url= 'http://localhost:8080/api/auth/signin';
    }
    else {
        url = 'http://localhost:8080/api/auth/signup';
    }
    fetch (url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },            
            body: JSON.stringify(
                request            
            ),
            
        })
        .then((response) => {
            setIsLoading(false);
            if(response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data.token);
        })
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
          <button>{isLogin ? "Login" : "Create Account"}</button>
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
