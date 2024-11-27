const { USER_ROLES } = require("../models/User");

class Voter {
  VIEW = "view";
  EDIT = "edit";
  DELETE = "delete";

  voteOnAttribute(attribute, subject, user) {
    if (!user || !subject) {
      return false;
    }

    if (user.role === USER_ROLES.ADMIN) {
      return true;
    }

    switch (attribute) {
      case this.VIEW:
        return this.canView(user, subject);
      case this.EDIT:
        return this.canEdit(user, subject);
      case this.DELETE:
        return this.canDelete(user, subject);
      default:
        return false;
    }
  }

  canView(user, targetUser) {
    throw "Need Implementation";
  }

  canEdit(user, targetUser) {
    throw "Need Implementation";
  }

  canDelete(user, targetUser) {
    throw "Need Implementation";
  }
}

module.exports = Voter;
