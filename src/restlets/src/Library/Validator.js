(function(core)
{
  core.Validator = core.Base.extend(
  {
    constructor: function(input, requiredFields)
    {
      // our input
      this.input = input || new core.Input();

      // list of required fields
      this.requiredFields = requiredFields || [];

      // array of missing fields
      this.missingFields = [];

      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    validate: function()
    {
      var missingFields = [];
      var input   = this.input;

      this.requiredFields.forEach(function(field)
      {
        if ( ! input.has(field)) missingFields.push(field);
      });

      this.missingFields = missingFields;
      return this;
    },

    passes: function()
    {
      if (this.missingFields.length === 0) this.validate();

      return this.missingFields.length === 0;
    },

    fails: function()
    {
      return ! this.passes();
    },

    toHash: function()
    {
      var validation = {};

      this.missingFields.forEach(function(field)
      {
        validation[field] = field + ' is required.';
      });

      return validation;
    },

    toJSON: function()
    {
      return JSON.stringify(this.toHash());
    }
  });
})(core);
