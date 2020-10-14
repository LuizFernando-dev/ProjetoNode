const LivroDao = require('../infra/livro-dao')
const bd = require('../../config/database')
const { rootCertificates } = require("tls");

let html = "<html><body><h1>Olá Mundo</h1></body></html>"

module.exports = (app) => {
    app.get('/', (req,resp)=> resp.send(html) )
    app.get('/livros', function(req,resp){
        livroDao = new LivroDao(bd);
        livroDao.lista()
        .then(livros => resp.marko(require('../views/lista/lista.marko'),
        {
            livros: livros
        }
        ))
        .catch(erro => console.log(erro))
    }) 

    app.get('/form', (req, resp)=>{
        resp.marko(require('../views/lista/form.marko'),{livro:{}})
    })

    app.post('/livros', (req,resp)=>{
        console.log(req.body)
        banco = new LivroDao(bd)
        banco.adiciona(req.body).then(
            resp.redirect('/livros')
        )
        .catch(erro => console.log(erro))
    })

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;
    
        const livroDao = new LivroDao(bd);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    
    });

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        console.log(id)
        const livroDao = new LivroDao(bd);
    
        livroDao.buscaPorId(id)
            .then(livro => 
                resp.marko(
                    require('../views/lista/form.marko'),{livro:livro}
                )

               
            )
            .catch(erro => console.log(erro));
    
    });
}

