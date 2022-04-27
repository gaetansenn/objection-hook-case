'use strict';

const Knex = require('knex');
const knexConfig = require('./knexfile');

const { Model } = require('objection');
const Person = require('./models/Person');

// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to the knex instance. You only
// need to do this once before you use any of
// your model classes.
Model.knex(knex);

async function main() {
   // Create person
   const person = await Person.query().insert({
    firstName: 'Jennifer',
    lastName: 'Aniston',
  });

  const roles = [{
    type: 'role1'
  }, {
    type: 'role2'
  }, {
    type: 'role3'
  }, {
    type: 'role4'
  }]

  // Add role to person
  const upserted = await Person.query().upsertGraph({
    id: person.id,
    roles
  })

  console.log('upserted person with role', upserted)

  upserted.roles[2].type = 'role upserted'
  const upsertedUpdated = await Person.query().upsertGraph(upserted)

  console.log('upserted with role updated', upsertedUpdated)
}

main()
  .then(() => knex.destroy())
  .catch((err) => {
    console.error(err);
    return knex.destroy();
  });
