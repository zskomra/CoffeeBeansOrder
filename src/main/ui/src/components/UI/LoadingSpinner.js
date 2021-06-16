import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
    return <section className={classes[`spinner-section`]}><div className={classes.spinner}></div>
    </section>;
};

export default LoadingSpinner;