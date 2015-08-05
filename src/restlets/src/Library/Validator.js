(function(core)
{
  core.Validator = core.Base.extend(
  {
    constructor: function(input, requiredFields)
    {
      this.input = input || new core.Input();
      this.requiredFields = requiredFields || [];
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    missing: function()
    {
      var missing_fields = [];

      for (var field in this.requiredFields) {
        if ( ! this.input.has(field)) missing_fields.push(field);
      }

      return missing_fields;
    },

    passes: function()
    {
      return this.missing().length > 0;
    },

    fails: function()
    {
      return ! this.passes();
    },

    toHash: function()
    {
      var validation = {};

      for (var field in this.missing()) {
        validation[field] = field + ' is required.';
      }

      return validation;
    },

    toJSON: function()
    {
      return JSON.stringify(this.toHash());
    }
  });
})(core);
