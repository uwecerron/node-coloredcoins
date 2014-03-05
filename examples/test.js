var chroma = require('../lib/main')('localhost', 8888, 'user', 'password');

try {
  chroma.alladdresses('nameoftoken',function(crap) {
    console.log(crap);
  });
}
catch(err) {
  console.dir(err);
}
