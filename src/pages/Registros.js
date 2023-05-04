import React from "react";
import { useAppContext } from "./Reportes";

 export default function Registros() {

    const store = useAppContext();

    return (
        <div>
            {store.items.map(item => <div>{item.title}</div> )} 
            </div>
           )
        };
               


