function properties (obj, shallow) {
  // wtfjs
  if ((typeof obj) === 'string') {
    obj = obj.constructor.prototype;
  }
  
  var props = Object.getOwnPropertyNames(obj);
  
  var proto = obj;
  while (proto = Object.getPrototypeOf(proto)) {
    Object.getOwnPropertyNames(proto).forEach(function (prop) {
      // add properties if they aren't already there
      if (props.indexOf(prop) === -1) {
        props.push(prop);
      }
    });
    
    // leave the loop after the first pass if we only want 
    // to include the object and its immediate prototype
    if (shallow) { break; }
  }
  
  return props;
}

function _filterProps (obj, shallow, filter) {
  return properties(obj, shallow).filter(filter);
}

function methods (obj, shallow) {
  return _filterProps(obj, shallow, function (prop) {
    return ((typeof obj[prop]) === 'function');
  });
};

function attributes (obj, shallow) { 
  return _filterProps(obj, shallow, function (prop) {
    return ((typeof obj[prop]) !== 'function');
  });
}

module.exports = properties;
module.exports.methods = methods;
module.exports.attributes = attributes;