//todo
export async function getSingleBean(beanId) {
    const response = await fetch("http://localhost:8080/api/beans/" + beanId);
    
    if(!response.ok) {
        throw new Error (data.message || "Could not fetch bean");
    }
    const data = await response.json();

    const loadedBean = {
        id: response.id,
        name: response.name,
        description: response.description,
        price: response.price,
    };

    return loadedBean;
};

