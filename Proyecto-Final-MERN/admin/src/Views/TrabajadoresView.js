import { React, useState, useEffect } from "react";
import { Container, Table, Button, Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ModalTrabajador from "../Components/ModalTrabajador";
import ModalCrearTrab from "../Components/ModalCrearTrab";
import {
  obtenerTrabajadores,
  eliminarTrabajador,
} from "../Services/trabajadorService";
import Swal from "sweetalert2";

function TrabajadoresView() {
  const [trabajadores, setTrabajadores] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const url = "http://localhost:5000";

  const [selected, setSelected] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const listaTrabajadores = async () => {
    let datos = await obtenerTrabajadores();
    setTrabajadores(datos.data);
  };

  const openModal = () => {
    setShow(true);
  };
  const openModal2 = () => {
    setShow2(true);
  };

  const closeModal = () => {
    window.location.reload(false);
    setShow(false);
  };
  const closeModal2 = () => {
    window.location.reload(false);
    setShow2(false);
  };

  const pasaServicio = (servi) => setSelected(servi);

  const eliminar = (ser) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Los datos seran enviados,¿Está seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado",
          text: "El trabajador ha sido eliminado",
          icon: "success",
        }).then(function () {
          window.location.reload();
        });
        eliminarTrabajador(ser);
      } else if (result.isDenied) {
      }
    })
   ;

  };

  useEffect(() => {
    listaTrabajadores();
  }, []);
  return (
    <Container>
      <Row>
        <Col className="mb-4">
          <h1>Trabajadores Disponibles</h1>
        </Col>
        <Button variant="dark" size="sm" className="mb-4" onClick={openModal2}>
          Ingresar nuevo trabajador
        </Button>
        <Table variant="dark">
          <thead>
            <tr>
              <th>Nombre del trabajador</th>
              <th>Foto</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          {trabajadores.map((trab, i) => (
            <tbody>
              <tr key={i}>
                <td>{trab.nombre}</td>
                <Image
                  id="image"
                  src={`${url}/Imagenes/${trab.foto}`}
                  alt={trab.foto}
                />
                <td>{trab.descripcion}</td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => {
                      pasaServicio(trab);
                      setSelectedId(trab._id);
                      openModal();
                    }}
                  >
                    Modificar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setSelectedId(trab._id);
                      eliminar(trab._id);
                    }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        <ModalTrabajador
          show={show}
          closeModal={closeModal}
          servicio={selected}
          idSelc={selectedId}
        />
        <ModalCrearTrab show={show2} closeModal={closeModal2} />
      </Row>
    </Container>
  );
}

export default TrabajadoresView;
