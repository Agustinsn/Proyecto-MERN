import React from 'react'
import Spinner from 'react-bootstrap/Spinner'


function Loading() {
    return (
            <div
            style={{
            position:'fixed',
            top:'0',
            left:'0',
            width:'100vw',
            height:'100vh',
            backgroundColor:'rgba(0,0,0,0.5)',
            zIndex:'99'
            }}
            >
            <Spinner         
            style={{
              position:'absolute',
              top:'calc(50% - 50px)',
              left:'calc(50% - 50px)',
              width:'40px'
            }} color="primary"/>
            
            </div>
    )
}

export default Loading
