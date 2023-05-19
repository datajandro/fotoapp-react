import React from 'react';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faMagnifyingGlass,
    faBars,
    faIcons
} from '@fortawesome/free-solid-svg-icons';
import {
    faCompass,
    faCirclePlay,
    faSquarePlus,
    faPaperPlane,
    faHeart as faHeartRegular
} from '@fortawesome/free-regular-svg-icons';


//NUEVO POST
import imagenNuevoPost1 from './imagenNuevoPost1.jpg'
import imagenNuevoPost2 from './imagenNuevoPost2.jpg'
import imagenNuevoPost3 from './imagenNuevoPost3.jpg'

function CrearPost({ handleCrear, currentPosts, handleSetPosts, USUARIOS }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [textarea, setTextarea] = useState('');  
  
    const todayDate = new Date();
  
    const [newPost, setNewPost] = useState({
      userid: 0,
      imagen: USUARIOS[0].imagen,
      usuario: USUARIOS[0].usuario,
      multimedia: '',
      likes: 0,
      liked: false,
      bookmarked: false,
      descripcion: '',
      comentarios: [],
      fecha: todayDate.toDateString()
    })
  
    function handleSetNewPost(currentKey, newValue) {
      let copiedObject = JSON.parse(JSON.stringify(newPost));
      
      if (currentKey === 'multimedia') {
        copiedObject[currentKey] = newValue;
        setSelectedImage(newValue);
      }
  
      if (currentKey === 'descripcion') {
        copiedObject[currentKey] = newValue;
        setTextarea(newValue);
      }
      
      setNewPost(copiedObject);
    }
  
    function handleSubmitNewPost() {
      if (newPost.multimedia === '') {
        alert('Debes seleccionar una imagen.');
      }
      if (newPost.descripcion === '') {
        alert('Debes escribir al menos un caracter para la descripción.')
      }
  
      if (newPost.multimedia !== '' && newPost.descripcion !== '') {
        let nuevoArrayPosts = [newPost];
        for (let i = 0; i < currentPosts.length; i++) {
          nuevoArrayPosts.push(currentPosts[i]);
        }
        handleSetPosts(nuevoArrayPosts);
        handleCrear(false);
      }
    }
  
    return (
      <div>
        <div 
          className='menuFondo' onClick={() => handleCrear(false)}>
        </div>
        <div className='crearPost cuadroFlotante'>
          <h4 className='tituloCrearPost'>Crear nueva publicación</h4>
          <div className='editarPost'>
            <FontAwesomeIcon icon={faIcons} />
            <br />
            <div className='formulario'>
              <h3>Selecciona una imagen</h3>
              <div className='imagenesCrearPost'>
                <img 
                  src={imagenNuevoPost1} 
                  alt='Imagen de Nuevo Post 1'
                  onClick={() => handleSetNewPost('multimedia', imagenNuevoPost1)} />
                <img 
                  src={imagenNuevoPost2} 
                  alt='Imagen de Nuevo Post 2'
                  onClick={() => handleSetNewPost('multimedia', imagenNuevoPost2)} />
                <img 
                  src={imagenNuevoPost3} 
                  alt='Imagen de Nuevo Post 3'
                  onClick={() => handleSetNewPost('multimedia', imagenNuevoPost3)} />
              </div>
              <textarea 
                value={textarea} 
                onChange={(e) => handleSetNewPost('descripcion', e.target.value)}
                rows={8} 
                cols={40}></textarea>
                <input type='submit' onClick={() => handleSubmitNewPost()} />            
            </div>
          </div>
          <img style={{width: '10%'}} src={selectedImage} alt='Imagen seleccionada' /> 
          <h5>{JSON.stringify(newPost.descripcion)}</h5>
        </div>    
      </div>
    )
  }

export default function NavBar({ allPosts, currentPosts, handleSetPosts, USUARIOS }) {
    const [crear, setCrear] = useState(false)
  
    return (
      <nav className='navBar'>
        <div>
          <h2>
            <i className="fotoappIconoNavbar"><FontAwesomeIcon icon={faIcons} /></i>
            <p>FotoApp</p>
          </h2>
          <ul className='navList'>
            <li key='home' className='navBarBoton'>
              <FontAwesomeIcon icon={faHouse} />
              <p>Inicio</p>  
            </li>
            <li key='search' className='navBarBoton'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <p>Búsqueda</p>          
            </li>
            <li key='explore' className='navBarBoton'>
              <FontAwesomeIcon icon={faCompass} />
              <p>Explorar</p>          
            </li>
            <li key='videos' className='navBarBoton'>
              <FontAwesomeIcon icon={faCirclePlay} />
              <p>Videos</p>          
            </li>
            <li key='messages' className='navBarBoton'>
              <FontAwesomeIcon icon={faPaperPlane} />
              <p>Mensajes</p>          
            </li>
            <li key='notifications' className='navBarBoton'>
              <FontAwesomeIcon icon={faHeartRegular} />
              <p>Notificaciones</p>          
            </li>
            <li key='create' className='navBarBoton' onClick={() => setCrear(!crear)}>
              <FontAwesomeIcon icon={faSquarePlus} />
              <p>Crear</p>     
            </li>
            {crear && 
              <CrearPost 
                handleCrear={setCrear} 
                currentPosts={currentPosts} 
                handleSetPosts={handleSetPosts}
                allPosts={allPosts}
                USUARIOS={USUARIOS} />}
            <li key='profile' className='navBarBoton'>
              <img 
                src={USUARIOS[0].imagen} 
                alt="Perfil 1"
                id='fotoPerfilNavBar'
                className='imgBordeCircular' />
              <p>Perfil</p>          
            </li>
          </ul>        
        </div>
        <div id='navBarMas' className='navBarBoton'>
          <FontAwesomeIcon icon={faBars} />
          <p>Más</p>
        </div>
      </nav>
    )
}