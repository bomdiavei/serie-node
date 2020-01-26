//Controller de autenticacao

const express = require('express'); // pois iremos trabalhar com rotas

// model. usaremos para login e cadastro de usuário
const User = require('../models/user');

//para definir as rotas do usuário
const router = express.Router();

//router de cadastro
router.post('/register', async (req, res) => {
        const { email } = req.body;
    try {
        //para que tenhamos uma mensagem para a falha de insercao por email ja existir
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' });
        }
        //cria um novo usuário quando essa rota é chamada. 
        //User é o objeto do mongoose do diretório '../models/user', ali de cima
        //ta pegando todos os parametros que o usuário ta enviando e passando pro
        //"create". todos parametros estão dentro de "req.body"
        //"await": esperar a ação ser executada para continuar
        const user = await User.create(req.body);

        //para não retornar a senha, mesmo que criptografada
        user.password = undefined;

        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: "Registration failed" });
    }
});

//recuperando app (aplicação) do index.js e retornando router para o app, com o prefixo 'auth'.
//quando usuário acessar '/auth', ele chama esse 'router'.
//todas as rotas que forem definidas usando a variavel router, serão prefixadas com
//o "/auth". exemplo '/auth/register'.
module.exports = app => app.use('/auth', router);
