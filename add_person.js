const firstname = process.argv[2];
const lastname = process.argv[3];
const dateofbirth = process.argv[4];

const settings = require("./settings");
const pg = require("pg");

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex('famous_people')
  .insert(
    [
      {first_name: firstname,
      last_name: lastname,
      birthdate: dateofbirth}
    ])
  .then()
