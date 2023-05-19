import './App.css';
import NavBar from './NavBar'
import NavBarTop from './NavBarTop.js';
import EstadosLista from './EstadosLista'
import FooterLateral from './FooterLateral';

import EmojiPicker from 'emoji-picker-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart as faHeartSolid,
  faEllipsis,
  faBookmark as faBookmarkSolid
} from '@fortawesome/free-solid-svg-icons';
import {
  faPaperPlane,
  faHeart as faHeartRegular,
  faComment,
  faBookmark,
  faFaceSmile
} from '@fortawesome/free-regular-svg-icons'

/*IMAGENES DE PERFIL*/
import perfilDaniel from './perfilDaniel.jpg'
import perfil_kelvin_valerio from './perfil1.jpg';
import perfil2 from './perfil2.jpg';
import perfil3 from './perfil3.jpg';
import perfil4 from './perfil4.jpg';
import perfil5 from './perfil5.jpg';
import perfil6 from './perfil6.jpg';
import perfil7 from './perfil7.jpg';
import perfil_anastasia_s from './perfil_anastasia_s.jpeg';

/*POSTS*/
import anastasia_s000000_1 from './anastasia_s000000_1.jpg';
import kelvin_valerio000000_1 from './kelvin_valerio000000_1.jpg'


import { useState } from 'react';

function AutorPost({ currentPost }) {
  return (
    <div className='autorPost marginPost'>
      <div className='autorPostAutor'>
        <img 
          src={currentPost.imagen} 
          alt="imagen de perfil"
          className='autorPostImagen bordeColorido'/>
        <p className='autorPostUsuario'>
          <a href='https://www.google.com' target='_blank' rel='noreferrer'>
            {currentPost.usuario}
          </a>
        </p>        
      </div>
      <MenuPost />
    </div>
  )
}

function Menu({ handleSetMenuTrue }) {
  return (
    <div className='menuContainer'>
      <div 
        className='menuFondo' 
        onClick={() => handleSetMenuTrue()}>
      </div>
      <div className='menu cuadroFlotante'>
        <ul className='menuUl'>
          <li key='denunciar' className='menuBold'>Denunciar</li>
          <li key='unfollow' className='menuBold'>Dejar de seguir</li>
          <li key='favoritos'>Agregar a favoritos</li>
          <li key='compartir'>Compartir en...</li>
          <li key='copiar'>Copiar enlace</li>
          <li key='codigoInsercion'>Código de inserción</li>
          <li key='info'>Información sobre esta cuenta</li>
          <li key='cancelar' onClick={() => handleSetMenuTrue()}>Cancelar</li>
        </ul>
      </div>      
    </div>
    
  )
}

function MenuPost() {
  const [menu, setMenu] = useState(false)

  function setMenuTrue() {
    setMenu(false);
  }

  return (
    <div>
      <div className='menuPost'>
        <button onClick={() => setMenu(true)}><FontAwesomeIcon icon={faEllipsis} /></button> 
      </div>    
      {menu && <Menu handleSetMenuTrue={setMenuTrue} />}  
    </div>

  )
}

function MultimediaPost({ currentPost }) {
  return (
    <img 
      src={currentPost.multimedia} 
      alt={'user' + currentPost.userid + 'post' + currentPost.postid}
      className='multimediaPost' />
  )
}

function InteraccionesPost({ currentPost, allPosts, handleSetPosts }) {
  const heartIcon = [
    <div className='buttonLike'>
      <FontAwesomeIcon icon={faHeartRegular} />
    </div>,
    <div className='buttonLike' style={{color: "#FF2F44"}}>
      <FontAwesomeIcon icon={faHeartSolid} />
    </div>    
  ]  

  const bookmarkIcon = [
    <div><FontAwesomeIcon icon={faBookmark} /></div>,
    <div style={{color: 'black'}}><FontAwesomeIcon icon={faBookmarkSolid} /></div>
  ]

  const indexOfPost = allPosts.indexOf(currentPost);

  const liked = currentPost.liked;
  const bookmarked = currentPost.bookmarked;

  function handleLikeButton() {
    if (liked === false) {
      allPosts[indexOfPost].likes += 1;
    } else {
      allPosts[indexOfPost].likes -= 1;
    }

    allPosts[indexOfPost].liked = !allPosts[indexOfPost].liked;
  }

  function handleBookmarkButton() {
    if (bookmarked === false) {
      allPosts[indexOfPost].bookmarked = true;
    } else {
      allPosts[indexOfPost].bookmarked = false;
    }
  }

  return (
    <div className='interaccionesPost marginPost'>
      <div className='interaccionesPostContainer1'>
        <button 
          className='buttonInteraccionesPost'
          onClick={() => {
            handleLikeButton();
            handleSetPosts([...allPosts]);
          } } >
          {!liked && heartIcon[0]}
          {liked && heartIcon[1]}
        </button>
        <button className='buttonInteraccionesPost'>
          <FontAwesomeIcon icon={faComment} />
        </button>
        <button className='buttonInteraccionesPost'>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>        
      </div>
      <button 
        className='buttonInteraccionesPost'
        onClick={() => {
          handleBookmarkButton();
          handleSetPosts([...allPosts]);}}>
        {!bookmarked && bookmarkIcon[0]}
        {bookmarked && bookmarkIcon[1]}
      </button>
    </div>
  )
}

function LikesPost({ currentPost }) {
  return (
    <p 
      className='likesPost' 
      style={{fontWeight: "bold", fontSize: "0.9rem"}} >
      {currentPost.likes} Me gusta
    </p>
  )
}

function DescripcionPost({ currentPost }) {
  const [masActivo, setMasActivo] = useState(false)

  let parrafoCortado = [currentPost.descripcion, []]

  function cortarParrafo() {
    let max = 114;
    if (parrafoCortado[0].length > max) {
      for (let i = 0; i < max; i++) {
        parrafoCortado[1].push(currentPost.descripcion[i])
      }
      return (
        <>
          {parrafoCortado[1]}...
          <br/>
          <button 
            onClick={() => setMasActivo(!masActivo)}
            style={{background: 'none', border: 'none', color: '#777777', margin: 'none', padding: 0}}>
            más</button>
        </>
      )
    } else if (parrafoCortado[0].length <= max) {
      return (
        <>
          {parrafoCortado[0]}
        </>
      )
    }
  }

  return (
    <p className='descripcionPost' style={{fontSize: '0.9rem'}}>
      <a 
        href='https://www.google.com' 
        target='_blank' 
        rel='noreferrer' 
        style={{
          color: 'black', 
          textDecoration: 'none', 
          fontWeight: 'bold'}}>
        {currentPost.usuario} </a>
        {!masActivo && cortarParrafo()} 
        {masActivo && parrafoCortado[0]}
    </p>
  )
}

function ComentariosPostResumido({ currentPost }) {
  function resumir54char(string) {
    if (string.length < 53) {
      return string
    } else {
      let stringResumido = [];
      for (let i = 0; i < 53; i++) {
        stringResumido.push(string[i]);
      }
      stringResumido.push(`...`)
      return stringResumido;
    }
  }

  return (
    <div>
      {currentPost.comentarios.length === 0 && <p></p>}
      {currentPost.comentarios.length === 1 && 
        <div className='descripcionPost' style={{fontSize: '0.9rem'}}>
          <p>
            <span style={{fontWeight: 'bold'}}>
              {currentPost.comentarios[0].usuario}
            </span> {resumir54char(currentPost.comentarios[0].comentario)}
          </p>
        </div>
      }
      {currentPost.comentarios.length >= 2 &&
        <div className='descripcionPost' style={{fontSize: '0.9rem'}}>
          <p>
            <span style={{fontWeight: 'bold'}}>
              {currentPost.comentarios[0].usuario}
            </span> {resumir54char(currentPost.comentarios[0].comentario)}
          </p>
          <p>
            <span style={{fontWeight: 'bold'}}>
              {currentPost.comentarios[1].usuario}
            </span> {resumir54char(currentPost.comentarios[1].comentario)}
          </p>
        </div>
      }
      
    </div>
  )
}

function VerComentariosPost({ currentPost }) {
  return (
    <div>
      <a 
        href='https://www.google.com'
        target='_blank'
        rel='noreferrer'
        style={{
          color: '#777777', 
          textDecoration: 'none', 
          margin: '0.6rem',
          fontSize: '0.9rem'}}>
        Ver los {currentPost.comentarios.length} comentarios
      </a>
    </div>
  )
}

function FechaPost({ currentPost }) {
  return (
    <p
      style={{
        color: '#777777',
        fontSize: '0.9rem',
        margin: '0.6rem'}} >
      {currentPost.fecha}</p>
  )
}

function EscribirComentario({ allPosts, currentPost, handleSetPosts, USUARIOS }) {
  const [styleSubmit, setStyleSubmit] = useState({color: '#B3DBFF'})
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState('')
  let indexCurrentPost = allPosts.indexOf(currentPost);
  
  function botonPublicar() {
    if (inputValue === '' || inputValue[0] === ' ') {
      alert('Para comentar, debes escribir un mensaje en la caja al lado del boton. El mensaje no puede comenzar con un "espacio".');
      return;
    }
    allPosts[indexCurrentPost].comentarios.unshift({usuario: USUARIOS[0].usuario, comentario: inputValue})
    handleSetPosts([...allPosts])
    console.log(allPosts[indexCurrentPost].comentarios[0])
    let arrayResumido = []
    for (let i = 0; i < 2; i++) {
      arrayResumido.push(allPosts[indexCurrentPost].comentarios[i])  
    }
    setInputValue('');
  }

  function inputOnChange(e) {
    setInputValue(e.target.value)
    if (inputValue.length > 0) {
      setStyleSubmit({color: '#0492F3'})
    }
  }



  return (
    <div className='escribirComentario'>
      <i onClick={() => setEmojiPicker(!emojiPicker)}><FontAwesomeIcon icon={faFaceSmile} /></i>
      <input 
        type='text' 
        value={inputValue} 
        placeholder='Escribe un comentario...' 
        onChange={(e) => inputOnChange(e)}/>
      <button
        style={styleSubmit}
        onClick={() => botonPublicar()}>Publicar</button>
      {emojiPicker && 
        <div className='emojiPickerContainer'>
          <EmojiPicker onEmojiClick={(e) => setInputValue(inputValue + e.emoji)} />
        </div>
      }
    </div>
  )
}

function ContenidoPost({ currentPost, allPosts, handleSetPosts, USUARIOS }) {

  return (
    <div className='contenidoEstado'>
      <AutorPost currentPost={currentPost} />
      <MultimediaPost currentPost={currentPost} />
      <InteraccionesPost currentPost={currentPost} allPosts={allPosts} handleSetPosts={handleSetPosts} />
      <LikesPost currentPost={currentPost} />
      <DescripcionPost currentPost={currentPost} />
      <VerComentariosPost currentPost={currentPost} />
      <ComentariosPostResumido 
        currentPost={currentPost} />
      <FechaPost currentPost={currentPost} />
      <EscribirComentario
        allPosts={allPosts} 
        currentPost={currentPost}
        handleSetPosts={handleSetPosts}
        USUARIOS={USUARIOS} />
    </div>
  )
}

function Post({ currentPost, allPosts, handleSetPosts, USUARIOS }) {
  return (
    <div className='post'>
      <ContenidoPost currentPost={currentPost} allPosts={allPosts} handleSetPosts={handleSetPosts} USUARIOS={USUARIOS} />
    </div>
  )
}

function App() {
  const [USUARIOS, setUSUARIOS] = useState([
    {
      nombre: 'Daniel',
      apellido: 'Torrealba',
      usuario: 'daniel_torrealba',
      imagen: perfilDaniel,
      id: 0,
      followed: true
    },
    {
      nombre: 'Kelvin',
      apellido: 'Valerio',
      usuario: 'kelvin_valerio',
      imagen: perfil_kelvin_valerio,
      id: 1,
      followed: true
    },
    {
      nombre: 'Stephen',
      apellido: 'Westby',
      usuario: 'westby_s',
      imagen: perfil2,
      id: 2,
      followed: false
    },
    {
      nombre: 'Nurlan',
      apellido: 'Tortbayev',
      usuario: 'nur_to',
      imagen: perfil3,
      id: 3,
      followed: false
    },
    {
      nombre: 'Đỗ Ngọc',
      apellido: 'Tú Quyên',
      usuario: 'dotuqu',
      imagen: perfil4,
      id: 4,
      followed: false
    },
    {
      nombre: 'Aghashukur',
      apellido: 'Mammadli',
      usuario: 'agha_mammadli',
      imagen: perfil5,
      id: 5,
      followed: false
    },
    {
      nombre: 'Odd',
      apellido: 'Falch',
      usuario: 'odd_falch',
      imagen: perfil6,
      id: 6,
      followed: false
    },
    {
      nombre: 'AG',
      apellido: 'Z',
      usuario: 'ag_z',
      imagen: perfil7,
      id: 7,
      followed: false
    },
    {
      nombre: 'Anastasia',
      apellido: 'Shuraeva',
      usuario: 'anastasia_s',
      imagen: perfil_anastasia_s,
      id: 8,
      followed: true
    }
  ])
  const [posts, setPosts] = useState([
    {
      userid: 8,
      imagen: USUARIOS[8].imagen,
      usuario: USUARIOS[8].usuario,
      multimedia: anastasia_s000000_1,
      likes: 7960,
      liked: false,
      bookmarked: false,
      descripcion: `Feeling so grateful for this beautiful day and the gorgeous scenery 
        around me! ☀️🌸🌳 I took a break from the hustle and bustle of the city and found 
        myself surrounded by these stunning flowers. 🥰 Nature truly has a way of lifting
        our spirits and reminding us of life's simple pleasures. What's making you happy 
        today?" 🌸💕 #naturelovers #cherryblossoms #happiness`,
      comentarios: [
        {
          usuario: USUARIOS[1].usuario,
          comentario: `This photo just radiates pure joy and happiness! 🌸✨`
        },
        {
          usuario: USUARIOS[2].usuario,
          comentario: `I love how you take time to enjoy the little things in life, 
          like picking flowers and taking in the beauty of nature.This photo just radiates pure joy and happiness! 🌸✨`
        }
      ],
      fecha: "2023-04-12"
    },
    {
      userid: 1,
      imagen: USUARIOS[1].imagen,
      usuario: USUARIOS[1].usuario,
      multimedia: kelvin_valerio000000_1,
      likes: 5403,
      liked: false,
      bookmarked: false,
      descripcion: `Cruising in style! This sleek sports car is turning heads on the streets. 
      Who else loves the feeling of the wind in their hair and the roar of an engine? 🏎️💨 
      #sportscar #fastandfurious #cruising`,
      comentarios: [
        {
          usuario: USUARIOS[3].usuario,
          comentario: `Wow, that car is a beauty! 😍 I bet it's a blast to drive on the open road. 🛣`
        },
        {
          usuario: USUARIOS[4].usuario,
          comentario: `I've always dreamed of owning a car like this! 🤩 One day, I'll make it happen. For now, I'll just admire yours from afar. 😉`
        }
      ],
      fecha: "2023-04-16"
    }
  ]);

  function listaDePosts() {
    let lista = []
    
    for (let i = 0; i < posts.length; i++) {
      lista.push(
        <Post currentPost={posts[i]} allPosts={posts} handleSetPosts={setPosts} USUARIOS={USUARIOS} />
      )
    }

    return lista;
  }

  const followedUsers = USUARIOS.filter((user) => user.followed === true)

  return (
    <div id='contenedorApp'>
      <NavBar currentPosts={posts} handleSetPosts={setPosts} allPosts={posts} USUARIOS={USUARIOS} />
      <NavBarTop />
      <div className='contenidoMasFooter'>
        <div className='contenidoDeLaPagina'>
          <EstadosLista followedUsers={followedUsers} USUARIOS={USUARIOS} />
          {listaDePosts()}
        </div>
        <FooterLateral USUARIOS={USUARIOS} handleSetUSUARIOS={setUSUARIOS} />        
      </div>
    </div>
  );
}

export default App;
