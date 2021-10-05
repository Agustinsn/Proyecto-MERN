import React from 'react'
import { Container } from 'react-bootstrap'
import saloon from "../Img/saloon.jpg"

function HomeView() {
    return (
        <Container>
            <h1>Bienvenido!</h1>

            <img id="welcomeImg" src={saloon}/>
        </Container>
    )
}

export default HomeView
