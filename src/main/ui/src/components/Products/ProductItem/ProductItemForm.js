import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./ProductItemForm.module.css";

const ProductItemForm = (props) => {
  const inputAmountRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputAmountRef.current.value;
    const enteredAmountAsNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountAsNumber < 1 ||
      enteredAmountAsNumber > 10
    ) {
      setAmountIsValid(false);
      return;
    }
    
    props.onAddToCart(enteredAmountAsNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id, 
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
          ref: inputAmountRef,
        }}
      />
      <button>Add</button>
      {!amountIsValid && <p>Please insert valid amount ( 1 - 10 )</p>}
    </form>
  );
};

export default ProductItemForm;
