
var request = require('superagent');
const timeout = 3 * 1000;

function kzkSession(sessionId, endpoint, debug){
  this._endpointAuth = endpoint;
  this._sessionId = sessionId;
  this._debug = debug;

  this._kSession = null;

  this.get = (to = null) => {
    var reqTimeout = to ? to : timeout;
    request
      .get(this._endpointAuth+'/session/'+this._sessionId)
      .timeout(reqTimeout)
      .end((err,res)=>{
        this._dispatchResult('Get Session','', err, res);
      });
      return this._final();
  };

  this.status = (to = null) => {
    var reqTimeout = to ? to : timeout;
    request
      .get(this._endpointAuth+'/session/'+this._sessionId+'/status')
      .timeout(reqTimeout)
      .end((err,res)=>{
        this._dispatchResult('Get Session Status','', err, res);
      });
      return this._final();
  };

  this.close = (to = null)=>{
    var reqTimeout = to ? to : timeout;
    request
      .delete(this._endpointAuth+'/session/'+this._sessionId)
      .timeout(reqTimeout)
      .end((err,res)=>{
        this._dispatchResult('End Session','', err, res);
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
    
      return this._reject(err);
    }
    else {
      if(this._debug)
        console.log(verb+' '+type+' ok : ',res.body);

      var result = res.body;
      return this._resolve(result, err);
    }
  }
}

module.exports  =  kzkSession;

