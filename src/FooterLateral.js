import React from "react";
import './FooterLateral.css'

function Header({ USUARIOS }) {
    return (
        <div className="header1">
            <div className="header2">
            <img 
                className="fotoTuPerfilHeader" 
                src={USUARIOS[0].imagen} 
                alt="Tu foto de perfil" />
            <div className="nombresTuPerfilHeader">
                <p className="usuarioHeader">
                    {USUARIOS[0].usuario}
                </p>
                <p className="nombreHeader">
                    {USUARIOS[0].nombre + ' ' + USUARIOS[0].apellido}
                </p>
            </div>
            </div>
            <button className="buttonTuPerfilHeader">Cambiar</button>
        </div>
    )
}

function UsuarioSugerido({ 
    notFollowedUsers, 
    index, 
    USUARIOS, 
    handleSetUSUARIOS,
}) {
    let indexOfUser = USUARIOS.indexOf(notFollowedUsers[index]);

    function handleSetFollowed() {
        USUARIOS[indexOfUser].followed = !USUARIOS[indexOfUser].followed
        handleSetUSUARIOS([...USUARIOS])
    }

    return (
        <div className="header1">
            <div className="header2">
            <img 
                className="fotoTuPerfilHeader" 
                style={{width: '2rem', marginLeft: 5}}
                src={notFollowedUsers[index].imagen} 
                alt="Tu foto de perfil" />
            <div className="nombresTuPerfilHeader">
                <p 
                    className="usuarioHeader"
                    style={{fontSize: '0.85rem'}}
                >
                    {notFollowedUsers[index].usuario}
                </p>
                <p 
                    className="nombreHeader"
                    style={{fontSize: '0.75rem'}}
                >
                    {notFollowedUsers[index].nombre + ' ' + notFollowedUsers[index].apellido}
                </p>
            </div>
            </div>
            <button 
                className="buttonTuPerfilHeader"
                onClick={() => handleSetFollowed()}>Seguir</button>
        </div>
    )
}

function UsuariosSugeridos({ USUARIOS, handleSetUSUARIOS }) {
    function listaUsuariosSugeridos() {
        let lista = []
        let notFollowedUsers = USUARIOS.filter((user) => !user.followed)
        if (notFollowedUsers.length <= 0) {
            lista.push(<p className="nombreHeader" style={{border: '1px solid lightgray'}}>Ya sigues a todos los usuarios de esta plataforma.</p>)
        } else if (notFollowedUsers.length > 0 && notFollowedUsers.length <= 5) {
            for (let i = 0; i < notFollowedUsers.length; i++) {
                lista.push(
                    <UsuarioSugerido 
                        notFollowedUsers={notFollowedUsers} 
                        index={i} 
                        USUARIOS={USUARIOS}
                        handleSetUSUARIOS={handleSetUSUARIOS}
                    />
                )
            }
        } else {
            for (let i = 0; i < 5; i++) {
                lista.push(
                    <UsuarioSugerido 
                        notFollowedUsers={notFollowedUsers} 
                        index={i} 
                        USUARIOS={USUARIOS}
                        handleSetUSUARIOS={handleSetUSUARIOS}
                    />
                )
            }
        }

        return lista
    }

    return (
        <div className="usuariosSugeridos">
            {listaUsuariosSugeridos()}
        </div>
    )
}

function Sugerencias({ USUARIOS, handleSetUSUARIOS }) {
    return (
        <div className="sugerencias">
            <div className="header1">
                <h1 className="tituloSugerencias">
                    Sugerencias para ti
                </h1>
                <button 
                    className="buttonTuPerfilHeader"
                    style={{color: '#111111'}}>Ver Todo
                </button>
            </div>
            <UsuariosSugeridos USUARIOS={USUARIOS} handleSetUSUARIOS={handleSetUSUARIOS} />
        </div>
    )
}

function Footer() {
    return (
        <div className="footerDelFooter">
            <ul className="footerUl">
                <li key='info'><a target="_blank" rel="noreferrer" href="http://www.google.com">Información</a></li>
                <li key='help'><a target="_blank" rel="noreferrer" href="http://www.google.com">Ayuda</a></li>
                <li key='press'><a target="_blank" rel="noreferrer" href="http://www.google.com">Prensa</a></li>
                <li key='api'><a target="_blank" rel="noreferrer" href="http://www.google.com">API</a></li>
                <li key='job'><a target="_blank" rel="noreferrer" href="http://www.google.com">Empleo</a></li>
                <li key='privacy'><a target="_blank" rel="noreferrer" href="http://www.google.com">Privacidad</a></li>
                <li key='terms'><a target="_blank" rel="noreferrer" href="http://www.google.com">Condiciones y Propiedad y autoría</a></li>
                <li key='netzdg'><a target="_blank" rel="noreferrer" href="http://www.google.com">NetzDG/UrhDaG/Clasificación de contenido</a></li>
                <li key='locations'><a target="_blank" rel="noreferrer" href="http://www.google.com">Ubicaciones</a></li>
                <li key='language'><a target="_blank" rel="noreferrer" href="http://www.google.com">Idioma</a></li>
                <li key='verification'><a target="_blank" rel="noreferrer" href="http://www.google.com">Meta Verified</a></li>
            </ul>
            <a rel="noreferrer" target="_blank" href="https://icons8.com/icon/h8kFdtYHEG6i/camera">Camera</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
            <p>© 2023 DANIEL ALEJANDRO TORREALBA ARO</p>
        </div>
    )
}

export default function FooterLateral({ USUARIOS, handleSetUSUARIOS }) {
    return (
        <div className="footerLateral">
            <Header USUARIOS={USUARIOS} />
            <Sugerencias USUARIOS={USUARIOS} handleSetUSUARIOS={handleSetUSUARIOS} />
            <Footer />
        </div>
    )
}