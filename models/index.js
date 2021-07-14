const UserModel = require('./user');
const CredentialModel = require('./credential');

UserModel.hasOne(CredentialModel);

CredentialModel.belongsTo(UserModel);

module.exports = { UserModel, CredentialModel }