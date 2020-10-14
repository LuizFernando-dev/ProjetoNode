const bd = require("../../config/database")

class LivroDao{

    constructor(bd){
        this._bd = bd
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._bd.run(`
                INSERT INTO LIVROS (
                        titulo,
                        preco,
                        descricao
                    ) values (?, ?, ?)
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o livro!');
                    }
    
                    resolve();
                } 
            )       
        });
    } 

    lista(){
        return new Promise((resolve,reject) => {
            this._bd.all('SELECT *FROM livros',(erro,resultados) => {
                if(erro) return reject("nao foi possivel listar os livros")
                return resolve(resultados) 
            })
            
        })
    }

    buscaPorId(id)
    {
        return new Promise((resolve, reject) =>
        {   
            this._bd.get('SELECT *FROM livros WHERE  id =?', 
            [id], 
            (erro, livro) =>
               {
                    if(erro)
                    {
                        return reject(console.log(erro));
                    }
                        console.log('agora vou imprimir o livro : ',livro)
                     return resolve(livro);
                } 
            );
        });
    }

}

module.exports = LivroDao