import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Row,Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {modificarCita} from '../Services/clienteService'

function Modalcomponent({ show, closeModal, cliente }) {
  const [actu,setActu]=useState()

  const datos={
    _id:cliente._id,
    nombre:cliente.nombre,
    estado:actu
  }
  const update=()=>{
    modificarCita(datos)
  }



  return (
    <Modal
      show={show}
      onHide={closeModal}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modificar cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Group as={Row} mb={3}>
            <Form.Label column>Nombre del cliente:</Form.Label>
            <Form.Label column>{cliente.nombre}</Form.Label>
          </Form.Group>
          <Form.Group as={Row} mb={3}>
            <Form.Label column>Nombre del estilista:</Form.Label>
            <Form.Label column>{cliente.estilista}</Form.Label>
          </Form.Group>
          <Form.Group as={Row} mb={3}>
            <Form.Label column>Servicio:</Form.Label>
            <Form.Label column>{cliente.servicioNom}</Form.Label>
          </Form.Group>
          <Form.Group as={Row} mb={3}>
            <Form.Label column>Estado de la cita:</Form.Label>
            <Col>
            <Form.Control as="select" onChange={(e)=>setActu(e.target.value)} size="sm">
            <option value={cliente.estado}>{cliente.estado}</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Cancelado">Cancelado</option>
            </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
        <Button type="submit" onClick={(e)=>{closeModal();update(e)}} >
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modalcomponent;
