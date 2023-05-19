import { useState } from 'react'
import './EstadosLista.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

//IMAGENES DE ESTADOS
import estado_kelvin_valerio_multimedia000000 from './fotosEstados/estado_kelvin_valerio000000.jpg'

function EstadoFotoLink({ usuarioIndex, followedUsers }) {
    return (
      <div className='estadoFotoLink'>
        <img 
          className='fotoEstadoFotoLink bordeColorido' 
          src={followedUsers[usuarioIndex].imagen} 
          alt='foto de perfil' />
        <p className='usuarioEstadoFotoLink'>
          {followedUsers[usuarioIndex].nombre}
        </p>
      </div>
  
    )
}

function VerEstado({
    visorEstado,
    handleSetVisorEstado
}) {
    return (
        <div className='backgroundVerEstado'>
            <h1 className='appNameVerEstado'>FotoApp</h1>
            <img 
                className='multimediaVerEstado'
                src={estado_kelvin_valerio_multimedia000000} 
                alt='Estado de Kelvin Valerio' />
            <div
                className='iconCloseVerEstado'
                onClick={() => handleSetVisorEstado(!visorEstado)}
            >
                <FontAwesomeIcon icon={faX} />
            </div>
        </div>
    )
}
  
export default function EstadosLista({ followedUsers, USUARIOS }) {
    //USUARIOS.indexOf(followedUsers[i])

    const [visorEstado, setVisorEstado] = useState(false)

    function listaEstado() {
      let lista = []
  
      for (let i = 0; i < followedUsers.length; i++) {
        lista.push(
          <button
            onClick={() => setVisorEstado(!visorEstado)}  
          >
            <EstadoFotoLink usuarioIndex={i} followedUsers={followedUsers}/>
          </button>
        )  
      }
  
      return lista
    }
  
    function repeat() {return 'repeat(' + USUARIOS.length + ', 1fr)'};
  
    return (
      <div 
        class="estadosLista" 
        style={{gridTemplateColumns: repeat()}}>
        {listaEstado()}
        {visorEstado && 
            <VerEstado 
                visorEstado={visorEstado} 
                handleSetVisorEstado={setVisorEstado}
            />
        }
      </div>
    )
  }