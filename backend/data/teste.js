var Firebird = require('node-firebird')

function bufferForString(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
 }

configs = {
    host: '127.0.0.1',
    port: 3050,
    database: '/home/dho/Documentos/web/data/teste.fdb',
    user: 'sysdba',
    password: 'Atk__2019',
    lowercase_keys: false,
    role: null,            
    pageSize: 4096,
}

x= []
Firebird.attach(configs, function(err, db) {
 
    if (err)
        throw err
    
    const perfis = [
        [1,'admin','Administrador', new Date(), new Date()],
        [2, 'cadastrador','Cadastrador', new Date(), new Date()],
        [3,'comum', 'Comum', new Date(), new Date()] 
    ]

    const usuarios = [
        [1,'Admin', 'admin@teste.com','123', 1, new Date(), new Date()],
        [2,'João', 'João@teste.com','123', 1, new Date(), new Date()],
        [3,'Carlos', 'Carlos@teste.com','123', 1, new Date(), new Date()]
    ]


    // for (let i in perfis) {
    //     db.query('INSERT INTO perfis (ID, NOME, ROTULO, CREATED_AT, UPDATED_AT) VALUES (?, ?, ?, ?, ?) RETURNING ID',
    //         perfis[i], function(err, result) {
    //             if (err)
    //                 throw err;
    //             console.log('Adicionado com sucesso: ' + result)
    //     });
    // }

    // for (let i in usuarios) {
    //     db.query('INSERT INTO USUARIOS (ID, NOME, EMAIL, SENHA, ATIVO, CREATED_AT, UPDATED_AT) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING ID',
    //         usuarios[i], function(err, result) {
    //                 if (err)
    //                     throw err;
    //                 console.log('Adicionado com sucesso: ' + result)
    //             });
    // }
    db.query('SELECT * FROM usuarios', [], function(err, result) {
        if (err)
            throw err
        x = result
        console.log('Dentro da callback: ')
        console.log(x[0])
        console.log('----------------------------------------------------------------------------')
        db.detach()
    })

})

console.log('Fora da Callback: ')
console.log(x[0])
console.log('----------------------------------------------------------------------------')

function imprimirDpsde5Segundos() {
    console.log('Depois de aguardar 5 sengundos fora da callback: ')
    console.log(x[0])
    console.log('----------------------------------------------------------------------------')
}
  
setTimeout(imprimirDpsde5Segundos, 5000);