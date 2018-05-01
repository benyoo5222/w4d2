const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

console.log('Searching...');

client.connect( (err) => {
  if (err){
    return console.log("Error");
  }

  const query =
    `SELECT first_name, last_name, birthdate
      FROM famous_people
      WHERE first_name = $1
      `


  client.query(query,[process.argv[2]],

    (err, result) => {
      let counter = 1;
      console.log(`Found ${result.rowCount} person(s) by the name of '${process.argv[2]}'`);

      for (let arr of result.rows){

        console.log(`- ${counter}: ${arr.first_name} ${arr.last_name}, born ${arr.birthdate}`);
        counter++;
      }

    });

});