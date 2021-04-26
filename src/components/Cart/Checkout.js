import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const confirmHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="post">Post Code</label>
        <input type="text" id="post"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city"></input>
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street"></input>
      </div>
      <div className={classes.actions}>
        <button
          className={classes["button--negative"]}
          onClick={props.onCancel}
          type="button"
        >
          Cancel
        </button>
        <button className={classes.button}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
