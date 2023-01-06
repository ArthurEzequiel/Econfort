const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const knex = require("./database/database");

const bcrypt = require('bcryptjs');
const session = require("express-session");


app.set('view engine','ejs',);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: "backend", cookie:{maxAge:36000000}
}))

app.listen(8182,()=>{console.log("App rodando!");})


app.get("/", (req, res) => { //quando o servidor for requisitado arquivo login é chamado
    res.render("loginuser",{})
}) 

app.listen(8181,()=>{console.log("App rodando!");})



app.get("/Econfort",async(req, res) => {
  
    res.render("index",{modo:0
      })

})

app.get("/pedidos",async(req, res) => {
  
  res.render("pedidosfeitos",{modo:0
    })

})


app.get("/about",async(req, res) => {
  
  res.render("about",{modo:0
    })

})

app.get("/blogdetails",async(req, res) => {
  
  res.render("blog-details",{modo:0
    })

})

app.get("/blog",async(req, res) => {
  
  res.render("blog",{modo:0
    })

})

app.get("/checkout",async(req, res) => {
  
  res.render("checkout",{modo:0
    })

})

app.get("/contact",async(req, res) => {
  
  res.render("contact",{modo:0
    })

})

app.get("/main",async(req, res) => {
  
  res.render("main",{
    })

})

app.get("/shop-details",async(req, res) => {
  
  res.render("shop-details",{modo:0
    })

})

app.get("/shop",async(req, res) => {
  
  res.render("shop",{modo:0
    })

})

app.get("/shopping-cart",async(req, res) => {
  
  res.render("shopping-cart",{modo:0
    })

})


app.post("/registrarclient",async(req, res) => {

  let nomeclient = req.body.nomeclient;
  let sobrenomeclient = req.body.sobrenomeclient;
  let usuarioclient = req.body.usuarioclient;
  let endereco = req.body.endereco;
 // let cpfclient = req.body.cpfclient;
  let senhaclient = req.body.senhaclient;
  let senhaclient2 = req.body.senhaclient2;

  console.log(nomeclient,sobrenomeclient,endereco,usuarioclient,senhaclient,senhaclient2)
  if(senhaclient==senhaclient2){

      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(senhaclient,salt)
      let token = bcrypt.hashSync(usuarioclient,salt)
      try {
          let userclient = await knex("cliente").where("email",usuarioclient)
          
          if(userclient[0]!=undefined){
              res.render("register",{cadastrar:0}) 
          }else {
              let novo =  [{
                nomeclient:nomeclient,
                endereco:endereco,
                sobrenomeclient:sobrenomeclient,  
                email:usuarioclient,
                senha:hash,
                         token:token
                          }]
     
          await knex.insert(novo).into('cliente')
          res.render("register",{cadastrar:0
          })
          }
          
         } catch (error) {
          console.log("Erro de banco de dados")
          //res.redirect("createuser")
         }
       
  }else {
    console.log("Erro de formulario!")
      //res.redirect("createuser")
        }

})

    app.get("/register",async(req, res) => {
  
      res.render("register",{cadastrar:1,cadastrar:0})
    
    })



app.get("/dashboard",async(req, res) => {
  
  let usuario = req.session.dados.usuario
  console.log(usuario);
  res.render("dashboard",{user:"dashboard",modo:0, usuario:usuario ,exibir:0})

})

app.get("/dashboardforfun",async(req, res) => {
  
  let usuario = req.session.dados.usuario
  console.log(usuario);
  res.render("dashboard",{user:"dashboard",modo:1, usuario:usuario,exibirfunc:0})
  
})

// Cadastrar funcionário
app.get("/createuser",async(req, res) => {
  let usuario = req.session.dados.usuario
  console.log(usuario)
  res.render("dashboard",{modo:0,user:"createuser", usuario:usuario ,exibir:1})

})

app.post("/cadastrofunc",async (req, res) => {
  let nomeuser = req.body.nomeuser;
  let sobrenome = req.body.sobrenome;
  let usuario = req.body.usuario;
  let senha = req.body.senha;
  let senha2 = req.body.senha2;
  
  if(((nomeuser)&&(sobrenome)&&(usuario)&&(senha)&&(senha2))&&(senha==senha2)){

      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(senha,salt)
      let token = bcrypt.hashSync(usuario,salt)
      try {
          let user= await knex("funcionarios").where("email",usuario)
          
          if(user[0]!=undefined){
              res.redirect("createuser") 
          }else {
              let novo = [{
                  nomeuser:nomeuser,
                  sobrenome:sobrenome,  
                         email:usuario,
                         senha:hash,
                         token:token
                          }]
     
          await knex.insert(novo).into('funcionarios')
          res.redirect("createuser")
          }
          
         } catch (error) {
          console.log("!")
          //res.redirect("createuser")
         }
       
  }else {
    console.log("Erro banco de dados!")
      //res.redirect("createuser")
        }
})

app.get("/factorycreate",async(req, res) => {
  
  let usuario = req.session.dados.usuario
  console.log(usuario)
  res.render("dashboard",{user:"factorycreate",modo:0, usuario:usuario ,exibir:4})

})

app.post("/criarfornecedores",async (req, res) => {
  let cnpj = req.body.cnpj;
  let nome = req.body.nome;
  let email = req.body.email;
  let endereco = req.body.endereco;
  let telefone = req.body.telefone;
  let senhafac = req.body.senhafac;
  
  if(((cnpj)&&(nome)&&(email)&&(endereco)&&(telefone)&&(senhafac))){

      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(senhafac,salt)
      let token = bcrypt.hashSync(email,salt)
      try {
          let user = await knex("fornecedores").where("email",email)
          
          if(user[0]!=undefined){
              res.redirect("factorycreate") 
          }else {
              let novo = [{
                cnpj:cnpj,
                nome:nome,  
                         email:email,
                         endereco:endereco,
                         telefone:telefone,
                         senhafac:hash,
                         token:token
                          }]
     
          await knex.insert(novo).into('fornecedores')
          res.redirect("/factorycreate")
          }
          
         } catch (error) {
          console.log("!")
          //res.redirect("createuser")
         }
       
  }else {
    console.log("Erro banco de dados!")
      //res.redirect("createuser")
        }
})


// Cadastrar funcionário

app.get("/charts",async(req, res) => {
  
  let usuario = req.session.dados.usuario
  console.log(usuario)
  res.render("dashboard",{user:"charts",modo:0, usuario:usuario ,exibir:2})

})

app.get("/registercliente",async(req, res) => {
  res.render("register",{user:"register",modo:0,exibir:2,cadastrar:1})

})


app.get("/chartsforfunc",async(req, res) => {
  
  let usuario = req.session.dados.usuario
  console.log(usuario)
  res.render("dashboard",{user:"charts",modo:1, usuario:usuario ,exibirfunc:3})

})




app.get("/tables",async(req, res) => {

  let usuario = req.session.dados.usuario

  let cliente = await knex("cliente")
  let fornecedores = await knex("fornecedores")
  console.log(cliente)
  res.render("dashboard",{cliente:cliente[0],fornecedores:fornecedores[0], user:"tables",modo:0, usuario:usuario ,exibir:3})
})


app.get("/fornecedores",async(req, res) => {

  let usuario = req.session.dados.usuario

  let fornecedores = await knex("fornecedores")
  console.log(fornecedores)
  res.render("dashboard",{fornecedores:fornecedores[0], user:"fornecedores",modo:0, usuario:usuario ,exibir:5})
})


app.get("/pedidos",async(req, res) => {
  
  let usuario = req.session.dados.usuario
  let cliente = await knex("cliente")
  console.log(cliente)
  res.render("dashboard",{cliente:cliente[0],user:"tables",modo:1, usuario:usuario,exibirfunc:5})
})

app.get("/tablesforfunc",async(req, res) => {
  
  let usuario = req.session.dados.usuario
  let cliente = await knex("cliente")
  console.log(cliente)
  res.render("dashboard",{cliente:cliente[0],user:"tables",modo:1, usuario:usuario,exibirfunc:4})

})


app.get("/chat",async(req, res) => {
  
  let usuario = req.session.dados.usuario
  console.log(usuario)  
  res.render("dashboard",{user:"card",modo:1, usuario:usuario,exibirfunc:5})

})



app.post("/loginuseradmin",async(req, res) => {
     
  let usuario = req.body.usuario; 
  let senha = req.body.senha;
  
  
 if((usuario)&&(senha)){
  try {
      let user= await knex("administrador").where("email",usuario)
      if(user[0]!=undefined){

          if(user[0].email==usuario&&user[0].senha==senha){
              let salt = bcrypt.genSaltSync(10)
              let token = bcrypt.hashSync(usuario,salt)

              req.session.dados = {usuario:user[0].nomeuser,
                token:token}
                                
              await knex("administrador").where("email",usuario).update({
                   token:token
              })      
               
              let usuario1 = user[0].nomeuser 
              console.log(user)
              const primeironome = usuario1.split('user')[0]                                 
              res.render("dashboard",{primeironome,modo:0,user:user[0],usuario:usuario1,exibir:0,modo:0})
          }else {
                res.render("loginuseradmin",{cadastrar:1})
          } 
       
       }else res.render("loginuseradmin",{ 
         cadastrar:1 
       })
      
     } catch (error) {
      res.render("loginuseradmin",{cadastrar:1})
     }

}else {res.render("loginuseradmin",{
      cadastrar:1
     })}  
})

app.get("/loginuseradmin",async(req, res) => {  
    
    res.render("loginuseradmin",{
      cadastrar:1
     })
 
})

app.get("/fabrica",async(req, res) => {  
    
  res.render("loginfactory")

})

app.post("/login",async(req, res) => {
  let usuario = req.body.usuario; 
  let senha = req.body.senha;


 if((usuario)&&(senha)){
  try {
      let user= await knex("funcionarios").where("email",usuario)
      if(user[0]!=""){
          let teste = bcrypt.compareSync(senha,user[0].senha);
          if(user[0].email==usuario&&teste==true){
              let salt = bcrypt.genSaltSync(10)
              let token = bcrypt.hashSync(usuario,salt)
           
              req.session.dados = {usuario:user[0].nomeuser ,
                                    token:token}
                  
              await knex("funcionarios").where("email",usuario).update({
                   token:token
              })               
              
             let modo=0 
                    let usuario1 = user[0].nomeuser 
                    console.log(user)

                    const primeironome = usuario1.split("")[1]                                 
                    res.render("dashboard",{primeironome,modo:modo,user:user[0],usuario:usuario1,exibirfunc:0,modo:1})
          }else {
                res.render("loginuser",{ 
                  cadastrar:0
                  })
          } 
       
       }else console.log("Deu ruim1")
      
     } catch (error) {
      console.log("Deu ruim")
     }
}else  console.log("Deu ruim2")
})



app.post("/loginclient",async(req, res) => {
  let usuario = req.body.usuario; 
  let senha = req.body.senha;

 if((usuario)&&(senha)){
  try {
      let user= await knex("cliente").where("email",usuario)
      if(user[0]!=""){
          let teste = bcrypt.compareSync(senha,user[0].senha);
          if(user[0].email==usuario&&teste==true){
              let salt = bcrypt.genSaltSync(10)
              let token = bcrypt.hashSync(usuario,salt)
           
              req.session.dados = {usuario:user[0].email ,
                                    token:token}
                  
              await knex("cliente").where("email",usuario).update({
                   token:token
              })               
              
             let modo=3 
                    let usuario1 = user[0].nomeclient 
                    console.log(user)

                   // const primeironome = usuario1.split("")[1]                                 
                    res.render("index",{modo:modo,user:user[0],usuario1:usuario1})
          }else {
                res.render("register",{ 
                  cadastrar:0
                  })
          } 
       
       }else console.log("Deu ruim1")
      
     } catch (error) {
      console.log("Deu ruim")
     }
}else  console.log("Deu ruim2")
})



app.post("/loginfornecedor",async(req, res) => {
  let usuario = req.body.usuario; 
  let senha = req.body.senha;


 if((usuario)&&(senha)){
  try {
      let user= await knex("fornecedores").where("email",usuario)
      if(user[0]!=""){
          let teste = bcrypt.compareSync(senha,user[0].senha);
          if(user[0].email==usuario&&teste==true){
              let salt = bcrypt.genSaltSync(10)
              let token = bcrypt.hashSync(usuario,salt)
           
              req.session.dados = {usuario:user[0].nomeuser ,
                                    token:token}
                  
              await knex("fornecedores").where("email",usuario).update({
                   token:token
              })               
              

             let modo=2 
                    let usuario1 = user[0].nomeuser 
                    console.log(user)

                    const primeironome = usuario1.split("")[1]                                 
                    res.render("dashboard",{primeironome,modo:modo,user:user[0],usuario:usuario1,exibirfac:0,modo:2})
          }else {
                res.render("loginuser",{ 
                  cadastrar:0
                  })
          } 
       
       }else console.log("Deu ruim1")
      
     } catch (error) {
      console.log("Deu ruim")
     }
}else  console.log("Deu ruim2")
})


app.get("/logoff", async(req, res) => { 

try {
  let usuario=req.session.dados.usuario
  await knex("administrador").where("email",usuario).update({token:"off"})
  req.session.dados = {usuario:null,token:null}
  res.redirect("/")    
} catch (error) {
  req.session.dados = {usuario:0,token:0}
  res.redirect("/")
}

})

app.get("/logofffunc", async(req, res) => { 

  try {
    let usuario=req.session.dados.usuario
    await knex("funcionario").where("email",usuario).update({token:"off"})
    req.session.dados = {usuario:null,token:null}
    res.redirect("/")    
  } catch (error) {
    req.session.dados = {usuario:null,token:null}
    res.redirect("/")
  }
  
  })

app.post("/cadastrocliente",async(req, res) => { //alterar para post
   
  let nome = req.body.nomeuser
  let cpf = req.body.cpf
   let endereco = req.body.endereco
   let usuario = req.session.dados.usuario

   if((nome)&&(cpf)&&(endereco)){
      
       
       try {
           let user= await knex("usuario").where("id",id) //select com filtro
          // console.log(user)
           if(user[0]!=undefined){
              res.render("createuser",{modo:0,user:"errocpf" ,exibir:0, usuario:usuario})  
             
           }else {
               let novo = [{
                           nome:nome,
                           sobrenome:sobrenome,
                           id:id
                           }]
      
           await knex.insert(novo).into('usuario')
          res.render("createuser",{modo:0,user:"criado" ,exibir:0, usuario:usuario})
          
           }
           
          } catch (error) {
           res.render("createuser",{modo:0,user:"erro" ,exibir:0, usuario:usuario})

          }
   }else {
         res.render("createuser",{modo:0,user:"erro" ,exibir:0, usuario:usuario})
         
         }
})
 