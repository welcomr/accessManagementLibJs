
var request = require('superagent');
const timeout = 20 * 1000;
const AUTH_HEADER = 'ksid';

function foundation(sessionId, endpoint, debug){
  this._loadingCount = 0;
  this._sessionId = sessionId;
  this._apiUrl = endpoint;
  this._debug = debug;

  this._domain = '';
  this._uri = '';

  this._jobQueue = [];

  this._enqueue = (action)=>{
    this._jobQueue.push(action);

    if(this._jobQueue.length === 1){
      this._jobQueue[0]();
    }
  };

  this._runNext = _=>{
    this._jobQueue.shift();

    if(this._jobQueue.length > 0){
      this._jobQueue[0]();
    }
  };

  this._create = (obj)=>{
    var type = this._domain;
    var uri = this._uri;
    var verb = 'create';

    var content = {};
    if(obj) content = obj;

    var resolve = null;
    var reject = null;
    var promise = new Promise((res, rej)=>{
      resolve = res;
      reject = rej;
    });

    this._enqueue(_ =>{
      request
      .post(this._apiUrl+'/'+uri)
      .send(content)
      .set(AUTH_HEADER, this._sessionId)
      .timeout(timeout)
      .end((err, res)=>{
        this._dispatchResult(verb, type, err, res, resolve, reject);
      });
    });

    this._uri = '';
    return promise;
  };

  this._modify = (obj)=>{
    var type = this._domain;
    var uri = this._uri;
    var verb = 'modify';

    var content = {};
    if(obj) content = obj;

    var resolve = null;
    var reject = null;
    var promise = new Promise((res, rej)=>{
      resolve = res;
      reject = rej;
    });

    this._enqueue(_=>{
      request
      .put(this._apiUrl+'/'+uri)
      .send(content)
      .set(AUTH_HEADER, this._sessionId)
      .timeout(timeout)
      .end((err, res)=>{
        this._dispatchResult(verb, type, err, res, resolve, reject);
      });
    });

    this._uri = '';
    return promise;
  };

  this._get = ()=>{
    this._loadingCount++;
    // console.log(`Start ${this._domain} : ${this._loadingCount}`);
    var type = this._domain;
    var uri = this._uri;
    var verb = 'get';

    var resolve = null;
    var reject = null;
    var promise = new Promise((res, rej)=>{
      resolve = res;
      reject = rej;
    });

    this._enqueue(_=>{
      request
      .get(this._apiUrl+'/'+uri)
      .set('ksid', this._sessionId)
      .timeout(timeout)
      .end((err, res)=>{
        this._loadingCount--;
        // console.log(`End ${this._domain} : ${this._loadingCount}`);
        this._dispatchResult(verb, type, err, res, resolve, reject);
      });
    });

    this._uri = '';
    return promise;
  };

  this._delete = ()=>{
    var type = this._domain;
    var uri = this._uri;
    var verb = 'delete';

    var resolve = null;
    var reject = null;
    var promise = new Promise((res, rej)=>{
      resolve = res;
      reject = rej;
    });

    this._enqueue(_=>{
      request
      .delete(this._apiUrl+'/'+uri)
      .set(AUTH_HEADER, this._sessionId)
      .timeout(timeout)
      .end((err, res)=>{
        this._dispatchResult(verb, type, err, res, resolve, reject);
      });
    });

    this._uri = '';
    return promise;
  };

  this._dispatchResult = (verb, type, err, res, resolve, reject)=>{
    if(err || !res.ok){
      if(this._debug)
        console.log('Error in '+verb+' '+type+' : ', err.status?err.status:'Request failed', '\n', err);
      reject(err);
    }
    else {
      if(this._debug)
        console.log(verb+' '+type+' ok : ', res.body);

      var result = [];
      result = res.body;
      resolve(result, err);
    }
    this._runNext();
  };

  this._addToUri = (path)=>{
    if(this._uri===''){
      this._uri = path;
    }
    else {
      this._uri = this._uri + '/' + path;
    }
  };


  this.activate = ()=>{
    this._uri = this._uri + '/active';
    return this._create(null);
    // Final Function - Do not return this but a Promise instead
  };

  this.deactivate = ()=>{
    this._uri = this._uri + '/active';
    return this._delete();
    // Final Function - Do not return this but a Promise instead
  };

  this.sendEmail = ()=>{
    this._addToUri('sendemail');
    return this._create(null);
    // Final Function - Do not return this but a Promise instead
  };

  this.list = (params)=>{

    if(params){
      this._uri += '?';
      for(const [key, value] of Object.entries(params)){
        this._uri += `${key}=${value}&`;
      }
      // if(params.start)
      //  this._uri += 'start='+params.start+'&';
      // if(params.limit)
      //  this._uri += 'limit='+params.limit+'&';
    }
    return this._get();
    // Final Function - Do not return this but a Promise instead
  };

  this.new = (obj)=>{
    return this._create(obj);
    // Final Function - Do not return this but a Promise instead
  };

  // Like new, without parameter
  this.add = ()=>{
    return this._create(null);
    // Final Function - Do not return this but a Promise instead
  };

  this.update = (obj)=>{
    return this._modify(obj);
    // Final Function - Do not return this but a Promise instead
  };

  this.conform = (obj)=>{
    return this._modify(obj);
    // Final Function - Do not return this but a Promise instead
  };

  this.delete = ()=>{
    return this._delete();
    // Final Function - Do not return this but a Promise instead
  };

  this.isLoading = () => {

    return this._loadingCount !== 0;
  };
}

module.exports = foundation;
