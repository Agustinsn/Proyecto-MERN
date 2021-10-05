import React, { useState} from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Row, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { crearTrabajador } from "../Services/trabajadorService";



function ModalCrearTrab({ show, closeModal}) {
  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [foto, setFoto] = useState("");
  const [fotoUrl,setFotoUrl]= useState("")



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
    setFoto("")
    setFotoUrl("")
  }

  const updateData = async () => {
    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("foto", foto);
    crearTrabajador(formData)
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
        <Modal.Title>Ingresar nuevo trabajador</Modal.Title>
      </Modal.Header>
      <span>
        <strong>Por favor ingresar todos los datos!</strong>
      </span>
      <Modal.Body>
        <Form encType="multipart/form-data">
          <Form.Group as={Row} mb={3} md={2}>
            <Form.Label column>Nombre del trabajador:</Form.Label>
            <Form.Control
              required
              column
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Row} mb={3} md={2}>
            <Form.Label column>Descripcion del servicio:</Form.Label>
            <Form.Control           
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
          <Image id="image" src={`${fotoUrl}`} alt={fotoUrl}/>
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

export default ModalCrearTrab;
