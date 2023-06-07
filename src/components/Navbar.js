  import { useState } from "react";
  import { Navbar, Nav, Container, Form, FormControl, Button, NavbarBrand} from "react-bootstrap";
  import { Outlet, Link } from "react-router-dom";
  import CobsenPage from "../pages/CobsenPage";
  import CobsenForm from "../pages/CobsenForm";
  import Categoria from "../pages/TablaSector";
  import FilesUploadComponent from "./files-upload-component";
  import Registros from "../pages/Registros";
  import axios from "axios";
  import Search from "../pages/Search";
  



const NavScroll = () => {

const [page, setPage] = useState("");
const [form, setForm] = useState("");
const [sectores, setSectores] = useState("");
const [archivo, setArchivo] = useState("");
const [search, setSearch] = useState("");


  function cerrarSesion(){

    document.getElementById("caja_menu").style.display = "none";
    document.getElementById("form_login").style.display = "block";
    document.getElementById("txtusu").value = "";
    document.getElementById("txtpas").value = "";
    document.getElementById("txtusu").focus();

  }

  function op_page(){
   setPage("1");
   setForm("0");
   setSectores("0");
   setArchivo("0");
   setSearch("0");
   


  }

 
  function op_form(){
    setPage("0");
    setForm("1");
    setSectores("0");
    setArchivo("0");
    setSearch("0");
    
   }

   function op_sectores(){
    setPage("0");
    setForm("0");
    setSectores("1");
    setArchivo("0");
    setSearch("0");
    
   }

   function op_archivo(){
    setPage("0");
    setForm("0");
    setSectores("0");
    setArchivo("1");
    setSearch("0");
   }

   function op_search(){
    setPage("0");
    setForm("0");
    setSectores("0");
    setArchivo("0");
    setSearch("1");
   }

  return(
    <>
<Navbar className="navBg" bg="light" expand="lg">
  <NavbarBrand ><img src='./logoof.png' width='70'></img> Complejo Administrativo del Estado de Colima</NavbarBrand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="mr-auto my-3 my-lg-0 px-10"
      style={{ maxHeight: '100px' 
    }}
      navbarScroll
    >
      <Nav.Link as={Link} onClick={ op_page } >Inicio</Nav.Link>
      <Nav.Link as={Link} onClick={ op_sectores }  >Sectores</Nav.Link>
      <Nav.Link as={Link} onClick={ op_form } >Nuevo Registro</Nav.Link>
      <Nav.Link as={Link} onClick={ op_archivo } >Archivo</Nav.Link>
            
       
    </Nav>
    <Form className="d-flex px-10">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
                
      />
      <Button variant="outline-success" onClick={ op_search }>Buscar</Button>
    </Form>
    <div className="d-flex justify-content-end">
    <Button variant="danger" as={Link} href=" " onClick={ cerrarSesion }>Cerrar Sesion</Button>
    </div>
  </Navbar.Collapse>
</Navbar>

<section>
  <Outlet></Outlet>
</section>
   
     { page === "1" && <CobsenPage/> }
     { form === "1" && <CobsenForm />}
     { sectores === "1" && <Categoria />}
     { archivo === "1" && <FilesUploadComponent />}
     { search === "1" && <Search/>}
    

 </>

  

  )
  
}

export default NavScroll;