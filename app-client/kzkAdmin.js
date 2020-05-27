
var foundation = require('./foundation.js');

//const appId = '4def80d0-a271-4333-863e-ae946f33b5c8';

function kzkAdmin(sessionId, endpoint, debug){
  foundation.call(this, sessionId, endpoint, debug);

  this._factories = {
//    'login'   : models.login.loginFromData,
//    'device'  : models.device.deviceFromData
  };

  this.login = (loginId = null)=>{
    this._domain = 'login';
    this._addToUri('login');
    if(loginId)
      this._uri = this._uri+'/'+loginId;
    return this;
  };

  this.active = ()=>{
    this._domain = 'active';
    this._addToUri('active');
    return this;
  };

  this.company = (companyId = null)=>{
    this._domain = 'company';
    this._addToUri('company');
    if(companyId)
      this._uri = this._uri+'/'+companyId;
    return this;
  };

  this.agent = (agentId = null)=>{
    this._domain = 'agent';
    this._addToUri('agent');
    if(agentId)
      this._uri = this._uri+'/'+agentId;
    return this;
  };

  this.device = (deviceId = null)=>{
    this._domain = 'device';
    this._addToUri('device');
    if(deviceId)
      this._uri = this._uri+'/'+deviceId;
    return this;
  };

  this.config = ()=>{
    this._domain = 'config';
    this._addToUri('config');

    return this;
  };

  this.place = (placeId = null)=>{
    this._domain = 'place';
    this._addToUri('place');
    if(placeId)
      this._uri = this._uri+'/'+placeId;
    return this;
  };

  this.timeRestrictionGroup = (timeRestrictionGroupId = null)=>{
    this._domain = 'timeRestrictionGroup';
    this._addToUri('timeRestrictionGroup');
    if(timeRestrictionGroupId)
      this._uri = this._uri+'/'+ timeRestrictionGroupId;
    return this;
  };

  this.application = (appId = null)=>{
    this._domain = 'application';
    this._addToUri('application');
    if(appId)
      this._uri = this._uri+'/'+appId;
    return this;
  };

  this.credential = (appId = null)=>{
    this._domain = 'credential';
    this._addToUri('credential');
    if(appId)
      this._uri = this._uri+'/'+appId;
    return this;
  }; 

  this.api = (appId = null)=>{
    this._domain = 'api';
    this._addToUri('api');
    if(appId)
      this._uri = this._uri+'/'+appId;
    return this;
  };

  this.permanent = (appId = null)=>{
    this._domain = 'permanent';
    this._addToUri('permanent');
    if(appId)
      this._uri = this._uri+'/'+appId;
    return this;
  };

  this.tags = (tagId = null) => {
    this._domain = 'tags';
    this._addToUri('tags');
    if(tagId)
      this._uri = this._uri+'/'+tagId;
    return this;
  };

  this.paths = (pathId = null) => {
    this._domain = 'paths';
    this._addToUri('paths');
    if(pathId)
      this._uri = this._uri+'/'+pathId;
    return this;
  };


  // Experimental - should not be used
  this.uri = (uri)=>{
    var parts = uri.split();
    if(parts.length % 2 === 0)
      this._domain = parts[parts.length-2];
    else
      this._domain = parts[parts.length-1];
    this._uri = uri;
    return this;
  };

  this.sendEmail = ()=>{
    this._addToUri('sendemail');
    return this._create(null);
    // Final Function - Do not return this but a Promise instead
  };

  this.sendUnlock = ()=>{
    this._addToUri('sendunlock');
    return this._create(null);
    // Final Function - Do not return this but a Promise instead
  };

  this.sendConfig = ()=>{
    this._addToUri('sendconfig');
    return this._create(null);
    // Final Function - Do not return this but a Promise instead
  }; 

  this.pincode = ()=>{
    this._addToUri('pincode');
    return this;
  };

  this.history = () => {
    this._domain = 'history';
    this._addToUri('history');

    return this;
  };

  this.timetrack = (id) => {
    this._domain = 'timetrack';
    this._addToUri('timetrack');
    if(id)
      this._uri = this._uri+'/'+id;
    return this;
  };

  this.swap = (id) => {
    this._addToUri('swapPhy');

    return this._modify({ sourceDevice: id });
  };

  this.graphics = () => {
    this._domain = 'graphics';
    this._addToUri('graphics');
    return this;
  };

  this.installer = ()=>{
    this._addToUri('installer');
    return this;
  }; 

  this.session = ()=>{
    this._addToUri('session');
   
    return this;
  }; 

  this.stats = ()=>{
    this._addToUri('stats');
   
    return this;
  };

   this.bat = ()=>{
    this._addToUri('bat');
   
    return this;
  };

  this.restrictionGroup = (restrictionGroupId = null) => {
    this._domain = 'restrictionGroup';
    this._addToUri('restrictionGroup');
    if(restrictionGroupId)
      this._uri = this._uri+'/'+restrictionGroupId;
    return this;
  };

  this.email = (id) => {
    this._domain = 'email';
    this._addToUri('email');
    if(id)
      this._uri = this._uri+'/'+id;
    return this;
  }; 

  this.reception = (id) => {
    this._domain = 'reception';
    this._addToUri('reception');
    if(id)
      this._uri = this._uri+'/'+id;
    return this;
  };

  this.refreshPermanent = ()=>{
    this._addToUri('refreshPermanent');
    return this._modify(null);
    // Final Function - Do not return this but a Promise instead
  };

  this.devicesByPath = (body)=>{
    this._addToUri('devicesByPath');
    return this._modify(body);
    // Final Function - Do not return this but a Promise instead
  };

  this.devicesByTag = (body)=>{
    this._addToUri('devicesByTag');
    return this._modify(body);
    // Final Function - Do not return this but a Promise instead
  }; 
}

kzkAdmin.prototype = Object.create(foundation.prototype);
kzkAdmin.prototype.constructor = kzkAdmin;

module.exports = kzkAdmin;
