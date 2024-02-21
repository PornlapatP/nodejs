const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password:'1234567',
    database:'postgres',
    port:4321,
})
client.connect().then(() => {
    console.log('connect');})
    .catch((err) => {console.log('err');})

module.exports = { client }