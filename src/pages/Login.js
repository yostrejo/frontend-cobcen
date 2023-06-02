import React, { useState } from "react";
import NavScroll from "../components/Navbar";
import CobsenPage from "./CobsenPage";

 function Login() {

  const [miLogin, setMiLogin] = useState("false");
  const [usu, setUsu] = useState("");
  const [pas, setPas] = useState("");


  function iniciarSesion(e){
    e.preventDefault();
    var txtusu = document.getElementById("txtusu").value;
    var txtpas = document.getElementById("txtpas").value;
    if(txtusu.length===0 || txtpas.length===0){
      alert("Complete Los Datos Faltantes!!");
    }else{
        if(usu === "admin" && pas==="admincobcen00"){
          setMiLogin("true");
          document.getElementById("form_login").style.display = "none";
        }else{
          setMiLogin("false");
          alert("Error de Usuario y/o Contraseña!!");
          document.getElementById("txtusu").value = "";
          document.getElementById("txtpas").value = "";
          document.getElementById("txtusu").focus();
        

        
      }
    }
  }
    return ( <div className="container text-center" /*style={{background:"lightgray", marginTop:20, padding:20}}*/>
        
    <form id="form_login">
      
        <div className="">
            <h1 style={{color:"blue", textalign:"center"}}>LOGIN</h1>
            <label htmlFor="txtusu"><strong>Username</strong></label>
            <input type="text" id="txtusu" style={{textAlign:"center"}} className="form-control" onChange={ (e) => setUsu(e.target.value) } required/>
        </div>
        <div>
            <label htmlFor="txtpas"><strong>Password</strong></label>
            <input type="password" id="txtpas" style={{textAlign:"center"}} className="form-control" onChange={ (e) => setPas(e.target.value) } required/>
        </div><br/>
        <input type="submit" className="btn btn-primary" value="Login" onClick={ iniciarSesion }/>
    </form>


{ miLogin === "true" && <NavScroll /> }


</div>

//{ miLogin === "true" && <CobsenPage /> }

      
    )
 }

 export default Login;

/*import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

 function Login() {
    return (
       <Card className="py-10"> <div className="block mx-auto my-12 p-8 bg-white w-1/3 border border-gray-200 rounded-lg shawod-lg text-gray-800 center" >Inicio de Sesion
      
        <Form  >
       <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="6">
          Usuario
        </Form.Label>
        <Col sm="6">
          <Form.Control type="text" placeholder="Usuario" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="6">
          Password
        </Form.Label>
        <Col sm="6">
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>
      <button variant="success">Iniciar Sesion</button>
    </Form> 
    
        </div>
       </Card> 
    )
         
 }

 export default Login;*/