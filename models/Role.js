'use strict';

const { Model } = require('objection');

class Role extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'roles';
  }

  static async afterUpdate(args) {
    await super.afterUpdate(args);

    const models = await args.asFindQuery();

    console.log('afterUpdate/row updated', models);
  }
}

module.exports = Role