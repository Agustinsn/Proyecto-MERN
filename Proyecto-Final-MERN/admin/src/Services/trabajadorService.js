import axios from 'axios'

// const url=`${process.env.REACT_APP_URL_API}/estilista`
const url='http://localhost:5000/estilista'

const obtenerTrabajadores= async ()=>{
    try {
        let data= await axios.get(url)
        return data
    } catch (error) {
        throw error
    }
}

const obtenerTrabajadoresporID= async(id)=>{
    try {
        let {data} = await axios.get(`${URL}/${id}`)
        return data
    } catch (error) {
        throw error
    }
}
const crearTrabajador = async (trab) => {
    try {
      let headers = {
        "Content-Type": "multipart/form-data",
      };
      let { data } = await axios.post(url, trab, headers);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const modificarTrabajador = async (trab) => {
    try {
      let headers = {
        "Content-Type": "multipart/form-data",
      };
      let { data } = await axios.put(url, trab, headers);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const eliminarTrabajador = async (serv) => {
    axios.delete(`${url}/${serv}`);
  };

export{
    obtenerTrabajadores,
    obtenerTrabajadoresporID,
    crearTrabajador,
    modificarTrabajador,
    eliminarTrabajador
}