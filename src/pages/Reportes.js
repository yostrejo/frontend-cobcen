import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({
    items: [],
    createItem: (item) => {},
    getItem: (id) => {},
});

export default function Store ({children}) {
    const [items, setItems] = useState([]);

    function createItem(item){
       const temp = [...items];
        temp.push(item);

        setItems(temp);
    }
    
    function getItem(id){
        const item = items.find((item) => item.id === id);

        return item;
    }

    return <AppContext.Provider value={{
        items,  
        createItem,
        getItem
    }}>
        {children}
    </AppContext.Provider>;

}

export function useAppContext(){
    return useContext(AppContext);
}