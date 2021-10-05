import axios from "axios";

//const url=`${process.env.REACT_APP_URL_API}/agenda`
const url = "http://localhost:5000/servicio";

const obtenerServicios = async () => {
  try {
    let datos = await axios.get(url);
    return datos;
  } catch (error) {
    throw error;
  }
};

const obtenerServiciosporID = async (id) => {
  try {
    let { data } = await axios.get(`${url}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
const crearServicio = async (serv) => {
  try {
    let headers = {
      "Content-Type": "multipart/form-data",
    };
    let { data } = await axios.post(url, serv, headers);
    return data;
  } catch (error) {
    throw error;
  }
};
const modificarServicio = async (serv) => {
  try {
    let headers = {
      "Content-Type": "multipart/form-data",
    };
    let { data } = await axios.put(url, serv, headers);
    return data;
  } catch (error) {
    throw error;
  }
};

const borrarServicio = async (serv) => {
  axios.delete(`${url}/${serv}`);
};

export {
  obtenerServicios,
  modificarServicio,
  obtenerServiciosporID,
  borrarServicio,
  crearServicio
};
