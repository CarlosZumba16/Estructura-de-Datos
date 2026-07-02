// --- Pregunta 1: Creación de variables ---

// Boolean
const boolLiteral = true;
const boolConstructor = Boolean(false);

// Number
const numLiteral = 42;
const numConstructor = Number(3.14);

// BigInt (Nota: BigInt() no acepta literales flotantes y no usa 'new')
const bigIntLiteral = 9007199254740991n;
const bigIntConstructor = BigInt(123456);

// String
const strLiteral = "Hola Mundo";
const strConstructor = String("JavaScript");

// undefined (No tiene función constructora que devuelva 'undefined')
const undefLiteral = undefined;


// --- Pregunta 2: Impresión con String Interpolation ---

console.log(`${boolLiteral} [${typeof boolLiteral}]`);
console.log(`${boolConstructor} [${typeof boolConstructor}]`);

console.log(`${numLiteral} [${typeof numLiteral}]`);
console.log(`${numConstructor} [${typeof numConstructor}]`);

console.log(`${bigIntLiteral} [${typeof bigIntLiteral}]`);
console.log(`${bigIntConstructor} [${typeof bigIntConstructor}]`);

console.log(`${strLiteral} [${typeof strLiteral}]`);
console.log(`${strConstructor} [${typeof strConstructor}]`);

console.log(`${undefLiteral} [${typeof undefLiteral}]`);