import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setformInputValidity] = useState({
      firstName: true,
      lastName: true,
      street: true,
      city: true,
      postcode: true
  });
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const postInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredPost = postInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;

    const enteredFirstNameIsValid = !isEmpty(enteredFirstName);
    const enetredLastNameIsValid = !isEmpty(enteredLastName);
    const enteredPostIsValid = isFiveChar(enteredPost);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);

    setformInputValidity({
        firstName: enteredFirstNameIsValid,
        lastName: enetredLastNameIsValid,
        postcode: enteredPostIsValid,
        city: enteredCityIsValid,
        street: enteredStreetIsValid
    })

    const formiSValid =
      enteredFirstNameIsValid &&
      enetredLastNameIsValid &&
      enteredPostIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid;

    if (!formiSValid) {
      return;
    }

    props.onConfirm({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        postcode: enteredPost,
        city: enteredCity,
        street: enteredStreet
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="first-name">First Name</label>
        <input ref={firstNameInputRef} type="text" id="first-name"></input>
        {!formInputValidity.firstName && <p>Please enter valid first name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="last-name">Last Name</label>
        <input ref={lastNameInputRef} type="text" id="last-name"></input>
        {!formInputValidity.lastName && <p>Please enter valid last name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="post">Post Code</label>
        <input ref={postInputRef} type="text" id="post"></input>
        {!formInputValidity.postcode && <p>Please enter valid post code</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city"></input>
        {!formInputValidity.city && <p>Please enter valid city</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street"></input>
        {!formInputValidity.street && <p>Please enter valid street</p>}
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
