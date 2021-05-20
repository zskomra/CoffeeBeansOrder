import { useRef } from "react";
import Card from "../UI/Card";
import classes from "./Contact.module.css";

const Contact = () => {
    const inputEmailRef = useRef();
    const inputTitleRef = useRef();
    const inputDescriptionRef = useRef();

    const confirmHanlder = (event) => {
        event.preventDefault();
        const enteredForm ={
            email : inputEmailRef.current.value,
            topic : inputTitleRef.current.value,
            description : inputDescriptionRef.current.value
        };
        
    }

  return (
    <div className={classes[`contact-window`]}>
      <Card>
        <form className={classes[`contact-form`]} onSubmit={confirmHanlder}>
            <div className={classes.items}>
                <label htmlFor="email">Your email</label>
                <input id="email" type="email" ref={inputEmailRef}></input>
            </div>
            <div className={classes.items}>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" ref={inputTitleRef}></input>
            </div>
            <div className={classes.items}>
                <label htmlFor="description">Your message</label>
                <textarea typeof="textarea" id="description" ref={inputDescriptionRef}></textarea>
            </div>
            <div className={classes.actions}>
                <button className={classes.send}>Send</button>
                <button className={classes.clear}>Clear</button>
            </div>
        </form>
      </Card>
    </div>
  );
};
export default Contact;
