// ==========================================
// SECCIÓN 1: CALENTAMIENTO NUMÉRICO
// ==========================================

// Ejercicio 1.1: Suma de Dígitos de un Número
function sumaDigitos(n) {
    // CASO BASE: Si el número es menor a 10, la suma es el número mismo.
    if (n < 10) {
        return n;
    }
    
    // CASO RECURSIVO: Extraemos el último dígito con % 10 y lo sumamos a la
    // llamada recursiva con el número recortado sin decimales usando Math.floor().
    return (n % 10) + sumaDigitos(Math.floor(n / 10));
}

// Casos de prueba para validación
console.assert(sumaDigitos(1243) === 10, "Error en sumaDigitos(1243)");
console.assert(sumaDigitos(0) === 0, "Error en sumaDigitos(0)");
console.assert(sumaDigitos(9) === 9, "Error en sumaDigitos(9)");
console.log("Ejercicio 1.1 superado.");