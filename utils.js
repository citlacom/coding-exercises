/**
 * Shallow check wether object is empty or not.
 *
 * @param {Object} object Object to check.
 * @returns {boolean} True when is empty, false otherwise.
 */
const isEmpty = (object) => {
  let allPropertiesEmpty = true;

  if (typeof object !== "object" || object === null) {
    throw new Error("Invalid object input");
  }

  Object.keys(object).every((key) => {
    const hasValue = !!object[key];
    if (hasValue) {
      allPropertiesEmpty = false;
    }
  });

  return allPropertiesEmpty;
};

const emptyDataSample1 = { a: 1, b: undefined };
const emptyDataSample2 = { a: undefined };
const emptyDataSample3 = { a: { aa: undefined } };
const emptyDataSample4 = {};

console.log("Data sample 1: ", isEmpty(emptyDataSample1));
console.log("Data sample 2: ", isEmpty(emptyDataSample2));
console.log("Data sample 3: ", isEmpty(emptyDataSample3));
console.log("Data sample 4: ", isEmpty(emptyDataSample4));

/**
 * Transform deep array into plain array.
 *
 * @param {Array} array A deep array.
 * @returns {Array} Plain array compound by all nested array values.
 */
const flatten = (array) => {
  flatArray = [];

  if (!Array.isArray(array)) {
    return [];
  }

  const itemFlatten = (items) => {
    for (const item of items) {
      if (Array.isArray(item)) {
        itemFlatten(item);
      } else if (typeof item !== "object" || item === null) {
        flatArray.push(item);
      }
    }
  };

  itemFlatten(array);

  return flatArray;
};

const flattenDataSample1 = [1, 2, [3, 4, [5]]];
const flattenDataSample2 = [1, 2, [3, 4, [{ a: 1 }, { b: 2 }]]];
const flattenDataSample3 = {};
const flattenDataSample4 = null;
const flattenDataSample5 = [false, [true, [false, undefined, null]]];

console.log("Flatten sample 1: ", flatten(flattenDataSample1));
console.log("Flatten sample 2: ", flatten(flattenDataSample2));
console.log("Flatten sample 3: ", flatten(flattenDataSample3));
console.log("Flatten sample 4: ", flatten(flattenDataSample4));
console.log("Flatten sample 5: ", flatten(flattenDataSample5));

/**
 * Invoke an array method within child element located by a given path.
 *
 * @param {Object} object An object that should contain child array.
 * @param {string} [path=""] The keys path where array to invoke function is located.
 * @param {string} [func=""] An array function name to invoke.
 * @param {Array} [args=[]] Arguments to pass into invoked array function.
 * @returns {Any} Invoked function output.
 */
const invoke = (object, path = "", func = "", args = []) => {
  const resolvePathData = (path) => {
    const pathParts = path.split(".");
    let idx = 0;
    const depth = pathParts.length;

    while (object !== null && idx < depth) {
      const key = `${pathParts[idx]}`;
      object = object[key];
      idx++;
    }

    if (idx !== depth) {
      return undefined;
    }

    return object;
  };

  if (typeof object !== "object" || object === null) {
    throw new Error("Invalid object input");
  }

  const objectPathData = resolvePathData(path);
  const arrayFunc = objectPathData ? objectPathData[func] : null;

  if (!arrayFunc) {
    return undefined;
  }

  return arrayFunc.apply(objectPathData, args);
};

const invokeDataSample1 = { a: { b: [1, 2, 3] } };
const invokeDataSample2 = { a: { b: { c: [30, 45, 60, 90] } } };

console.log(
  "Invoke sample 1: ",
  invoke(invokeDataSample1, "a.b", "splice", [1, 2]),
);

console.log(
  "Invoke sample 2: ",
  invoke(invokeDataSample2, "a.b.c", "join", ["-"]),
);

console.log(
  "Invoke sample 2B: ",
  invoke(invokeDataSample2, "a.b.c", "invalid", ["-"]),
);

console.log(
  "Invoke sample 2C: ",
  invoke(invokeDataSample2, "a.b.d", "invalid", ["-"]),
);
