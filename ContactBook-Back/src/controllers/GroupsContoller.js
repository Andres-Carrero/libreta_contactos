import moment from "moment";
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { Groups } from '../database/models';

const Op = Sequelize.Op;

/** Función para crear un Grupo **/
const create = async (req, res) => {
    const {title, description, user_id} = req.body;

    const validate =  await Groups.findOne({
        where: {title, user_id}
    });

    if(validate){
        return res.status(400).send({
            res: false,
            message: 'Ya existe un grupo con ese nombre'
        });
    }

    const group = await Groups.create({
        unique_id: uuid() +'-'+ moment().format('DDMMYYYY') +'-'+ moment().format('HHmmss'),
        title, 
        description, 
        user_id, 
        state: 1,
    });

    return res.status(200).send({
        res: true,
        message: 'Grupo Creado Correctamente'
    });
}

/** Función para consultar todos los grupos de un usuario **/
const findAll = async (req, res) => {
    const {user_id} = req.body;

    const groups = await Groups.findAll({
        where: { user_id }
    });

    return res.status(200).send({
        res: true,
        message: 'Grupo Creado Correctamente',
        groups
    });
}

export default {
    create,
    findAll
}
