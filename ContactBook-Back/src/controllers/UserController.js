import moment from "moment";
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import { v4 as uuid } from 'uuid';
import { User } from '../database/models';

const Op = Sequelize.Op;


/** Función para crear un usuario **/
const create = async (req, res) => {
    const {name, email, lastName, password} = req.body;

    const validate = await User.findOne({
        where: {email: email}
    });

    if(validate){
        return res.status(400).send({
            res: false,
            message: 'Ya Existe un Usuario con el Mismo Email'
        });
    }

    await User.create({
        unique_id: uuid() +'-'+ moment().format('DDMMYYYY') +'-'+ moment().format('HHmmss'),
        name,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10),
        state: 1
    });

    return res.status(200).send({
        res: true,
        message: 'Usuario Creado Correctamente'
    });
}

export default {
    create
}
