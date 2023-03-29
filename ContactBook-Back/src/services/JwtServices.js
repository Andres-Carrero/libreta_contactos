import jwt from 'jsonwebtoken';
import moment from 'moment';
import dotenv from 'dotenv';

dotenv.config();

/** Función para generar el token de autenticación **/
const createToken = ({unique_id, name, lastName, email, state}) => {
    try {
        const now = moment();
        const payload = {
            unique_id: unique_id,
            name: name,
            lastName: lastName,
            email: email,
            state: state,
            iat: now.unix(),
            exp: now.add(process.env.EXPIRED_JWT, 'hours').unix()
        }

        return jwt.sign(payload, process.env.SECRET_JWT)
    } catch (error) {
        console.log('Hubo un error generando el token: ', error)
        return null
    }
}

/** Función para decodificar el token de autenticación **/
const decodeToken = (token) => {
    return jwt.decode(token, process.env.SECRET_JWT);
}

export default {
    createToken,
    decodeToken
}