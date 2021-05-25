import { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./Profile.module.css";

const Profile = () => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const postCodeInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    postCode: "",
    city: "",
    street: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const userToken = authCtx.token;
      console.log(userToken);
      // console.log(authCtx.roles);
      const response = await fetch("http://localhost:8080/api/profile", {
        headers: { Authorization: "Bearer " + userToken },
      });

      if (!response.ok) {
        throw new Error("Ooops something get wrong!");
      }

      const responseData = await response.json();

      const loadedDetails = {
        firstName: responseData.firstName,
        lastName: responseData.lastName,
        postCode: responseData.postCode,
        city: responseData.city,
        street: responseData.street,
      };
      setDetails(loadedDetails);
      setIsLoading(false);
    };
    fetchDetails()
      .then()
      .catch((error) => {
        setIsLoading(false);
        console.log(error.message);
      });
  }, [authCtx.token]);

  const confirmHandler = (event) => {
    event.preventDefault();
    const userToken = authCtx.token;

    const firstNameInput = details.firstName;
    const lastNameInput = details.lastName;
    const postCodeInput = details.postCode;
    const cityInput = details.city;
    const streetInput = details.street;
    const request = {
      firstName: firstNameInput,
      lastName:lastNameInput,
      postCode:postCodeInput,
      city:cityInput,
      street:streetInput,
      idToken: userToken
    }    
    
    fetch("http://localhost:8080/api/profile", {
      method: "POST",
      body: JSON.stringify(
        request
      ),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      }
    }).then(res => {
      alert("Profile updated")
      history.replace(window.location.pathname + '/updated');
    });
  };

  const changeHanlder = () => {
    const firstNameInput = firstNameInputRef.current.value;
    const lastNameInput = lastNameInputRef.current.value;
    const postCodeInput = postCodeInputRef.current.value;
    const cityInput = cityInputRef.current.value;
    const streetInput = streetInputRef.current.value;
    setDetails({
      firstName: firstNameInput,
      lastName: lastNameInput,
      postCode: postCodeInput,
      city: cityInput,
      street: streetInput,
    });    
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes[`user-info`]}>
      <Card>
        <form className={classes.form} onSubmit={confirmHandler}>
          <h2>Your Profile</h2>
          <div className={classes.control}>
            <label htmlFor="first-name">First Name</label>
            <input
              value={details.firstName}
              onChange={changeHanlder}
              id="first-name"
              ref={firstNameInputRef}
              type="text"
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="last-name">Last Name</label>
            <input
              value={details.lastName}
              onChange={changeHanlder}
              id="last-name"
              ref={lastNameInputRef}
              type="text"
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="post-code">Post Code</label>
            <input
              value={details.postCode}
              onChange={changeHanlder}
              id="post-code"
              ref={postCodeInputRef}
              type="text"
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="city">City</label>
            <input
              value={details.city}
              onChange={changeHanlder}
              id="city"
              ref={cityInputRef}
              type="text"
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="street">Street</label>
            <input
              value={details.street}
              onChange={changeHanlder}
              id="street"
              ref={streetInputRef}
              type="text"
            ></input>
          </div>
          <div className={classes.actions}>
            <button className={classes.button}>Save</button>
            <Link to="/">
              <button className={classes["button--negative"]}>Cancel</button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
