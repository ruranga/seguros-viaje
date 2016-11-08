const debug = require("debug")("restfulmodel:lib:search");

class Search {
    constructor(main)
    {
        this.db = main.db;
        this.libs = main.libs;
    }

    search(params)
    {
        debug('.search constructor called');

        return new Promise((resolve, reject)=>{
            //db.Products.find( {zones: zonaDestino, {min {$gte: dias} }}).limit(10).sort({min:1}) (err, productos)=>{
            debug("params.zonaDestino" + JSON.stringify(params.zonaDestino));
            console.log("dias: ", params.dias);

            this.db.Products.find( {
                                    zones: params.zonaDestino, 
                                    min: {$lte: params.dias},
                                    adult: params.adultos
                                })
            .limit(10)
            .sort({min:1})
            .toArray( (err, productos)=>{
                if(err) {
                    return reject(err);
                }

                return resolve(productos);
            });
        });
    } //end of search
}

module.exports = Search;