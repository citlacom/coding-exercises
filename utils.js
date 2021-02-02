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
