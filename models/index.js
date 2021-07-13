const UserModel = require('./user');
const CredentialModel = require('./credential');

UserModel.hasMany(CredentialModel);

CredentialModel.belongsTo(UserModel);

module.exports = { UserModel, CredentialModel }