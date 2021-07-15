# Server ![KYROS](logo.png)
---
### What is it?
This is the respoistory for the server-side of KYROS. A social app geared towards physicians that focuses on warehousing all of their credentials in a single profile while connecting them with other practicioners and relevant publications.

### How does it work?
It is a server with 3 tables for user information, credentials, associations & publications. The production application is deployed and housed with Heroku.

Check it out here => [Kyros App](https://jpc-kyros-client.herokuapp.com/home)

### Technologies Incorporated
The backbone of the app is postgreSQL and express to translate JavaScript into language the server can read and interact with. It also utilizes the following dependencies: 
- "bcryptjs": "^2.4.3"
- "dotenv": "^10.0.0"
- "express": "^4.17.1"
- "jsonwebtoken": "^8.5.1"
- "pg": "^8.6.0"
- "pg-hstore": "^2.3.4"
- "sequelize": "^6.6.4"

### Database Associations 
The server uses several DB associations to aggregate user and app information:

*UserModel.hasOne(CredentialModel); UserModel.hasMany(AssociationModel);*

*CredentialModel.belongsTo(UserModel); AssociationModel.hasMany(CredentialModel)*

*AssociationModel.belongsTo(UserModel);*

### Security 
The app utilizes jsonwebtoken and bcrypt to encrypt, transfer, and store  data. All passwords and sensitive user information are salted and hashed as to be hidden from the server. 