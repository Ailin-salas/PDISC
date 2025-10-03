function notFound(req, res, next) {
  res.status(404).json({
    message: 'Recurso no encontrado' 
  });
}
export default notFound;