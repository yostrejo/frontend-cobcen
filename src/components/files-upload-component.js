/*import React, { useState } from "react";
import * as XLSX from "xlsx"


function FilesUploadComponent() {

    const [items, setItem] = useState([])

    const readExcel = (file) => {

        const promise = new Promise((resolve, reject) => {

            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: 'buffer' });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.oneerror = (error) => {
                reject(error);
            };

        });

        promise.then((d) => {
            console.log(d);
        });

    };

    return (
        <div>
            <input
            type="file"
            onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
            }}
/>


            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">RPU</th>
                        <th scope="col">CONSUMO</th>
                        <th scope="col">IMPORTE TOTAL</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((d) => (
                        <tr key={d.RPU}>
                            <td scope="row">{d.RPU}</td>
                            <td>{d.CONSUMO}</td>
                            <td>{d.IMPORTETOTAL}</td>
                        </tr>
                    ))}
                </ tbody>
            </table>
        </div>
        );
}

export default FilesUploadComponent;*/




//bueno
/*
import React, { Component, Fragment, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import * as xlsx from 'xlsx';
import { useCobsens } from "../context/CobsenProvider"
import { useAppContext } from "../pages/Reportes";
import { createRegistro, getRegistros,  } from '../api/cobsen.api'
import { useParams, useNavigate } from "react-router-dom";



export function FilesUploadComponent() {

    const { cobsens, loadRegistros } = useCobsens()
    const { createRegistro } = useCobsens();
   
    useEffect(() => {
        loadRegistros()
    }, []);

    const [title, setTitle] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [file, setFile] = useState(null)
    
    
    const readExcel = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer(file);
        const excelfile = xlsx.read(data);
        const excelSheet = excelfile.Sheets[excelfile.SheetNames[0]];
        const exceljson = xlsx.utils.sheet_to_json(excelSheet);


        //console.log(exceljson);
        setExcelData(exceljson);


    }

    const { createCobsen, getCobsen, updateCobsen } = useCobsens();
    const [cobsen, setCobsen] = useState({
      
        Id_Categoria: "",
        RPU: "",
        DEPENDENCIA: "",
        MEN_BIM: "",
        TFA: "",
    })
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadCobsen = async () => {
            if (params.RPU) {
                const getdata = await getCobsen(params.RPU)
                setCobsen({

                    Id_Categoria: getdata.Id_categoria,
                    RPU: getdata.RPU,
                    DEPENDENCIA: getdata.Dependencia,
                    MEN_BIM: getdata.Men_Bim,
                    TFA: getdata.TFA,
                });
            }
        };
        loadCobsen();
    }, []);


       const handleSubmit = (e) => {
           e.preventDefault();
           localStorage.setItem('Reporte', excelData)
           setExcelData('  ')
       }
   
     
    const store = useAppContext();

    const sendHandler =() => {
        if(!file) {
            alert('Selecciona un archivo')
            return
        }
        const formdata = new FormData()
        formdata.append('excel', file)

        fetch('http://localhost:3030/api/languages/files', {
            method: 'POST',
            body: formdata
        })
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => {
            console.error(err)
        })

        document.getElementById('fileinput').value = null
        setFile(null)
       }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case "title":
                setTitle(value);
                break;

            default:
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newReport = {
            id: crypto.randomUUID(),
            title,
            excelData

        };
        //To-Do Registrar reporte
        store.createItem(newReport);

       

    }

    return (
        <Fragment>
            <Container className="content">
                <div>
                    <h3>React File Upload</h3>


                    <form id="archivo" onSubmit={handleSubmit}>                      
                        <div className="row">
                            <div className="col-10">
                            <input className="form-control" //className='form-control'
                                id='fileinput'
                                type="file"
                                accept=".xls, .xlsx"
                                onChange={(e) => readExcel(e)} />
                            </div>
                            <div className="col-2">
                                <button onClick={sendHandler} className="btn btn-primary col-12" type="button">Upload</button>
                            </div>
                            <div className="col-12 py-3">
                                <button className="btn btn-secondary col-12 " type="button">Obtener Reporte</button>
                            </div>
                        </div>

                        
                    </form>

                </div>
                <div className="col-md-12 mt-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>RPU</th>
                                    <th>CONSUMO KWh</th>
                                    <th>IMPORTE TOTAL $</th>

                                </tr>
                            </thead>
                            <tbody>
                            { excelData.map( (getdata) => (
                                    <tr key ={getdata.RPU}>
                                        <td>{ getdata.RPU}</td>
                                        <td>{ getdata.CONSUMO }</td>
                                    <td> {getdata.IMPORTETOTAL}</td>
                                </tr>
                                ))} 
                            </tbody>
                        </table>
                    </div>

                <div className="col-md-12 mt-3">
                        <table className="table">
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
                                
                                {cobsens.map (cobsen=> (
                                       <tr>
                                       <td >{cobsen.Id_categoria}</td>
                                       <td >{cobsen.RPU}</td>
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

            </Container>
        </Fragment>

    )
}

export default FilesUploadComponent;*/

import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { useCobsens } from "../context/CobsenProvider";
import * as xlsx from 'xlsx';
import axios from 'axios';
import { CSVLink } from "react-csv";

export function FilesUploadComponent() {

       const borrarContenidoColumna = () => {
        axios.post(`http://localhost:3030/api/languages/formatear`)
          .then(response => {
            console.log(response.data);
            this.forceUpdate();
            // Realiza alguna acción después de borrar el contenido de la columna
          })
          .catch(error => {
            console.error(error);
          });
      };
    
    const { cobsens, loadRegistros, deleteRegistros } = useCobsens();
    useEffect(() => {
        loadRegistros()
    }, []);

    const {loadData, setLoadData} = useState([]);
    const navigate = useNavigate()
      useEffect(() => {
        loadRegistros()
        const intervalo = setInterval(loadRegistros, 10000);
    }, []);

   const loadReg =  async () => {
    const result = await axios.get("http://localhost:3030/api/languages");
    setLoadData(result.data.reverse());
   };

    const [excelData, setExcelData] = useState([]);
    const [cobsen, setCobsen] = useState(true)


    const readExcel = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer(file);
        const excelfile = xlsx.read(data);
        const excelSheet = excelfile.Sheets[excelfile.SheetNames[0]];
        const datos = xlsx.utils.sheet_to_json(excelSheet);
            
        const RPU = datos.map(row => row.RPU);
        const CONSUMO = datos.map(row => row.CONSUMO);
        const IMPORTE = datos.map(row => row.IMPORTETOTAL);

        axios.post('http://localhost:3030/api/languages/files', RPU, CONSUMO, IMPORTE, readExcel)
        .then((response) => { 
            setMessage(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

     console.log(CONSUMO, IMPORTE, RPU);
        // setExcelData(exceljson);


    }   

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);

            };

    function handleSubmit (event) {
        event.preventDefault();
        const myButton = document.getElementById('cargar');
    myButton.disabled = true;
    myButton.style.opacity = 0.7;
    myButton.textContent = 'Ejecutando proceso...';
 
    //simulación de espera para ejecución de un proceso
    setTimeout(function() {
        //console.log('Espera por favor...');
        myButton.textContent = 'Pulsar';
        myButton.style.opacity = 1;
        myButton.disabled = false;
    }, 30000);
 //location.reload();
 
           const formdata = new FormData()
    formdata.append('file', file)

    fetch('http://localhost:3030/api/languages/files', {
      method: 'POST',
      body: formdata
    })

    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => {
      console.error(err)
    })
   
    document.getElementById('fileinput').value = null

    setFile(null)

    
    } 

    return (
        <Formik
        initialValues={cobsen}
        enableReinitialize={true}
        >
            
            <Form>
                <div>
                    <h3>React File Upload</h3>
                    <div className="container">
                        <CSVLink className="px-4" data={cobsens} onClick={() => {}}>Exportar</CSVLink>
                        <button onClick={()=> borrarContenidoColumna()} >Reset</button>
                        <div className='card'>
                            <div className="row">
                                <div className="col-10">
                                    <input className="form-control" //className='form-control'
                                        id="fileinput"
                                        name="file"
                                        type="file"
                                        accept=".xls, .xlsx"
                                        onChange={handleFileChange} />
                                </div>

                                <div className="col-2">
                                    <button className="btn btn-primary col-12" type="submit" id="cargar" onClick={handleSubmit}>Upload</button>
                                </div>
                            </div>

                            <div className="col-md-12 mt-3">
                                <table className="table">
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

                                        {cobsens.map(cobsen => (
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
                    </div >
                </div >
            </Form>

        </Formik>




    )
}


export default FilesUploadComponent;



/*
import React, { useState } from 'react';
import FileReader from 'react-file-reader';
import axios from 'axios';

function FilesUploadComponent() {
  const [file, setFile] = useState(null);

  const handleFiles = (files) => {
    setFile(files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:3030/api/languages/files', formData).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileReader handleFiles={handleFiles} accept=".xlsx">
        <button type="button">Cargar archivo Excel</button>
      </FileReader>
      <button type="submit">Actualizar datos</button>
    </form>
  );
}

export default FilesUploadComponent;
*/