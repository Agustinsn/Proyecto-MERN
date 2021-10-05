import { React, useState, useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { obtenerTodos,borrarCita } from "../Services/clienteService";
import Modalcomponent from "../Components/Modalcomponent";
import Swal from "sweetalert2";

function SolicitudesView() {
  const [cita, setCita] = useState([]);
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState([]);
  const [selectedId, setSelectedId]= useState("")

  const obtenerCita = async () => {
    let datos = await obtenerTodos();
    setCita(datos.data);
  };

  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    window.location.reload(false)
    setShow(false)};

  const pasarDatos = (dato) => setSelect(dato);

  const converDate = (a) => {
    let converfecha = new Date(a);
    return converfecha.toDateString();
  };

  const eliminar=(ser)=>{
    Swal.fire({
      title: "¿Está seguro?",
      text: "La cita sera borrada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Borrado",
          text: "La cita fue borrada!",
          icon: "success",
        }).then(function () {
          window.location.reload();
        });
        borrarCita(ser);
      } else if (result.isDenied) {
      }
    })
  }

  useEffect(() => {
    obtenerCita();
  }, []);
  
  return (
    <Container>
      <Row>
        <h1>Solicitud de Citas</h1>
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
              {cli.estado === "pendiente" ? (
                <tr key={i}>
                  <td >{cli.nombre}</td>
                  <td>{converDate(cli.fecha)}</td>
                  <td>{cli.hora}</td>
                  <td>{cli.numero}</td>
                  <td>{cli.estilista}</td>
                  <td>{cli.servicioNom}</td>
                  <td>{cli.estado}</td>
                  <td >
                    <Button
                      onClick={() => {
                        openModal();
                        pasarDatos(cli);
                      }}
                    >
                      Modificar
                    </Button> <br/>
                    <Button
                    className="mt-3"
                    variant="danger"
                    onClick={()=>{
                      setSelectedId(cli._id)
                      eliminar(cli._id)
                    }}
                    >Borrar</Button>
                  </td>
                </tr>
              ) : (
""
              )}
            </tbody>
          ))}
        </Table>
        <h1>Citas Canceladas</h1>
        <Table variant="dark">
          <thead>
            <tr>
            <th>Nombre del Cliente</th>
              <th className="pt-4">Fecha de la cita</th>
              <th className="pt-4">Hora de la cita</th>
              <th className="pt-4">Numero de contacto</th>
              <th className="pt-4">Estilista</th>
              <th className="pt-4">Servicio</th>
              <th className="pt-4">Estado</th>
              <th className="pt-4">Modificar</th>
            </tr>
          </thead>

          {cita.map((cli, i) => (
            <tbody>
              {cli.estado === "Cancelado" ? (
                <tr  key={i}>
                  <td  className="pt-4">{cli.nombre}</td>
                  <td className="pt-4">{converDate(cli.fecha)}</td>
                  <td className="pt-4">{cli.hora}</td>
                  <td className="pt-4">{cli.numero}</td>
                  <td className="pt-4">{cli.estilista}</td>
                  <td className="pt-4">{cli.servicioNom}</td>
                  <td className="pt-4">{cli.estado}</td>
                  <td >
                    <Button
                    size="sm"
                      onClick={() => {
                        openModal();
                        pasarDatos(cli);
                      }}
                    >
                      Modificar
                    </Button><br/>
                    <Button
                    className="mt-3"
                    variant="danger"
                    onClick={()=>{
                      setSelectedId(cli._id)
                      eliminar(cli._id)
                    }}
                    >Borrar</Button>
                  </td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          ))}
        </Table>
      </Row>
      <Modalcomponent show={show} closeModal={closeModal} cliente={select} />
    </Container>
  );
}

export default SolicitudesView;
