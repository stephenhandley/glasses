// TODO: improve test coverage of prototype-based inheritance

var assert = require('assert');
var __ = require('dundee');

var Glasses = require('../');

__(Array, {
  containsAll: function(arr, invert) {
    var _this = this;
    arr.forEach(function(el) {
      var test = (_this.indexOf(el) === -1);
      if (invert) { test = !test };
      if (test) { return false; }
    });
    return true;
  },
  containsNone: function(arr) {
    return this._containsAll(arr, true);
  },
  same: function(arr) {
    return (this._containsAll(arr) && arr._containsAll(this));
  },
  empty: function() {
    return (this.length === 0);
  }
});

function computeAll (obj) {
  return {
    properties: Glasses(obj),
    properties_shallow: Glasses(obj, true),
    methods: Glasses.methods(obj),
    methods_shallow: Glasses.methods(obj, true),
    attributes: Glasses.attributes(obj),
    attributes_shallow: Glasses.attributes(obj, true)
  };
}


function Barf(name) {
  this.name = name;
}
Barf.prototype.hi = function() {
  return "hi from " + this.name;
}

function objectProtoAsserts(all) {
  var obj_properties = Glasses({});
  
  assert(all.properties._containsAll(obj_properties));
  assert(all.properties_shallow._containsNone(obj_properties));
  assert.equal(all.attributes.length + all.methods.length, all.properties.length);
}
  
try {
  [
    {
      // built in object should only have methods and only a single 
      // member prototype chain so passing shallow=true should have no effect
      
      obj: {},
      asserts: function (obj, all) {
        assert(all.properties._same(all.properties_shallow));
        assert(all.properties._same(all.methods));
        assert(all.attributes._empty());
        assert.equal(all.attributes.length + all.methods.length, all.properties.length);
      }
    },
    {
      obj: {x: 10},
      asserts: function (obj, all) {
        assert.equal(all.attributes.length, 1);
        assert.equal(all.attributes.length + all.methods.length, all.properties.length);
        assert.equal(all.methods.indexOf('x'), -1);
        assert(all.attributes._same(['x']));    
      }
    },
    {
      obj: [],
      asserts: function (obj, all) {
        objectProtoAsserts(all);
      }
    },
    {
      obj: [1, 2, 3],
      asserts: function (obj, all) {
        var empty_attributes = Glasses.attributes([]);
        assert.equal(empty_attributes.length + obj.length, all.attributes.length);
      }
    },
    {
      obj: new Barf("barftown"),
      asserts: function (obj, all) {        
        objectProtoAsserts(all)
      }
    },
    {
      obj: Barf,
      asserts: function (obj, all) {        
        objectProtoAsserts(all)
        assert(all.attributes._same(all.attributes_shallow));
      }
    },
    {
      obj: "abcdefghijklmnopqrstuvwxyz",
      asserts: function (obj, all) {
        objectProtoAsserts(all)
      }
    }
    
  ].forEach(function(test) {
    test.asserts(test.obj, computeAll(test.obj));
  });

  console.log('All tests passed');
  
} catch (error) {
  console.log("Test Failed.");
  console.log("   Expected: " + error.expected);
  console.log("     Actual: " + error.actual); 
  console.log(error);
}
