'use strict';

const { Model } = require('objection');

class PersonRole extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'persons_roles';
  }
}

module.exports = PersonRole;
