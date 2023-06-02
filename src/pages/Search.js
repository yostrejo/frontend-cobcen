import React from "react";
import { useAppContext } from "./Reportes";
import { useCobsens } from "../context/CobsenProvider"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Form, Formik } from "formik";
import { searchRegistros } from "../api/cobsen.api";
import { useParams } from "react-router-dom";


export default function Search() {
    const { cobsens, searchRegistros } = useCobsens();
    const [cobsen, setCobsen] = useState();
    console.log(cobsen);

    const search = useParams("");
    //console.log(search);

    const setdata = (e) => {
        console.log(e.target.value);
        const search = e.target;
        setCobsen()
    }

    const getdata =async (e) => {
        e.preventDefault();

       const res = await fetch(`http://localhost:3030/api/languages/search/${search}`, {
      method: 'GET',
      headers: { 
        "content-type": "application/json"
    },
    body: search
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
        console.log(data);
    } else {
        setCobsen(data)
        console.log("get data")
    }
    }
    useEffect(() => {
        getdata();
    }, [])

    return (

        <div>
            
                        <input
                            type="search"
                            name="search"
                            placeholder="Search"
                           onChange={setdata}
                        />
                        <button
                            type="submit"
                            onClick={(e) => getdata(cobsen.search)}
                        > Search</button>
               

            <div><table className="table table-striped table-bordered">

                <thead >
                    <tr className="table-success" >
                        <th>Id Sector</th>
                        <th>RPU</th>
                        <th>Dependencia</th>
                        <th>Mensual o Bimestral</th>
                        <th>TFA</th>
                        <th>CONSUMO KWh</th>
                        <th>IMPORTE $</th>
                    </tr>
                </thead>

                <tbody>

                
                            <tr>
                            {getdata.map(cobsen => (
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
                            </tr>
             
                </tbody>
            </table>
            </div>
        </div>

    )
};
