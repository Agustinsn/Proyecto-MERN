import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Dropdown } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {
  obtenerTodos,
  obtenerCitaTrabajador,
} from "../Services/clienteService";
import { obtenerTrabajadores } from "../Services/trabajadorService";
import Modalcomponent from "../Components/Modalcomponent";
import ModalNuevoCliente from "../Components/ModalNuevoCliente";

function Citasview() {
  const [cita, setCita] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [select, setSelect] = useState([]);
  const [filtro, setFiltro] = useState([]);

  const obtenerCita = async () => {
    let datos = await obtenerTodos();
    setCita(datos.data);
  };

  const openModal = () => {
    setShow(true);
  };
  const openModal2 = () => {
    setShow2(true);
  };
  const closeModal = () => {
    window.location.reload();
    setShow(false);
  };
  const closeModal2 = () => {
    window.location.reload();
    setShow2(false);
  };

  const pasarDatos = (dato) => setSelect(dato);

  const converDate = (a) => {
    let converfecha = new Date(a);
    return converfecha.toDateString();
  };

  const obtenerTrab = async () => {
    let datos = await obtenerTrabajadores();
    setFiltro(datos.data);
  };

  const filtrar = async (a) => {
    let citaTrab = await obtenerCitaTrabajador(a);
    setCita(citaTrab.data);
  };

  useEffect(() => {
    {
      obtenerCita();
      obtenerTrab();
    }
  }, []);
  return (
    <Container>
      <Row>
        <Col className="mb-4">
          <h1>Citas confirmadas</h1>
        </Col>

        <Dropdown className="pt-2">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Filtrar
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item
            as="button"
            onClick={(e) => {
              filtrar(e.target.value);
            }}
            value=""
          >
            Todos
          </Dropdown.Item>

            {filtro.map((fil, i) => (
              <Dropdown.Item
                as="button"
                onClick={(e) => {
                  filtrar(e.target.value);
                }}
                value={fil.nombre}
              >
                {fil.nombre}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="dark" size="sm" className="mb-4" onClick={openModal2}>
          Crear Nueva Cita
        </Button>
        <Table variant="dark">
          <thead>
            <tr>
              <th>Nombre del Cliente</th>
              <th>Fecha de la cita</th>
              <th>Hora de la cita</th>
              <th>Numero de contacto</th>
              <th>Estilista</th>
              <th>Servicio</th>
              <th>Estado</th>
              <th>Modificar</th>
            </tr>
          </thead>

          {cita.map((cli, i) => (
            <tbody>
              {cli.estado !== "Confirmado" ? (
                ""
              ) : (
                <tr key={i}>
                  <td className="pt-3">{cli.nombre}</td>
                  <td className="pt-3">{converDate(cli.fecha)}</td>
                  <td className="pt-3">{cli.hora} Horas</td>
                  <td className="pt-3">{cli.numero}</td>
                  <td className="pt-3">{cli.estilista}</td>
                  <td className="pt-3">{cli.servicioNom}</td>
                  <td className="pt-3">{cli.estado}</td>
                  <td>
                    <Button
                      onClick={() => {
                        openModal();
                        pasarDatos(cli);
                      }}
                    >
                      Modificar
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          ))}
        </Table>
      </Row>
      <Modalcomponent show={show} closeModal={closeModal} cliente={select} />
      <ModalNuevoCliente show={show2} closeModal={closeModal2} />
    </Container>
  );
}

export default Citasview;
