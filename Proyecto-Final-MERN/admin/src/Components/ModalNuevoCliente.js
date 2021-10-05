import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {crearCita} from '../Services/clienteService'
import { obtenerTrabajadores } from "../Services/trabajadorService";
import { obtenerServicios } from "../Services/serviciosService";

import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import fi from "date-fns/locale/es";

function ModalNuevoCliente({ show, closeModal }) {
  const [estado, setEstado] = useState("Confirmado");
  const [nombre, setNombre] = useState();
  const [estilista, setEstilista] = useState();
  const [servicioNom, setServicioNom] = useState();
  const [numero, setNumero] = useState();

  const [trabajadores, setTrabajadores] = useState([]);
  const [servi, setServi] = useState([]);


  const datosTrabajadores = async () => {
    let datos = await obtenerTrabajadores();
    setTrabajadores(datos.data);
  };
  const datosServicios = async () => {
    let datos = await obtenerServicios();
    setServi(datos.data);
  };

  const [fecha1, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 9)
  );

  let fecha = fecha1.getTime();
  let hora = fecha1.getHours();

  const datos = {
    nombre,
    numero,
    estilista,
    servicioNom,
    estado,
    fecha,
    hora,
  };

  const update = () => {
    crearCita(datos)
  };
  useEffect(() => {
    {
      datosTrabajadores();
    }

    {
      datosServicios();
    }
  }, []);

  return (
    <Modal
      show={show}
      onHide={closeModal}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} mb={3} md={2}>
            <Form.Label column>Nombre del cliente:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Row} mb={3} md={2}>
            <Form.Label column>Número de Celular:</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setNumero(e.target.value)}
              value={numero}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Row} mb={3} md={2}>
            <Form.Label column>Nombre del estilista:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setEstilista(e.target.value)}
              size="sm"
            >
               <option disabled selected hidden>Elija un Estilista</option>              
              {trabajadores.map((trab, i) => (
                <option key={i}>{trab.nombre}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Row} mb={3} md={2}>
            <Form.Label column>Servicio:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setServicioNom(e.target.value)}
              size="sm"
            >
               <option disabled selected hidden>Elija un Servicio</option>              
              {servi.map((serv, i) => (
                <option key={i}>{serv.nombre}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Row} mb={3} md={2}>
            <Form.Label column>Estado de la cita:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setEstado(e.target.value)}
              size="sm"
            >
              <option value="Confirmado">Confirmado</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Row} mb={3}>
          <Form.Label column>El dia de la cita es:</Form.Label>
              <Col>
            {fecha1.toLocaleDateString("es-ES", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}<br/>

            {fecha1.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
            </Col>
            </Form.Group>
            <Form.Group as={Row} mb={3}>
            <Col className="ml-5">
              <DatePicker
                selected={fecha1}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                value={fecha1}
                showTimeSelect
                timeIntervals={60}
                timeCaption="Time"
                timeFormat="h:mm aa"
                minTime={setHours(setMinutes(new Date(), 1, 0), 9)}
                maxTime={setHours(setMinutes(new Date(), 1, 0), 19)}
                locale={fi}
                withPortal
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
        <Button
          type="submit"
          onClick={(e) => {
            closeModal();
            update(e);
          }}
        >
          Guardar Cita
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalNuevoCliente;
