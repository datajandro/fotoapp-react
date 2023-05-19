import React from "react";
import './NavBarTop.css';
import { 
    faHeart as faHeartRegular
} from "@fortawesome/free-regular-svg-icons";
import { 
    //faHeart as faHeartSolid,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBarTop() {
    return(
      <nav className="navBarTop">
        <div className="titulo">
            <h1>FotoApp</h1>
        </div>
        <div className="contenedorInputNotificaciones" >
            <div className="inputContainer">
                <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>                
                <input className="inputBuscar" type='text' placeholder="Buscar" />
            </div>
            <button className="botonNotificaciones"><FontAwesomeIcon icon={faHeartRegular} /></button>
        </div>
      </nav>
    )
}

export default NavBarTop;