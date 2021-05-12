import classes from "./AuthForm.module.css";

const { useState } = require("react");

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHanlder = () => {
      setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.info}>
            <label htmlFor='email'>Your Email</label>
            <input  type='email' id='email' required/>
        </div>
        <div className={classes.info}>
            <label htmlFor='password'>Your Password</label>
            <input  type='password' id='password' required/>
        </div>
        <div className={classes.actions}>
            <button>{isLogin? 'Login' : 'Create Account'}</button>
            <button className={classes.toggle} type='button' onClick={switchAuthModeHanlder}>
                {isLogin? 'Create new account' : 'Login with existing account'}
            </button>
            </div>
      </form>
    </section>
  );
};

export default AuthForm;