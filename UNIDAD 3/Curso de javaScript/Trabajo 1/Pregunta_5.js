// Number + String (El número se convierte a string y se concatena)
const diff1 = 5 + "5";
console.log(`Number + String: ${diff1} [${typeof diff1}]`); // "55" [string]

// Number + Boolean (El boolean se convierte en 1 o 0)
const diff2 = 10 + true;
console.log(`Number + Boolean: ${diff2} [${typeof diff2}]`); // 11 [number]

// String + Boolean (El boolean se convierte en texto)
const diff3 = "Resultado: " + false;
console.log(`String + Boolean: ${diff3} [${typeof diff3}]`); // "Resultado: false" [string]

// BigInt + Number -> ¡ESTO DA ERROR! 
// JavaScript no mezcla BigInt y Number automáticamente para evitar pérdida de precisión.
try {
    const errorSuma = 10n + 5;
} catch (e) {
    console.log(`BigInt + Number: ¡Error! No se pueden mezclar directamente.`);
}