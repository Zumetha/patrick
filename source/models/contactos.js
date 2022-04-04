const conexion = require('../models/conexion.js');
var Contactos={}

Contactos.insertar = async function insertar(contacto){
    var sqlConsulta = "INSERT INTO contactos set ?";
	let response =[];

	try {
		response = await conexion.query(sqlConsulta, contacto);
	} catch (error) {
		console.log(error);
		return error;
	}

	return response;
}

Contactos.mostrarTodos = async function mostrarTodos(){
    var sqlConsulta = "SELECT * FROM contactos";
	let response =[];

	try {
		response = await conexion.query(sqlConsulta);
	} catch (error) {
		console.log(error);
		return error;
	}
	return response
}

Contactos.buscarId = async function buscarId(id){
    var sqlConsulta = "SELECT * FROM contactos WHERE IdContactos = ?";
	let response = [];

	try {
		response = await conexion.query(sqlConsulta,[id]);
	} catch (error) {
		console.log(error);
		return error;
	};

	return response;
}

Contactos.borrar = async function borrar(id){
    var sqlConsulta = "DELETE FROM contactos WHERE IdContactos = ?";
	let response = [];

	try {
		response = await conexion.query(sqlConsulta,[id]);
	} catch (error) {
		console.log(error);
		return error;
	}

	return response;
}

Contactos.actualizar = async function actualizar(contacto){
    var sqlConsulta = "UPDATE contactos SET nombre =?, domicilo =?, telefono =? WHERE IdContactos =?";
    let data = [contacto.nombre, contacto.domicilo, contacto.telefono, contacto.IdContactos];
	let response = [];

	try {
		response = await conexion.query(sqlConsulta,data);
	} catch (error) {
		console.log(error);
		return error;
	}

	return response;
}

module.exports = {Contactos}