# Description

Basic object property and method reflection/introspection using Object.getOwnPropertyNames

# Latest Version

0.0.1

# Installation
```
npm install glasses
```

or in package.json 

```json
{
  ...
  "dependencies": {
    "glasses": "~0.0.1"
  }
}
```

# Usage
```
var Glasses = require('glasses');
var arr = [1, 2, 3]
console.log(Glasses.methods(arr));
```
gives you a list of all the methods on an array:
```
[ 'unshift',
  'pop',
  'indexOf',
  'every',
  'slice',
  'reduce',
  'forEach',
  'reverse',
  'shift',
  'splice',
  'lastIndexOf',
  'concat',
  'toString',
  'push',
  'constructor',
  'map',
  'join',
  'sort',
  'filter',
  'some',
  'reduceRight',
  'toLocaleString',
  '__defineSetter__',
  '__defineGetter__',
  'propertyIsEnumerable',
  'valueOf',
  'isPrototypeOf',
  'hasOwnProperty',
  '__lookupSetter__',
  '__lookupGetter__' ]
```
Passing a second argument of true restricts the lookup to just the object and its immediate prototype:
```
console.log(Glasses.methods(arr, true));
```
results in 
```
[ 'unshift',
  'pop',
  'indexOf',
  'every',
  'slice',
  'reduce',
  'forEach',
  'reverse',
  'shift',
  'splice',
  'lastIndexOf',
  'concat',
  'toString',
  'push',
  'constructor',
  'map',
  'join',
  'sort',
  'filter',
  'some',
  'reduceRight',
  'toLocaleString' 
]
```
Glasses(blah) is a superset of the methods call that includes non-function properties. For example with an array, the result would also include "length". There's also Glasses.attributes for just non-function properties. 
```

# Build status
[![build status](https://secure.travis-ci.org/stephenhandley/Glasses.png)](http://travis-ci.org/stephenhandley/Glasses)