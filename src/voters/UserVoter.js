// UserVoter.js

const { USER_ROLES } = require("../models/User");
const Voter = require("./Voter");

class UserVoter extends Voter {
  canView(user, targetUser) {
    return this.#check(user, targetUser);
  }

  canEdit(user, targetUser) {
    return this.#check(user, targetUser);
  }

  canDelete(user, targetUser) {
    return this.#check(user, targetUser);
  }

  #check(user, targetUser) {
    return user.id.toString() === targetUser.id.toString();
  }
}

module.exports = new UserVoter();
