const { rootCertificates } = require("tls");

let html = "<html><body><h1>Olá Mundo</h1></body></html>"

module.exports = (app) => {
    app.get('/', (req,resp)=> resp.send(html) )
}

