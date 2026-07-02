// Boolean + Boolean (Se coercionan a números: true=1, false=0)
const sumBool = true + true; 
console.log(`Boolean + Boolean: ${sumBool} [${typeof sumBool}]`); // 2 [number]

// Number + Number
const sumNum = 10 + 20;
console.log(`Number + Number: ${sumNum} [${typeof sumNum}]`); // 30 [number]

// BigInt + BigInt
const sumBigInt = 10n + 20n;
console.log(`BigInt + BigInt: ${sumBigInt} [${typeof sumBigInt}]`); // 30 [bigint]

// String + String (Se concatenan)
const sumStr = "Hola " + "Juan";
console.log(`String + String: ${sumStr} [${typeof sumStr}]`); // Hola Juan [string]

// undefined + undefined (Da Not-a-Number)
const sumUndef = undefined + undefined;
console.log(`undefined + undefined: ${sumUndef} [${typeof sumUndef}]`); // NaN [number]