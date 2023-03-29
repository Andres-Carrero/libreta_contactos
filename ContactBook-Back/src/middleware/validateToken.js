import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import moment from 'moment';
dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader === '') {
      console.log ('1');
      return res
        .status (400)
        .send ({message: 'No cuenta con la cabecera de autenticación.'});
    }

    const isBearer = authHeader.split (' ')[0];
    if (isBearer !== 'Bearer') {
      console.log ('2');
      return res
        .status (400)
        .send ({message: 'La cabecera de autenticación no es válida.'});
    }

    const authToken = authHeader.split (' ')[1];
    if (!authToken || authToken === '') {
      console.log ('3');
      return res
        .status (400)
        .send ({message: 'La cabecera de autenticación no es válida.'});
    }
    console.log (authHeader);
    const payload = jwt.verify (authToken, process.env.SECRET_JWT);
    console.log (payload);
    if (!payload) {
      console.log ('4');
      return res
        .status (400)
        .send ({message: 'No tiene permiso para realizar esta operación.'});
    }

    const now = moment ();
    if (payload.exp < now.unix ()) {
      console.log ('5');
      return res.status (400).send ({message: 'El token ha expirado.'});
    }


    next ();
  } catch (error) {
    console.log ('Hubo un error verificando el token: ', error);
    return res.status (400).send ({
      message: 'Hubo un error verificando el token o ha expirado. Inicie sesión nuevamente e intente de nuevo.',
    });
  }
};

export default {verifyToken};
