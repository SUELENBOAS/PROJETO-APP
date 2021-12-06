var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',      
        user : 'root',      
        password : '',  
        database : 'drlembrete'    
     }
});
module.exports = knex