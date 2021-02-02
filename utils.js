const isEmpty = (object) => {
  let allPropertiesEmpty = true;
  Object.keys(object).every((key) => {
    const hasValue = !!object[key];
    if (hasValue) {
      allPropertiesEmpty = false;
    }
  });

  return allPropertiesEmpty;
};

const dataSample1 = { a: 1, b: undefined };
const dataSample2 = { a: undefined };
const dataSample3 = { a: { aa: undefined } };
const dataSample4 = {};

console.log("Data sample 1: ", isEmpty(dataSample1));
console.log("Data sample 2: ", isEmpty(dataSample2));
console.log("Data sample 3: ", isEmpty(dataSample3));
console.log("Data sample 4: ", isEmpty(dataSample4));
