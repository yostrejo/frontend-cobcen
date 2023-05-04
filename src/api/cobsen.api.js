import axios from "axios";


export const getListRequest = async () =>
  await axios.get("http://localhost:3030/api/languages");
  
export const getListSector = async () =>
await axios.get("http://localhost:3030/api/languages/sectores");

export const getListSector1 = async () =>
await axios.get("http://localhost:3030/api/languages/poderejecutivo");

export const createCobsenRequest = async (cobsen) =>
await axios.post("http://localhost:3030/api/languages", cobsen);

export const deleteCobsenRequest = async (RPU) =>
await axios.delete(`http://localhost:3030/api/languages/${RPU}`);

export const getCobsenRequest = async (RPU) =>
await axios.get(`http://localhost:3030/api/languages/${RPU}`);

export const updateCobsenRequest = async (RPU, newFields) =>
await axios.put(`http://localhost:3030/api/languages/${RPU}`, newFields);

export const createRegistro = async () =>
await axios.post("http://localhost:3030/api/languages/files");

export const formatRegistro = async () =>
await axios.put(`http://localhost:3030/api/languages/formatear`);

export const getRegistros = async () =>
  await axios.get("http://localhost:3030/api/languages/registros");
