'use strict';


const PersonRole = require('./PersonRole')
const { Model } = require('objection');

class Person extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'persons';
  }

  static get relationMappings () {
    const Role = require('./Role')

    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'persons.id',
          through: {
            modelClass: PersonRole,
            from: 'persons_roles.personId',
            to: 'persons_roles.roleId',
          },
          to: 'roles.id',
        },
      }
    }
  }
}

module.exports = Person
