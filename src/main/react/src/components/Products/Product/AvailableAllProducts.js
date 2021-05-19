import AvailableProduct from "../AvailableProduct";

const AvailableAllProducts = () => {
    const productCategory = "all";
    return(
        
        <AvailableProduct productName={productCategory}/>
    );
}

export default AvailableAllProducts;