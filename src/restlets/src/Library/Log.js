(function(core)
{
  /**
  * type: log type (audit, debug, error, emergency)
  * title: a title used to organize log entries (max length: 99 characters)
  * details: details of the log entry (max length: 3000 characters)
  */
  var log = function(type, title, details)
  {
    if(typeof console !== 'undefined') console.log(type, title, details);
    else nlapiLogExecution(type, title, JSON.stringify(details));
  };

  core.Log = {
    details: {},

    extend: function(one, two, type)
    {
      var extend = {};
      _.isObject(two) ? extend = two : extend[type] = two;
      return _.extend(one, extend);
    },

    register: function(key, value)
    {
      this.details[key] = value;
    },

    audit: function(title, details)
    {
      log('AUDIT', title, this.extend(this.details, details, 'audit'));
    },

    debug: function(title, details)
    {
      if (core.debug) log('DEBUG', title, this.extend(this.details, details, 'debug'));
    },

    error: function(title, details)
    {
      log('ERROR', title, this.extend(this.details, details, 'error'));
    },

    emergency: function(title, details)
    {
      log('EMERGENCY', title, this.extend(this.details, details, 'emergency'));
    }
  };
})(core);
