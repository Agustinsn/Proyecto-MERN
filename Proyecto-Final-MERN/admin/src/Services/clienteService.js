import axios from "axios"

//const url=`${process.env.REACT_APP_URL_API}/agenda`
const url='http://localhost:5000/agenda'

const obtenerTodos = async ()=>{
    try{
        let data =await axios.get(url)
        return data
    } catch(error){
        throw error
    }

}

const obtenerCliente = async(num)=>{
    try {
        let data= await axios.get(url,{params:{cod:num}})
        return data
    } catch (error) {
        throw error
    }
}

const obtenerCitaTrabajador = async(trab)=>{
    try {
        let data= await axios.get(`${url}/${trab}`)
        return data
    } catch (error) {
        throw error
    }
}

const crearCita = async(nuevaCita)=>{
    try {
        let headers={
            "Content-Type":"application/json"
        }
        let {data}= await axios.post(url,nuevaCita,{headers})
        return data
    } catch (error) {
        throw error
    }
}
const modificarCita = async(Modificar)=>{
    try {
        let headers={
            "Content-Type":"application/json"
        }
        let {data}=await axios.put(url,Modificar,{headers})
        return data
} catch(error){
    throw error
}}

const borrarCita = async (cita) => {
    axios.delete(`${url}/${cita}`);
  };

export{
    obtenerCliente,
    obtenerCitaTrabajador,
    crearCita,
    obtenerTodos,
    modificarCita,
    borrarCita
}