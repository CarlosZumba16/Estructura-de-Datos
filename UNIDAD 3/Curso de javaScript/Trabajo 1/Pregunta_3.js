const paso1_String = "1234";
const paso2_Number = Number(paso1_String); // Convierte "1234" a 1234
const paso3_BigInt = BigInt(paso2_Number); // Convierte 1234 a 1234n
const paso4_Boolean = Boolean(paso3_BigInt); // Convierte 1234n a true

console.log(`${paso4_Boolean} [${typeof paso4_Boolean}]`); // Resultado: true [boolean]