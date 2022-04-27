'use strict';

exports.up = (knex) => {
  return knex.schema.createTable('persons', (table) => {
    table.increments('id').primary();

    table.string('firstName');
    table.string('lastName');
  }).createTable('roles', (table) => {
    table.increments('id').primary();

    table.string('type');
  }).createTable('persons_roles', (table) => {
    table.increments('id').primary();

    table
        .integer('personId')
        .unsigned()
        .references('id')
        .inTable('persons')
        .onDelete('CASCADE')
        .index()

      table
        .integer('roleId')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .index()
  })
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('persons').dropTableIfExists('roles').dropTableIfExists('persons_roles');
};
