# Econfort Store
Econfort Store é um projeto de inovação e finalização do Curso Tecnico em Informatica para internet.
O projeto é um sistema completo para uma loja na industria moveleira. 

O projeto contem: 
- Um site loja virtual; 
- Sistema de Cadastro e Login; 
- Painel de Administrador (Dashboard).

Foi usado: 
```JSON
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.0",
    "ejs": "^3.1.8",
    "express": "^4.18.1",
    "express-session": "^1.17.3",
    "knex": "^0.21.1",
    "moment": "^2.29.4",
    "mysql": "^2.18.1",
    "sequelize": "^6.21.3"

  "devDependencies": {
    "nodemon": "^2.0.20"
  }
```

Para rodar o projeto, você deve conter instalado na sua maquina: 
- NodeJS;
- MySQL;
- Workbench (MySQL). 

Primeiramente você deve abrir o terminal e digitar:
```PowerShell
npm install
```
Isso irá instalar todas as dependências listadas no arquivo ``package.json``.

Após isso você deve abrir a pasta ``database``, no arquivo `database.js`, em: 
```Javascript
const  knex  = require("knex")( { 
  client : 'mysql', 
  connection : { 
  host : 'localhost' , 
  user : 'root' , 
  password : '' , 
  database : '' 
} 
} ) ;
```

Você irá colocar todas as informações do ``banco de dados`` onde você irá armazenar os dados como: 
- Clientes;
- Usuarios Administradores;
- Usuarios Comuns;
- Usuarios Fornecedores.

Com as informações preenchidas abra o terminal e digite: 
```
node index2.js
```

Com o app rodando, você agora pode abrir o seu navegador e digitar localhost:8181, para acessar a rota de login!

# Observação! 
Todos os nomes das rotas estão no arquivo ```index2.js```! 
É só colocar na barra de pesquisa no seu navegador, por exemplo: 

- localhost:8181/econfort

Nesse caso você será redirecionado a pagina principal da loja!

