import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { createCobsenRequest } from '../api/cobsen.api'
import { CobsenContext } from "../context/CobsenProvider";
import { useCobsens } from "../context/CobsenProvider.js";
import { useParams, useNavigate } from "react-router-dom";



function CobsenForm() {


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
                const cobsen = await getCobsen(params.RPU)
                setCobsen({

                    Id_Categoria: cobsen.Id_categoria,
                    RPU: cobsen.RPU,
                    DEPENDENCIA: cobsen.Dependencia,
                    MEN_BIM: cobsen.Men_Bim,
                    TFA: cobsen.TFA,
                });
            }
        };
        loadCobsen();
    }, []);

    return (
        <div>
            <h1>{params.RPU ? "Editar registro" : "Nuevo Registro"}</h1>

            <Formik
                initialValues={cobsen}
                enableReinitialize={true}
                onSubmit={async (values, actions) => {
                    console.log(values);
                    actions.resetForm();

                    if (params.RPU) {
                        await updateCobsen(params.RPU, values);
                        navigate("/");
                    } else {
                        await createCobsen(values);
                    }
                    setCobsen({
                        Id_Categoria: "",
                        RPU: "",
                        DEPENDENCIA: "",
                        MEN_BIM: "",
                        TFA: "",
                    });
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} >

                        <label  className="px-4 py-4 bg-slate-300">ID del Sector</label>
                        <input
                            type="text"
                            name='Id_Categoria'
                            placeholder="Escriba el ID del sector"
                            onChange={handleChange}
                            value={values.Id_Categoria}
                        />

                       <div className="py-4 row-4">
                        <label  className="px-4 bg-slate-300">RPU</label>
                        <input className=""
                            type="text"
                            name='RPU'
                            placeholder="Escriba el RPU"
                            onChange={handleChange}
                            value={values.RPU}
                        /></div>
                       <div className="py-4 row-4"><label className=" px-4 bg-slate-300 ">Dependencia</label>
                        <input
                            type="text"
                            name='DEPENDENCIA'
                            placeholder="Escribe la dependencia"
                            onChange={handleChange}
                            value={values.DEPENDENCIA}
                        /> </div> 
                        <div className="row-4 py-4">
                        <label className="px-4 bg-slate-300">MEN_BIM</label>
                        <input
                            type="text"
                            name='MEN_BIM'
                            placeholder="Escriba el periodo de cobro"
                            onChange={handleChange}
                            value={values.MEN_BIM}
                        /> </div>
                        <div className="row-4 py-4">
                        <label className="px-4 bg-slate-300 ">TFA</label>
                        <input
                            type="text"
                            name='TFA'
                            placeholder="Escriba el numero de tarifa"
                            onChange={handleChange}
                            value={values.TFA}
                        /> </div>
                        <label></label>
                        <button className=" px-4 bg-green-300">Guardar</button>
                        {isSubmitting ? "Guardando..." : "Guardar"}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CobsenForm;