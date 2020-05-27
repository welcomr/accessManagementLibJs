
var foundation = require('./foundation.js');

//const appId = 'ce9da96a-0bdc-4a28-ab68-6362b21c2c86';


function kzkPartner(sessionId, endpoint, debug){
  foundation.call(this, sessionId, endpoint, debug);

  this.context = (contextId = null)=>{
    this._domain = 'context';
    this._addToUri('context');
    if(contextId)
      this._uri = this._uri+'/'+contextId;
    return this;
  };

  this.access = (accessId = null)=>{
    this._domain = 'access';
    this._addToUri('access');
    if(accessId)
      this._uri = this._uri+'/'+accessId;
    return this;
  };
}

kzkPartner.prototype = Object.create(foundation.prototype);
kzkPartner.prototype.constructor = kzkPartner;

module.exports = kzkPartner;
