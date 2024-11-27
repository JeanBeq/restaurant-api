/**
 * Middleware générique pour charger une ressource de la base de données
 * et l'ajouter à req. En cas d'erreur (ressource non trouvée), renvoie une 404.
 *
 * @param {Object} model - Modèle de base de données (par exemple, Post)
 * @param {string} param - Nom du paramètre de route contenant l'ID de la ressource
 * @param {string} resourceName - Nom de la propriété dans `req` pour stocker la ressource
 * @returns {Function} Middleware Express
 */
function loadResource(callback) {
  return async (req, res, next) => {
    try {
      const resource = await callback(req);
      if (!resource) {
        return res.status(404).json();
      }
      req["result"] = resource; // Ajoute la ressource dans `req`
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json();
    }
  };
}

module.exports = loadResource;
