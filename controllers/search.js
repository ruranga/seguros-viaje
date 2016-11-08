/* eslint-disable semi */
"use strict";
const debug = require('debug')("restful:controllers:search");


function search(main) {
	debug("init...");

	let email;
	let zonaDestino
	let fechaDesde;
	let fechaHasta;
	let adultos;
    let dias;

	return {
		'search': (req, res, next)=> {
			debug(".search called");


			email = req.swagger.params.email ? req.swagger.params.email.value : null;
			zonaDestino = req.swagger.params.zonaDestino ? req.swagger.params.zonaDestino.value : null;
			fechaDesde = req.swagger.params.fechaDesde ? req.swagger.params.fechaDesde.value : null;
			fechaHasta = req.swagger.params.fechaHasta ? req.swagger.params.fechaHasta.value : null;
			adultos = req.swagger.params.adultos ? req.swagger.params.adultos.value : null;
	        dias = main.libs.moment(fechaHasta).diff(main.libs.moment(fechaDesde), 'days')+1;

			let getCost = (i) => {
				//return i.cost + ((dias - i.min) > 0) ? (dias - i.min ) * i.aditional : 0;
				return ( i.cost + (dias - i.min ) * i.aditional ) * adultos;
			}

			main.libs.search.search({
								email: email, 
								zonaDestino: zonaDestino, 
								fechaDesde: fechaDesde, 
								fechaHasta: fechaHasta, 
								dias: dias,
								adultos: adultos
							})
            .then((cotizaciones)=>{
                    //console.log(cotizaciones);

                    cotizaciones.map( i => {						
                    	i.fullCost = getCost(i);

						console.log("i: ", i);
                    	return i;
                    });
                    res.json(cotizaciones);
			})
        	.catch(next);
		}
	};
}

module.exports = search;