// Não se esqueça de instalar o enhanced-resolve e o express. Eles já estão no package.json, mas sempre é bom verificar. 
// `npm install express path --save`
// `npm install enhanced-resolve@3.3.0 --save-dev`

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + `/dist/telecine-app`));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+`/dist/telecine-app/index.html`));
});

// Iniciar aplicação usando a porta padrão do HEROKU
app.listen(process.env.PORT || 8080);