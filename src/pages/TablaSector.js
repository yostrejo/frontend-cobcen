/*import React from "react";

 function Categorias() {
    return (
        <div>Sectores</div>
    )
 }

 export default Categorias;*/

 import { useEffect, useState } from "react";
import { getListRequest, getListSector } from "../api/cobsen.api.js";
import { useCobsens } from "../context/CobsenProvider"
import { useNavigate } from 'react-router-dom';
import SectorPE from "./Sector1.js";



function Categoria() {
    const { cobsens, loadSector } = useCobsens()
    const navigate = useNavigate()
    useEffect(() => {
        loadSector()
    }, []);

    return (
        <div>
            <h1 className="text-center bg-gray-300">
                Sectores
            </h1>

            <div><table className="table table-striped table-bordered">
             
             <thead >
                 <tr className="table-success" >
                 <th>Id Sector</th>
                 <th>Sector</th>  
                 </tr>
             </thead>
                <tbody>
                {cobsens.map(cobsen => (
                       <tr>
                        <td >{cobsen.Id_Cat}</td>
                      <td onClick={() => <SectorPE/>}>{cobsen.Sector}</td> 
                  </tr>   
                         ))}
                         </tbody>
                         </table>
            </div>
        </div>
    );
}


export default Categoria;

//   <CobsenList cobsens={cobsen} key={cobsen.RPU} />