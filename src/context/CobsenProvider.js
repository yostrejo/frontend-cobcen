import { createContext, useContext, useState } from "react";
import {
  getListRequest,
  deleteCobsenRequest,
  createCobsenRequest,
  getCobsenRequest,
 updateCobsenRequest,
 getListSector,
 getListSector1,
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
          loadCobsens,
          loadSector,
          loadSector1,
        deleteCobsen,
        createCobsen,
        getCobsen,
        updateCobsen,
        //toggleCobsenDone,
      }}
    >
      {children}
    </CobsenContext.Provider>
  );
};