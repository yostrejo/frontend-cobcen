import { deleteCobsenRequest } from "../api/cobsen.api.js";
import {useCobsens} from "../context/CobsenProvider.js";
import {useNavigate} from 'react-router-dom';
/*
function CobsenList({ cobsen }) {
   
    const {deleteCobsen} = useCobsens()
    const navigate = useNavigate()
    
    return(
        <div className="bg-slate-300 ">
               <table class="table">
             
                    <thead>
                        <tr>
                        <th>Id_categoria</th>
                        <th>RPU</th>
                        <th>Dependencia</th>
                        <th>Men_Bim</th>
                        <th>TFA</th>
                        </tr>
                    </thead>
            
    
    <tbody>
    <tr>
            <td>{cobsen.Id_categoria}</td>
            <td >{cobsen.RPU}</td>
            <td>{cobsen.DEPENDENCIA}</td>
            <td>{cobsen.MEN_BIM}</td>
            <td>{cobsen.TFA}</td>
            <button onClick={() => deleteCobsen(cobsen.RPU)}>Delete</button>
        <button onClick={() => navigate(`/editar/${cobsen.RPU}`)}> Editar </button>
</tr>
    </tbody>
</table>
        </div>
    );
}

export default CobsenList; */