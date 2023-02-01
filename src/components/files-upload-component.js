import React, {Component, Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import * as xlsx from 'xlsx';

export function FilesUploadComponent() {
    
    const [excelData, setExcelData] = useState([]); 

    const readExcel = async(e) => {
          
      
        const file = e.target.files[0];
        const data = await file.arrayBuffer(file);
        const excelfile = xlsx.read(data);
        const excelSheet = excelfile.Sheets[excelfile.SheetNames[0]];
        const exceljson = xlsx.utils.sheet_to_json(excelSheet);
        
        
       //console.log(exceljson);
      setExcelData(exceljson);


    }

    return (
        <Fragment>
            <Container className="content">
        <div>
            <h3>React File Upload</h3>
                        <label className="form-label"> File </label>
                            <input id='fileinput' onChange={ (e)=> readExcel(e)} className='form-control' type="file" />
                        </div>
                    <div className="col-md-12 mt-3">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>RPU</th>
                                    <th>CONSUMO KWh</th>
                                    <th>IMPORTE TOTAL</th>

                                </tr>
                            </thead>
                            <tbody>
                            { excelData.map( (getdata, index) => (
                                    <tr key ={index}>
                                        <td>{ getdata.RPU}</td>
                                        <td>{ getdata.CONSUMO }</td>
                                    <td>{getdata.IMPORTETOTAL}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                
                    </Container>
        </Fragment>
        
    )
}

export default FilesUploadComponent;

/*
import {Fragment, useState } from "react";
import React, { Component } from 'react';
import { Form } from "react-router-dom";
import * as XLSX from "xlsx";

export function FilesUploadComponent() {

const [file, setFile] = useState(null)

   const selectedHandler = e =>{
        setFile(e.target.files[0])
    }
    const sendHandler =() => {
    if(!file) {
        alert('Selecciona un archivo')
        return
    }
    const formdata = new FormData()
    formdata.append('excel', file)
 
    fetch('http://localhost:3030/api/languages/files/post', {
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
            <Fragment>
            <div>
                <h3>React File Upload</h3>
                <div className="container">
                    <div className='card'>
                        <div className="row">
                            <div className="col-10">

                                <input id='fileinput' onChange={selectedHandler} className='form-control' type="file" />
                            </div>
                            <div className="col-2">
                                <button onClick={sendHandler} className="btn btn-primary col-12" type="button">Upload</button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            </Fragment>
        )
    }


export default FilesUploadComponent;
*/