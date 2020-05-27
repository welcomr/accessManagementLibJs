
var foundation = require('./foundation.js');

function kzkRdv(sessionId, endpoint, debug){
	foundation.call(this, sessionId, endpoint, debug);

	this.rdv = (rdvId = null)=>{
		this._domain = 'event';
		this._addToUri('event');
		if(rdvId)
			this._uri = this._uri+'/'+rdvId;
		return this;
	};
	
	this.event = (eventId = null)=>{
		this._domain = 'event';
		this._addToUri('event');
		if(eventId)
			this._uri = this._uri+'/'+ eventId;
		return this;
	};

	this.extendedEvent = (eventId = null)=>{
		this._domain = 'extendedEvent';
		this._addToUri('extendedEvent');
		if(eventId)
			this._uri = this._uri+'/'+ eventId;
		return this;
	};

	this.visitor = ()=>{
		this._domain = 'visitor';
		this._addToUri('visitor');
		return this;
	};

	this.checkin = ()=>{
		this._domain = 'checkin';
		this._addToUri('checkin');
		return this;
	};

	this.onSite = () => {
		this._domain = 'onsite';
  	this._addToUri('onsite');
		return this;
	}

	this.emergency = () => {
		this._domain = 'emergency';
  	this._addToUri('emergency');
		return this;
	}

	this.notify = () => {
		this._domain = 'notify';
		this._addToUri('notify');
		return this;
	}

	this.group = (groupId = null)=>{
		this._domain = 'group';
		this._addToUri('group');
		if(groupId)
			this._uri = this._uri+'/'+groupId;
		return this;
	};

	this.attendee = (attendeeId = null)=>{
		this._domain = 'attendee';
		this._addToUri('attendee');
		if(attendeeId)
			this._uri = this._uri+'/'+attendeeId;
		return this;
	};

	this.device = (deviceId = null)=>{
		this._domain = 'device';
		this._addToUri('device');
		if(deviceId)
			this._uri = this._uri+'/'+deviceId;
		return this;
	};

	this.autocompleteLogins = (value = null)=>{
		this._domain = 'autocompleteLogins';
		this._addToUri('autocompleteLogins');
	
		return this;
	};	

	this.autocomplete = (value = null)=>{
		this._domain = 'autocomplete';
		this._addToUri('autocomplete');
	
		return this;
	};

	this.onsite = (value = null)=>{
		this._domain = 'onsite';
		this._addToUri('onsite');
	
		return this;
	};

	this.generate = (value = null)=>{
		this._addToUri('generate');
	
		return this._create(null);
	};
}

kzkRdv.prototype = Object.create(foundation.prototype);
kzkRdv.prototype.constructor = kzkRdv;

module.exports = kzkRdv;
