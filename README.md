# Econfort Store
Econfort Store é um projeto de inovação e finalização do Curso Tecnico em Informatica para internet.
O projeto é um sistema completo para uma loja na industria moveleira. 

O projeto contem: 
- Um site loja virtual; 
- Sistema de Cadastro e Login; 
- Painel de Administrador (Dashboard).

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

