import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { User, TypePhones, Groups } from '../database/models';
import jwtService from "../services/JwtServices";
import dotenv from 'dotenv';

dotenv.config();

/** Función para iniciar sesión **/
const login = async (req, res) => {
    const {email, password} = req.body;

    const userFound = await User.findOne({
        where: {email: email, state: 1}
    });

    if(!userFound){
        return res.status(400).send({
            res: false,
            message: 'Credenciales Inválidas'
        });
    }

    const canAccess = await bcrypt.compareSync(password, userFound.password);
    if (!canAccess) {
        return res.status(400).send({ 
            res: false,
            message: 'Credenciales Inválidas',
        });
    }

    const token = jwtService.createToken(userFound);
    if (!token) {
        return res.status(400).send({ 
            res: false,
            message: 'Ocurrió un Error al Iniciar Sesión',
        });
    }

    const now = moment();
    delete userFound.dataValues.password;
    userFound.dataValues.token = token;
    userFound.dataValues.init = now.unix();
    userFound.dataValues.expired = now.add(process.env.EXPIRED_JWT, 'hours').unix();

    return res.status(200).send({
        res: true,
        message: 'Inicio Sesión',
        data: userFound
    });

}


/** Función para obtener información complementaria **/
const findData = async (req, res) => {
    const {user_id} = req.params;

    const typesPhones = await TypePhones.findAll();
    const groups = await Groups.findAll({
        where: { user_id, state: 1 }
    });

    return res.status(200).send({
        res: true,
        message: 'Información fue hallada',
        data: {
            typesPhones,
            groups
        }
    });

}


const logout = async (req, res) => {
    return res.status(200).send({
        res: true,
        message: 'Cierre de Sesión',
        //data: userFound
    });
}

export default {
    login,
    logout,
    findData
}