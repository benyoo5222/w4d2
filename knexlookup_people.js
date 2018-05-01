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

var userinput = process.argv[2];
var length = process.argv.length - 2;

knex
  .select()
  .from('famous_people')
  .where({first_name: userinput})
  .then(rows => {
    let counter = 1;
    console.log(`Found ${length} person(s) by the name of '${userinput}'`);

    for (let arr of rows){
      console.log(`- ${counter}: ${arr.first_name} ${arr.last_name}, born ${arr.birthdate}`);
      counter++;
    }
  })

