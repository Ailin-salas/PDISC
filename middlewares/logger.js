function logger(req, res, next) {
 const timestamp = new Date().toISOString(); // imprime la fecha y hora de la petición
 const method = req.method; //obtiene el metodo y la url de la peticion
 const url = req.originalUrl;

console.log(`[${timestamp}] ${method} ${url}`);
 
if (req.body && Object.keys(req.body).length > 0) {
        console.log('Body:', req.body);
}
    next();
}

export default logger;