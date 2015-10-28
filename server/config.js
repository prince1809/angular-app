var path = require('path');

module.exports = {

    mongo: {
      dbUrl: 'https://api.mongolab.com/api/1',
      apiKey: '4fb44bb44bb44bbbb44bb44'
      
    },
  security: {
    dbName: 'ascrum',
    usersCollection: 'users'
  },
  server: {
    listenPort: 3000,
    securePort: 8433,
    distFolder: path.resolve(__dirname, '../client/dist'),
    staticUrl: '/static',
    cookieSecret: 'angular-app'
  }

};
