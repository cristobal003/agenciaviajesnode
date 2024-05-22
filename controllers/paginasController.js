import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde
    //Consultar 3 viajes del modelo viaje


    //Para no hacer 2 async await
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit : 3}));
    promiseDB.push(Testimonial.findAll({limit : 4}));

    try {
        const resultado = await Promise.all( promiseDB );
        res.render('inicio',{
            pagina: 'Inicio',
            clase: 'home',
            viajes : resultado[0],
            testimoniales : resultado[1]
        });
    } catch (error) {
        console.log(error)
    }

};

const paginaNosotros =  (req, res) => { // req - lo que enviamos : res - lo que express nos responde
    res.render('nosotros',{
        pagina : 'Nosotros'
    });
};

const paginaViajes = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde
    //Consultar base de datos
    const viajes = await Viaje.findAll();
    console.log(viajes);
    res.render('viajes',{
        pagina : 'Próximos Viajes',
        viajes : viajes
    });
};

const paginaTestimoniales = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde
    try {
        //Devolver los datos de los testimoniales
        const testimoniales = await Testimonial.findAll();
        //Pasar los datos a la vista
        res.render('testimoniales',{
            pagina : 'Testimoniales',
            testimoniales
        });

    } catch (error) {
        console.log(error)
    }
};

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;
    try {
        const viaje = await Viaje.findOne({ where : { slug: slug }});
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje : viaje
        })
    } catch (error) {
        console .log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}