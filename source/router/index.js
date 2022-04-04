const express = require("express");
const router = express.Router();
const dbContactos = require('../models/contactos.js');
const mysql = require("mysql");
//dbContactos.Contactos.insertar({nombre:'jose',domicilo:'av del sol 333',telefono:'689222222'})
//dbContactos.Contactos.mostrarTodos()
//dbContactos.Contactos.buscarId(1);
//dbContactos.Contactos.borrar(1);
//dbContactos.Contactos.actualizar({nombre:'pepe',domicilo:'av olivos paseo alameda II',telefono:'6691620080'})
router.get('/',(req,res)=>{
    res.send("Iniciamos Servidor");
    router.get('/index',(req,res)=>{
        res.render('index.html',{titulo:'Inicio'})
    });
    router.get('/menu',(req,res)=>{
        res.render('menu.html',{titulo:'Menu'})
    });
  /*  router.get('/Contacto',(req,res)=>{
        res.render('Contacto.html',{titulo:'Agenda'})
    });*/
    router.get('/Contacto',(req,res) => {
        res.render('Contacto.html', { titulo : 'Agenda', contactos: [], contacto: null })
    });
    
    router.post('/Contacto', async (req,res) => {
        let contactos = await dbContactos.Contactos.mostrarTodos();
        if (!contactos.length) return res.render('Contacto.html', { titulo : 'Agenda', contactos: [], contacto: null });
    
        res.render('Contacto.html', { titulo : 'Agenda', contactos: contactos, contacto: null })
    });
    
    router.post('/Contacto/nuevo', async (req,res) => {
        const { nombre, domicilo, telefono } = req.body;
    
        await dbContactos.Contactos.insertar({nombre, domicilo, telefono});
    
        res.redirect('/Contacto')
    });
    
    router.get('/Contacto/id', async (req,res) => {
        const { IdContactos } = req.query;
        if (!IdContactos) return res.redirect('/Contacto');
    
        const contacto = await dbContactos.Contactos.buscarId(IdContactos);
    
        res.render('Contacto.html', { titulo: 'Agenda', contactos: [], contacto: contacto[0]});
    });
    
    router.post('/Contacto/id', async (req,res) => {
        const { IdContactos, nombre, domicilo, telefono } = req.body;
        if (!IdContactos) return res.redirect('/Contacto');
    
        await dbContactos.Contactos.actualizar({nombre, domicilo, telefono, IdContactos});
    
        res.redirect('/Contacto');
    })
    
    router.post('/Contacto/id/borrar', async (req,res) => {
    
        const { IdContactos } = req.body;
        
        if (!IdContactos) return res.redirect('/Contacto');
        
        await dbContactos.Contactos.borrar(IdContactos);
    
        res.redirect('/Contacto');
    })
    
    router.get('*',(req,res)=>{
    res.send("No existe la pagina");
})
})
module.exports=router;