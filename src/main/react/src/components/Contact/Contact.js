import { Fragment, useRef, useState } from "react";
import Modal from "../Cart/Modal";
import Card from "../UI/Card";
import classes from "./Contact.module.css";

const Contact = () => {
    const inputEmailRef = useRef();
    const inputTitleRef = useRef();
    const inputDescriptionRef = useRef();    
    const [isSending, setIsSending] = useState();
    const [didSend, setDidSend] = useState(false);

    

    const confirmHanlder = (event) => {
        event.preventDefault();
        const enteredForm ={
            email : inputEmailRef.current.value,
            topic : inputTitleRef.current.value,
            description : inputDescriptionRef.current.value
        };
        fetch("http://localhost:8080/api/contact",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(enteredForm)            
        });
        setDidSend(true);  
        console.log(didSend);
    };

    const confirmSendHanlder = () => {
        setDidSend(false);
    };

    const messageSent = (
        <Modal onHideModal={confirmSendHanlder}>
          <p>Message successfully sent!</p>
          <div className={classes.actions}>
            <button onClick={confirmSendHanlder}>
              OK
            </button>
          </div>
          </Modal>
      );     


  return (
      <Fragment>
    <div className={classes[`contact-window`]}>
      <Card>
        <form className={classes[`contact-form`]} onSubmit={confirmHanlder}>
            <div className={classes.items}>
                <label htmlFor="email">Your email</label>
                <input required id="email" type="email" ref={inputEmailRef}></input>
            </div>
            <div className={classes.items}>
                <label htmlFor="title">Title</label>
                <input minLength="5" required id="title" type="text" ref={inputTitleRef}></input>
            </div>
            <div className={classes.items}>
                <label htmlFor="description">Your message</label>
                <textarea minLength="5" required typeof="textarea" id="description" ref={inputDescriptionRef}></textarea>
            </div>
            <div className={classes.actions}>
                <button className={classes.send}>Send</button>
                
            </div>
        </form>
      </Card>
    </div>
    {didSend && messageSent}
    </Fragment>
  );
};

export default Contact;
