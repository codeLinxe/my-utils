// Both JSON.stringify and JSON.parse support a second argument. replacer and reviver respectively. With replacer and reviver below it's possible to add support for native Map object, including deeply nested values

function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

function reviver(key, value) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

// Usage
const originalValue = new Map([['a', 1]]);
const str = JSON.stringify(originalValue, replacer);
const newValue = JSON.parse(str, reviver);

console.log(originalValue, newValue);

// Deep nesting with combination of Arrays, Objects and Maps

(function() {
  const originalValue = [
    new Map([['a', {
      b: {
        c: new Map([['d', 'text']])
      }
    }]])
  ];
  const str = JSON.stringify(originalValue, replacer);
  const newValue = JSON.parse(str, reviver);
  console.log('Deep', originalValue, newValue);
})()