import moment from "moment";
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { Contacts, Phones, ContactsGroups, TypePhones, Groups } from '../database/models';

const Op = Sequelize.Op;

/** Función para crear un contacto **/
const create = async (req, res) => {
    const {name, favorite, user_id, state, phones, groups} = req.body;

    const contactNew = await Contacts.create({
        unique_id: uuid() +'-'+ moment().format('DDMMYYYY') +'-'+ moment().format('HHmmss'),
        name, 
        favorite, 
        user_id, 
        state,
    });

    for (let i = 0; i < phones.length; i++) {
        await Phones.create({
            unique_id:  uuid() +'-'+ moment().format('DDMMYYYY') +'-'+ moment().format('HHmmss'),
            type_id: phones[i].type, 
            value: phones[i].value, 
            contact_id: contactNew.id, 
            state: state,
        });   
    }

    for (let i = 0; i < groups.length; i++) {
        await ContactsGroups.create({
            contact_id: contactNew.id,
            group_id: groups[i],
        });
    }

    return res.status(200).send({
        res: true,
        message: 'Contacto Creado Correctamente'
    });
}

/** Función para consultar todos los contactos de un usuario **/
const findAll = async (req, res) => {
    const {user_id} = req.params;

    const contacts = await Contacts.findAll({
        where: { user_id, state: 1 },
        include: [{
            model: Phones,
            attributes: ['type_id', 'value'],
            where: { state: 1 },
            include: [{
                model: TypePhones,
                attributes: ['title'],
            }]

        }]
    });

    return res.status(200).send({
        res: true,
        message: 'Contactos hallados',
        contacts
    });
}

/** Función para consultar un contacto mediante el unique_id **/
const findOne = async (req, res) => {
    const {uuid} = req.params;

    const contacts = await Contacts.findOne({
        where: { unique_id: uuid, state: 1 },
        include: [{
            model: Phones,
            attributes: ['id', 'unique_id', 'type_id', 'value', 'contact_id', 'state'],
            where: { state: 1 },
            include: [{
                model: TypePhones,
                attributes: ['title'],
            }]

        }]
    });
    

    if(contacts){
        const cg = await ContactsGroups.findAll({
            where: {contact_id: contacts.id},
            attributes: ['contact_id', 'group_id'],
        });
    
        let arrayGroup = [];
        for (let i = 0; i < cg.length; i++) {
            let datas = await Groups.findOne({
                where: {id: cg[i].group_id}
            })
            arrayGroup.push(datas)
        }
    
        contacts.dataValues.groups = arrayGroup;
    }
    
    return res.status(200).send({
        res: true,
        message: 'Contacto Encontrado Correctamente',
        contacts
    });
}

/** Función para actualizar un contacto **/
const update = async (req, res) => {
    const {uuid} = req.params;
    const {name, favorite, user_id, state, phones, groups} = req.body;

    await Contacts.update({
        name, 
        favorite, 
        user_id, 
        state
    },{ 
        where: { unique_id: uuid }
    });

    return res.status(200).send({
        res: true,
        message: 'Contacto Actualizado Correctamente',
        
    });
}

/** Función para inhabilitar un contacto **/
const deletes = async (req, res) => {
    const {uuid} = req.params;

    await Contacts.update({
        state: 2
    },{ 
        where: { unique_id: uuid }
    });

    return res.status(200).send({
        res: true,
        message: 'Contacto Eliminado Correctamente',
        
    });
}




export default {
    create,
    findAll,
    findOne,
    update,
    deletes
}
