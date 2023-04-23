import { createContext, useState } from "react";

export const Context = createContext();


const Provider = ({children}) => {
    const [cart, setCart] = useState([]);

    return (
        <Context.Provider value={{cart, setCart}}>
            {children}
        </Context.Provider>
    )
}

export default Provider;