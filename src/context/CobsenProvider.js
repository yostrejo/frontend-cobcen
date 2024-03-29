import { createContext, useContext, useState } from "react";
import {
  createRegistro,
  formatRegistro,
  getListRequest,
  deleteCobsenRequest,
  createCobsenRequest,
  getCobsenRequest,
 updateCobsenRequest,
 getListSector,
 getListSector1,
 getRegistros,
 searchRegistros
  // toggleCobsenDoneRequest,
} from "../api/cobsen.api.js";
import { CobsenContext } from "./CobsenContext";

export const useCobsens = () => {
  const context = useContext(CobsenContext);
  if (context === undefined) {
    throw new Error("useCobsens must be used within a TaskContextProvider");
  }
  return context;
};

export const CobsenContextProvider = ({ children }) => {
  const [cobsens, setCobsens] = useState([]);

  async function loadCobsens() {
    const response = await getListRequest();
    setCobsens(response.data);
  }

  async function loadSector() {
    const response = await getListSector();
    setCobsens(response.data);
  }

  async function loadSector1() {
    const response = await getListSector1();
    setCobsens(response.data);
  }

  const deleteCobsen = async (RPU) => {
    try {
      const response = await deleteCobsenRequest(RPU);
      setCobsens(cobsens.filter((cobsen) => cobsen.RPU !== RPU));
    } catch (error) {
      console.error(error);
    }
  };

  const createCobsen = async (cobsen) => {
    try {
     const response = await createCobsenRequest(cobsen);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  const getCobsen = async (RPU) => {
    try {
      const response = await getCobsenRequest(RPU);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

 const updateCobsen = async (RPU, newFields) => {
    try {
      const response = await updateCobsenRequest(RPU, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const updateRegistro = async (cobsen) => {
    try {
      const response = await createRegistro(cobsen);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRegistro = async ( RPU, newFields) => {
    try {
      const response = await formatRegistro(RPU, newFields);
//      setCobsens([... cobsens, response.data]);
       console.log(response);
    } catch (error) {
      console.error(error);
    }
  };


  async function loadRegistros() {
    const response = await getRegistros();
    setCobsens(response.data);
  }

  const searchRegistro = async ( search) => {
    try {
      const response = await searchRegistros(search);
      setCobsens(response.data);
       console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
/*
  const toggleCobsenDone = async (RPU) => {
    try {
      const CobsenFound = cobsen.find((cobsen) => cobsen.RPU === RPU);
      await toggleCobsenDoneRequest(RPU, cobsenFound.done === 0 ? true : false);
      setCobsens(
        cobsens.map((cobsen) =>
          cobsen.RPU === RPU ? { ...cobsen, done: !cobsen.done } : cobsen
        )
      );
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    <CobsenContext.Provider
      value={{
        cobsens,
          loadRegistros,
          loadCobsens,
          loadSector,
          loadSector1,
        deleteCobsen,
        createCobsen,
        getCobsen,
        updateCobsen,
        deleteRegistro,
        updateRegistro,
        searchRegistro
      }}
    >
      {children}
    </CobsenContext.Provider>
  );
};