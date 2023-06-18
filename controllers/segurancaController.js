const {autenticaUsuarioDB} = require('../useCases/segurancaUseCase');
require('dotenv-safe').config();

const jwt = require ('jsonwebtoken');

const login = async (request, response) => {
    await autenticaUsuarioDB(request.body)
    /* Quando tiver usuario ele cria o token */
    .then(usuario => {
        const token = jwt.sign({usuario}, process.env.SECRET, {
            expiresIn: 300 //expira em 5 min
        });
        return response.json({auth : true, token : token});
    })

    .catch(err => response.status(401).json({auth : false, message : err}));
}

function verificaJWT(request, response, next){
    const token = request.headers['x-access-token'];

    if (!token) return response.status(401).json({
        auth : false,
        message : 'Nenhum token recebido'
    });

    jwt.verify(token, process.env.SECRET, function(err, decoded){
        if (err) return response.status(500).json({
            auth : false,
            message : 'Erro ao autenticar o token'
        });

        console.log("Usuário: " + JSON.stringify(decoded.usuario));
        // Passando o usuário para ser usado na próxima requisiçao
        request.usuario = decoded.usuario;
        next();
    });
}

module.exports = {login, verificaJWT}