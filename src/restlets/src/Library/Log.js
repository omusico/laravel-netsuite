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

    register: function(key, value)
    {
      this.details[key] = value;
    },

    debug: function(title, details)
    {
      this.register(title, details);
      if (core.debug) log('DEBUG', title, this.details);
    },

    audit: function(title, details)
    {
      this.register(title, details);
      log('AUDIT', title, this.details);
    },

    error: function(title, details)
    {
      this.register(title, details);
      log('ERROR', title, this.details);
    },

    emergency: function(title, details)
    {
      this.register(title, details);
      log('EMERGENCY', title, this.details);
    }
  };
})(core);
