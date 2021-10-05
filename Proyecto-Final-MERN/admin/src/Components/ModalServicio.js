import React, { useState} from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Row, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { modificarServicio } from "../Services/serviciosService";



function ModalServicio({ show, closeModal, servicio ,idSelc}) {
  const [nombre, setNombre] = useState();
  const [precio, setPrecio] = useState();
  const [descripcion, setDescripcion] = useState();
  const [foto, setFoto] = useState("");
  const [fotoUrl,setFotoUrl]= useState("")
  const url="http://localhost:5000"



  const handleFileChange = (e) => {
    const fotocargada= e.target.files[0]
    setFoto(fotocargada);

    let reader = new FileReader()

    reader.onloadend=()=>{
      setFotoUrl(reader.result)
    }

    reader.readAsDataURL(fotocargada)
  };

  const limpiarTodo =()=>{
    console.log(idSelc)
    setFoto("")
    setFotoUrl("")
  }

  const updateData = async () => {
    const formData = new FormData();

    formData.append("_id",idSelc);
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("descripcion", descripcion);
    formData.append("foto", foto);
    modificarServicio(formData)
  };

 
  return (

    <Modal
      show={show}
      onHide={closeModal}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Modificar Servicio</Modal.Title>
      </Modal.Header>
      <span>
        <strong>Por favor ingresar todos los datos!</strong>
      </span>
      <Modal.Body>
        <Form encType="multipart/form-data">
          <Form.Group as={Row} mb={3} md={2}>
            <Form.Label column>Nombre del servicio:</Form.Label>
            <Form.Control
              defaultValue={servicio.nombre}
              required
              column
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Row} mb={3} md={2}>
            <Form.Label column>Costo:</Form.Label>
            <Form.Control
              defaultValue={servicio.precio}            
              required
              column
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Row} mb={3} md={2}>
            <Form.Label column>Descripcion del servicio:</Form.Label>
            <Form.Control
              defaultValue={servicio.descripcion}            
              required
              column
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Row} mb={3} md={2}>
            <Form.Label column>Foto del servicio:</Form.Label>
            <Form.File
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Image id="image" src={foto==""?(`${url}/Imagenes/${servicio.foto}`):`${fotoUrl}`} alt={fotoUrl}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={(e)=>{closeModal(); limpiarTodo()}}>
          Cerrar
        </Button>
        <Button
          type="submit"
          variant="outline-warning"
          onClick={(e) => {
            closeModal();
            updateData(e);
          }}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalServicio;
