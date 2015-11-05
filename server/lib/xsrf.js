var crypto = require('crypto');

function uid(len){
  return crypto.randomBytes(Math.ceil(len*3/4))
          .toString('base64')
          .slice(0, len)
          .replace(/\//g,'-')
          .replace(/\+/g, '_')
}

module.exports =function(req, res, next){

  // Generate XSRF token
  var token = req.session._csrf || (req.session._csrf = uid(24));
  //Get the token in the current request
  var requestToken = req.headers['x-xsrf-token'];
  // Add it to the cookie
  res.cookie('XSRF-TOKEN',token);

  //Ignore if it is just a read only request
  switch (req.method) {
    case 'GET':
    case 'HEAD':
    case 'OPTIONS':
      break;
    default:
    //check the token in the current request against the one stored in the session
    if(requestToken !== token){
      return res.send(403);
    }
  }

  // All is ok, continue as you are
  return next();
}
