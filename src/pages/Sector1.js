import { useEffect, useState } from "react";
import { getListRequest, getListSector1 } from "../api/cobsen.api.js";
import CobsenList from "../components/CobsenList.js";
import { useCobsens } from "../context/CobsenProvider"
import { deleteCobsenRequest } from "../api/cobsen.api.js";
import { useNavigate } from 'react-router-dom';



function SectorPE() {
    const { cobsens, loadSector1 } = useCobsens()
    const { deleteCobsen } = useCobsens()
    const navigate = useNavigate()
    useEffect(() => {
        loadSector1()
    }, []);

    return (
        <div>
            <h1 className="text-center bg-gray-300">
               Poder Ejecutivo
            </h1>

            <div><table class="table table-striped table-bordered">
             
             <thead >
                 <tr className="table-success" >
                <th>Id_categoria</th>
                 <th>RPU</th>
                 <th>Dependencia</th>
                 <th>Men_Bim</th>
                 <th>TFA</th>
                 <th>Acciones</th>
                 </tr>
             </thead>
                <tbody>
                {cobsens.map(cobsen => (
                       <tr>
                       <td >{cobsen.Id_categoria}</td>
                       <td >{cobsen.RPU}</td>
                       <td>{cobsen.Dependencia}</td>
                       <td>{cobsen.Men_Bim}</td>
                       <td>{cobsen.TFA}</td>
                       <button onClick={() => deleteCobsen(cobsen.RPU)}>Delete</button>
                   <button onClick={() => navigate(`/editar/${cobsen.RPU}`)}> Editar </button>
           </tr>   
                         ))}
                         </tbody>
                         </table>
            </div>
        </div>
    );
}


export default SectorPE;

//   <CobsenList cobsens={cobsen} key={cobsen.RPU} />