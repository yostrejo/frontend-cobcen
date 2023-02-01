import {BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import CobsenPage from "./pages/CobsenPage.js";
import NotFound from "./pages/NotFound.js";
import NavScroll from "./components/Navbar";
import CobsenForm from "./pages/CobsenForm.js";
import { CobsenContextProvider } from "./context/CobsenProvider.js";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {FilesUploadComponent} from '../src/components/files-upload-component.js'
import Categorias from "./pages/TablaSector.js";
import Sector1 from "./pages/Sector1.js";
import SectorPE from "./pages/Sector1.js";
import Login from "./pages/Login.js";

function App() {
  return (

    <div>
      
    <div>
      
     
    
      <div>
        <CobsenContextProvider>
          <Routes>
          <Route path="/" element={<Login/>} />
          </Routes>
        </CobsenContextProvider>
      </div>

    </div>
    </div>

  )
}

export default App;

/* import {BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import CobsenPage from "./pages/CobsenPage.js";
import NotFound from "./pages/NotFound.js";
import NavScroll from "./components/Navbar";
import CobsenForm from "./pages/CobsenForm.js";
import { CobsenContextProvider } from "./context/CobsenProvider.js";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {FilesUploadComponent} from '../src/components/files-upload-component.js'
import Categorias from "./pages/TablaSector.js";
import Sector1 from "./pages/Sector1.js";
import SectorPE from "./pages/Sector1.js";
import Login from "./pages/Login.js";

function App() {
  return (

    <div>
      
    <div>
      
      <NavScroll />
    
      <div>
        <CobsenContextProvider>
          <Routes>
            <Route path="/home" element={<CobsenPage />} />
            <Route path="/sectores" element={<Categorias />} />
            <Route path="/poderejecutivo" element={<SectorPE />} />
            <Route path="/registrar" element={<CobsenForm />} />
            <Route path="/new" element={<FilesUploadComponent />} />
            <Route path="/editar/:RPU" element={<CobsenForm />} />
            <Route path="/" element={<Login/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CobsenContextProvider>
      </div>

    </div>
    </div>

  )
}

export default App; */