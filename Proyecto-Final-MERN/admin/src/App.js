import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Citasview from "./Views/Citasview";
import SolicitudesView from "./Views/SolicitudesView";
import ServiciosView from "./Views/ServiciosView";
import TrabajadoresView from "./Views/TrabajadoresView";
import HomeView from "./Views/HomeView";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/Home" exact component={HomeView} />
          <Route path="/Cita" exact component={Citasview} />
          <Route path="/Solicitudes" exact component={SolicitudesView} />
          <Route path="/Servicios" exact component={ServiciosView} />
          <Route path="/Trabajadores" exact component={TrabajadoresView} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
