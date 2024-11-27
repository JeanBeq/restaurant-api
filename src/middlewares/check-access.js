const Voter = require("../voters/Voter");

/**
 * Middleware générique pour vérifier les permissions d'accès.
 * Un voter est attendu en paramètre, avec la méthode `voteOnAttribute`.
 *
 * @param {Voter} voter - Un objet *Voter* qui doit implémenter la méthode `voteOnAttribute`.
 * @param {string} action - L'action à vérifier (ex: 'view', 'edit', 'delete').
 * @param {Function} getRessource - Fonction pour récupérer la ressource depuis la base de données.
 */
function checkPermission(voter, action) {
  return async (req, res, next) => {
    if (!voter.voteOnAttribute(action, req.result, req.user)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
}

module.exports = checkPermission;
