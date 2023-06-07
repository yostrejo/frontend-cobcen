import React from "react";
import { useAppContext } from "./Reportes";
import { FormControl, Button} from "react-bootstrap";
import { useCobsens } from "../context/CobsenProvider"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Form, Formik } from "formik";
import { loadRegistros } from "../api/cobsen.api";
import { useParams } from "react-router-dom";


export default function Search() {
    const { cobsens, loadRegistros } = useCobsens();
    const [cobsen, setCobsen] = useState("");
    

    //const search = useParams("");
    //console.log(search);

    const setdata = (e) => {
        console.log(e.target.value);
        setCobsen(e.target.value)
    }

   //metodo de filtrado
   let results = []
   if(!cobsen)
   {
    results = cobsens
   }else {
    results = cobsens.filter( (dato) => 
    dato.RPU.toLowerCase().includes(cobsen.toLocaleLowerCase())
    

    )
   }

  
    
    useEffect(() => {
        loadRegistros()
    }, [])

    return (

        <div>
             <h1 className="text-center bg-gray-300">
                Buscar Registros
            </h1>

            <FormControl
         type="search"
         value={cobsen}
         placeholder="Search"
        onChange={setdata}  
      />
            
                     
                       

            <div>   <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Id Sector</th>
                                            <th>RPU</th>
                                            <th>Dependencia</th>
                                            <th>Men_Bim</th>
                                            <th>TFA</th>
                                            <th>CONSUMO KWh</th>
                                            <th>IMPORTE TOTAL $</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {results.map(cobsen => (
                                            <tr key={cobsen.RPU}>
                                                <td>{cobsen.Id_categoria}</td>
                                                <td>{cobsen.RPU}</td>
                                                <td>{cobsen.Dependencia}</td>
                                                <td>{cobsen.Men_Bim}</td>
                                                <td>{cobsen.TFA}</td>
                                                <td>{cobsen.Consumo}</td>
                                                <td>{cobsen.Importe} </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
            </div>
        </div>

    )

};


