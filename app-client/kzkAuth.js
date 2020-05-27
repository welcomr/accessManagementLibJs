
var request = require('superagent');
const timeout = 3 * 1000;

function kzkAuth(apiKey, endpoint, debug){
  this._endpointAuth = endpoint;
  this._apiKey = apiKey;
  this._debug = debug;

  this._kSession = null;
  
  this.rotateToken = ()=>{
    request
      .put(this._endpointAuth+'/rotateToken')
      .send({ token : this._apiKey })
      .timeout(timeout)
      .end((err,res)=>{
        this._dispatchResult('Rotate token','', err, res);
      });
      return this._final();
  };
  
  this.openSession = ()=>{
    request
      .post(this._endpointAuth+'/session')
      .send({ token : this._apiKey })
      .timeout(timeout)
      .end((err,res)=>{
        // Should validate the content
        if(err){
          console.log(err)
        }
        this._kSession = res.body;
        this._dispatchResult('Open Session', '', err, res);
      });
      return this._final();
  };

  this.id = ()=>{
    return this._kSession.ksid;
  };

  this.kSession = ()=>{
    return this._kSession;
  };

  this._final = ()=>{
    this._uri = '';

    var promise = new Promise((resolve, reject)=>{
      this._resolve = resolve;
      this._reject = reject;
    });

    return promise;
  };

  this._dispatchResult = (verb, type, err, res)=>{
    if(err || !res.ok){
        if(this._debug)
          console.log('Error in '+verb+' '+type+' : ',err.status);
        this._reject(err);
    }
    else {
      if(this._debug)
        console.log(verb+' '+type+' ok : ',res.body);

      var result = res.body;
      this._resolve(result, err);
    }
  }
}

module.exports = kzkAuth;

