import { React, useState, useEffect } from "react";
import { Container, Table, Button, Col, Row,Image } from "react-bootstrap";
import { obtenerServicios,borrarServicio } from "../Services/serviciosService";
import ModalServicio from "../Components/ModalServicio";
import ModalCrearServ from "../Components/ModalCrearServ"
import Loading from "../Components/Loading";
import "../Components/Image.css"
import Swal from "sweetalert2";


function ServiciosView() {
  const [servicios, setServicios] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [load,setLoad]= useState(true)

  const [selected, setSelected] = useState([]);
  const [selectedId, setSelectedId]= useState("")

  const url="http://localhost:5000"

  const mostrarServicios = async () => {
    let datos = await obtenerServicios();

    setServicios(datos.data);
    setLoad(false)
  };


  const openModal = () => {
    setShow(true)
  };

  const openModal2 = () => {
    setShow2(true);
  };

  const closeModal = () => {
    window.location.reload(false)
    setShow(false)
  };
  const closeModal2 = () => {
    window.location.reload(false)
    setShow2(false)
  };

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
        borrarServicio(ser);
      } else if (result.isDenied) {
      }
    })
   ;

  }

  const pasaServicio = (servi) => setSelected(servi);

  useEffect(() => {
    mostrarServicios();
  }, []);
  return (
    <>
    {load?(
      <Loading/>
    ):
    <Container>
      <Row>
        <Col className="mb-4">
          <h1>Servicios Disponibles</h1>
        </Col>
        <Button variant="dark" size="sm" className="mb-4" onClick={openModal2}>
          Crear nuevo servicio
        </Button>
        <Table variant="dark">
          <thead>
            <tr>
              <th>Nombre del servicio</th>
              <th>Costo</th>
              <th>Foto</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          {servicios.map((ser, i) => (
            <tbody>
              <tr key={i}>
                <td>{ser.nombre}</td>
                <td>S/. {ser.precio}</td>
                <td>
                  <Image id="image" src={`${url}/Imagenes/${ser.foto}`} alt={ser.foto}/>
                </td>
                <td>{ser.descripcion}</td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => {
                      pasaServicio(ser);
                      setSelectedId(ser._id)
                      openModal();
                    }}
                  >
                    Modificar
                  </Button>
                  <br/>
                  <Button variant="danger"
                  className="mt-3"
                  onClick={()=>{
                    setSelectedId(ser._id)
                    eliminar(ser._id)
                  }}
                  >
                    Borrar
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
        <ModalServicio
          show={show}
          closeModal={closeModal}
          servicio={selected}
          idSelc={selectedId}
        />
          <ModalCrearServ
          show={show2}
          closeModal={closeModal2}
        />
      </Row>
    </Container>}
    </>
  );
}

export default ServiciosView;
