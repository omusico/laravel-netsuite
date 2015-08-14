(function(core)
{
  core.Validator = core.Base.extend(
  {
    constructor: function(input)
    {
      this.input     = input;
      this.passed    = false;
      this.validated = false;
      this.requiredFieldGroups = _.rest(arguments);
      this.missingFieldGroups = [];
      this.initialize.apply(this, arguments);
    },

    initialize: function() {},

    validate: function()
    {
      // check each test suite
      var tests = _.map(this.requiredFieldGroups, function(fieldGroup, index)
      {
        // check each field in each test suite
        return _.every(fieldGroup, function(value, field)
        {
          var passed = this.input.has(field);

          if ( ! passed)
          {
            if (typeof this.missingFieldGroups[index] === 'undefined')
            {
              this.missingFieldGroups[index] = [];
            }

            // add field to the missing fields hash
            this.missingFieldGroups[index].push(field);
          }

          return passed;
        }, this);
      }, this);

      this.passed = _.some(tests);

      return this;
    },

    passes: function()
    {
      if ( ! this.validated) this.validate();
      return this.passed === true;
    },

    fails: function()
    {
      return ! this.passes();
    },

    toHash: function()
    {
      var validation = [];

      _.each(this.missingFieldGroups, function(fieldGroup, index)
      {
        if (typeof validation[index] === 'undefined')
        {
          validation[index] = {};
        }

        _.each(fieldGroup, function(field)
        {
          validation[index][field] = field + ' is required.';
        });
      }, this);

      return validation;
    },

    toJSON: function()
    {
      return JSON.stringify(this.toHash());
    }
  });
})(core);
