'use strict';

const {v4: uuid }  = require('uuid');
const moment = require('moment');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
        unique_id: uuid() +'-'+ moment().format('DDMMYYYY') +'-'+ moment().format('HHmmss'),
        name: 'ADMIN',
        lastName: 'GENERAL',
        email: 'admin@Carvajal.com',
        password: bcrypt.hashSync('Carvajal.2023', 10),
        state: 1
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 1,
      unique_id: uuid(),
      title: 'Móvil',
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 2,
      unique_id: uuid(),
      title: 'Trabajo',
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 3,
      unique_id: uuid(),
      title: 'Casa',
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 4,
      unique_id: uuid(),
      title: 'Principal',
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 5,
      unique_id: uuid(),
      title: 'Sitio Web',
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 6,
      unique_id: uuid(),
      title: 'Direccion',
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 7,
      unique_id: uuid(),
      title: 'Nombre Fonético',
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 8,
      unique_id: uuid(),
      title: 'Alias',
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 9,
      unique_id: uuid(),
      title: 'Cumpleaños',
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 10,
      unique_id: uuid(),
      title: 'Fax Laboral',
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 11,
      unique_id: uuid(),
      title: 'Fax Personal',
    }], {});

    await queryInterface.bulkInsert('typephones', [{
      id: 12,
      unique_id: uuid(),
      title: 'Otro',
    }], {});



 
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
