import { useEffect, useState } from "react";
import { getListRequest } from "../api/cobsen.api.js";
import CobsenList from "../components/CobsenList.js";
import { useCobsens } from "../context/CobsenProvider"
import { deleteCobsenRequest } from "../api/cobsen.api.js";
import { useNavigate } from 'react-router-dom';



function CobsenPage() {
    const { cobsens, loadCobsens } = useCobsens()
    const { deleteCobsen } = useCobsens()
    const navigate = useNavigate()
    useEffect(() => {
        loadCobsens()
    }, []);

    return (
        <div>
            <h1 className="text-center bg-gray-300">
                Registros
            </h1>

            <div><table className="table table-striped table-bordered">
             
             <thead >
                 <tr className="table-success" >
                <th>Id Sector</th>
                 <th>RPU</th>
                 <th>Dependencia</th>
                 <th>Mensual o Bimestral</th>
                 <th>TFA</th>
                 <th>Acciones</th>
                 </tr>
             </thead>
             
                <tbody>

                {cobsens.map (cobsen => (
                       <tr>
                       <td >{cobsen.Id_categoria}</td>
                       <td >{cobsen.RPU}</td>
                       <td>{cobsen.Dependencia}</td>
                       <td>{cobsen.Men_Bim}</td>
                       <td>{cobsen.TFA}</td>
                       <button onClick={() => deleteCobsen(cobsen.RPU)}>Borrar</button>
           </tr>   
                         ))} 
                         </tbody>
                         </table>
            </div>
        </div>
    );
}


export default CobsenPage;

//   <CobsenList cobsens={cobsen} key={cobsen.RPU} />
//<button onClick={() => navigate(`/editar/${cobsen.RPU}`)}>Editar</button>
