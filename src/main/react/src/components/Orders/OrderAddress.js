import classes from './OrderAddress.module.css';

const OrderAddress = (props) => {
    return (
        <section className={classes.address}>            
            <div>
            <h2>Order Address:</h2>
            <div className={classes.details}>
                <label>Firt Name</label>
                <label>{props.address.firstName}</label>
            </div>
            <div className={classes.details}>
                <label>Last Name</label>
                <label>{props.address.lastName}</label>
            </div>
            <div className={classes.details}>
                <label>Post Code</label>
                <label>{props.address.postcode}</label>
            </div>
            <div className={classes.details}>
                <label>City</label>
                <label>{props.address.city}</label>
            </div>
            <div className={classes.details}>
                <label>Street</label>
                <label>{props.address.street}</label>
            </div>
            <div className={classes[`total-price`]}>
                <label>Total Price:</label>
                <label>{props.totalPrice}</label>
            </div>
            </div>
        </section>
    );
};

export default OrderAddress;