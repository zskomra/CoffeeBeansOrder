import classes from "./SortSelect.module.css";

const SortSelect = (props) => {
    return (
        <div className={classes.sort}>
            {props.children}
        </div>
     );
};

export default SortSelect;