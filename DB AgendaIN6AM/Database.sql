CREATE DATABASE AgendaIN6AM;

USE AgendaIN6AM;

CREATE TABLE Categoria(
	idCategoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(25) NOT NULL
);

CREATE TABLE Contacto(
	idContacto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	apellido VARCHAR(50) NOT NULL,
	telefono VARCHAR(50) NOT NULL,
	correo VARCHAR(50) NOT NULL,
	idCategoria INT NOT NULL,
	FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);

CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nick VARCHAR(50) NOT NULL,
	contrasena VARCHAR(50) NOT NULL
);

CREATE TABLE DetalleUsuario(
	idDetalleUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	idUsuario INT NOT NULL,
	idContacto INT NOT NULL,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
	FOREIGN KEY (idContacto) REFERENCES Contacto(idContacto)
);

CREATE TABLE Historial(
	idHistorial INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	idUsuario INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

/*STORAGE PROCEDURES*/
/*Agregar Categoria*/
CREATE PROCEDURE SP_AgregarCategoria(IN _nombre VARCHAR(25))
	INSERT INTO categoria(nombre) VALUES (_nombre);
	
/*Actualizar Categoria*/
CREATE PROCEDURE SP_ActualizarCategoria(IN _idCategoria INT, IN _nombre VARCHAR(25))
	UPDATE categoria SET nombre=_nombre WHERE idCategoria = _idCategoria;
	
/*Eliminar Categoria*/
CREATE PROCEDURE SP_EliminarCategoria(IN _idCategoria INT)
	DELETE FROM categoria WHERE idCategoria = _idCategoria;

/*Agregar Usuario*/
CREATE PROCEDURE SP_AgregarUsuario(IN _correo VARCHAR(50), IN _contrasena VARCHAR(50))
	INSERT INTO usuario(nick, contrasena) VALUES (_correo, _contrasena);

/*Actualizar Usuario*/
CREATE PROCEDURE SP_ActualizarUsuario(IN _idUsuario INT, IN _correo VARCHAR(50), IN _contrasena VARCHAR(50))
	UPDATE usuario SET nick=_correo, contrasena=_contrasena WHERE idUsuario = _idUsuario;
	
/*Eliminar Categoria*/
CREATE PROCEDURE SP_EliminarUsuario(IN _idUsuario INT)
	DELETE FROM usuario WHERE idUsuario = _idUsuario;
	
/*Agregar Contacto*/
CREATE PROCEDURE SP_AgregarContacto(IN _nombre VARCHAR(50), IN _apellido VARCHAR(50), 
	IN _telefono VARCHAR(50), IN _correo VARCHAR(50), IN _idCategoria INT)
		INSERT INTO contacto(nombre, apellido, telefono, correo, idCategoria) 
			VALUES (_nombre,_apellido,_telefono,_correo,_idCategoria);

/*Actualizar Contacto*/
CREATE PROCEDURE SP_ActualizarContacto(IN _idContacto INT, IN _nombre VARCHAR(50), IN _apellido VARCHAR(50), 
	IN _telefono VARCHAR(50), IN _correo VARCHAR(50), IN _idCategoria INT)
		UPDATE contacto SET nombre=_nombre, apellido=_apellido,telefono=_telefono,
		correo=_correo, idCategoria=_idCategoria WHERE idContacto = _idContacto;
		
/* Eliminar Contacto*/
CREATE PROCEDURE SP_EliminarContacto(IN _idContacto INT)
	DELETE FROM contacto WHERE idContacto = _idContacto;
	
/*Agregar DetalleUsuario*/
CREATE PROCEDURE SP_AgregarDetalleUsuario(IN _idUsuario INT, IN _idContacto INT)
	INSERT INTO detalleusuario(idUsuario, idContacto) VALUES (_idUsuario,_idContacto);
	
/*Eliminar DetalleUsuario*/
CREATE PROCEDURE SP_EliminarDetalleUsuario(IN _idDetalleUsuario INT)
	DELETE FROM detalleusuario WHERE idDetalleUsuario = _idDetalleUsuario;