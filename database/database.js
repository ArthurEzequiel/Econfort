const  knex  = require("knex")( { 
  client : 'mysql', 
  connection : { 
  host : 'localhost' , 
  user : 'root' , 
  password : '' , 
  database : '' 
} 
} ) ; 

knex.schema.hasTable('funcionarios').then(function(exists) { 
  if (!exists) { 
    return knex.schema.createTable('funcionarios', function(t) {
      t.increments('id').primary();
      t.string('nomeuser', 100).notNullable();
      t.string('sobrenome', 100).notNullable();
      t.string('email', 100).notNullable();
      t.string('senha', 100).notNullable();
      t.text('token').notNullable();
    });
  }
})

knex.schema.hasTable('administrador').then(function(exists) { 
  if (!exists) { 
    return knex.schema.createTable('administrador', function(t) {
      t.increments('id').primary();
      t.string('nomeuser', 100).notNullable();
      t.string('sobrenome', 100).notNullable();
      t.string('email', 100).notNullable();
      t.string('senha', 100).notNullable();
      t.text('token').notNullable();
    });
  }
})


// Serviço 

knex.schema.hasTable('cliente').then(function(exists) { // verifica se já existe a tabela 
  if (!exists) { // se não existe cria
    return knex.schema.createTable('cliente', function(t) {
     // t.increments('id').primary();
     t.increments('id').primary();
     t.string('nomeclient', 100).notNullable();
     t.string('sobrenomeclient', 100).notNullable();
     t.text('endereco').notNullable();
     t.string('email', 100).notNullable();
     t.string('senha', 100).notNullable();
      t.text('token').notNullable();
    }); 
  }
})

knex.schema.hasTable('fornecedores').then(function(exists) { // verifica se já existe a tabela 
  if (!exists) { // se não existe cria
    return knex.schema.createTable('fornecedores', function(t) {
      //t.increments('id').primary();
      t.string('cnpj').primary().notNullable();
      t.string('nome', 250).notNullable();
      t.text('endereco').notNullable();
      t.string('email', 255);
      t.string('telefone', 255);
      t.string('senhafac', 255);
      t.text('token').notNullable();
      
    });
  }
})



module.exports = knex;