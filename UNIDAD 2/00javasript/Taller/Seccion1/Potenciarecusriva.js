function potencia(base, exponente) {
    // CASO BASE: Todo número elevado a la potencia 0 es igual a 1.
    if (exponente === 0) {
        return 1;
    }
    
    // CASO RECURSIVO OPTIMIZADO: Calculamos la potencia de la mitad del exponente
    let mitad = potencia(base, Math.floor(exponente / 2));
    
    if (exponente % 2 === 0) {
        // Si el exponente es par: (base^(n/2))^2
        return mitad * mitad;
    } else {
        // Si el exponente es impar: base * (base^((n-1)/2))^2
        return base * mitad * mitad;
    }
}

// Casos de prueba para validación
console.assert(potencia(2, 10) === 1024, "Error en potencia(2, 10)");
console.assert(potencia(5, 3) === 125, "Error en potencia(5, 3)");
console.assert(potencia(7, 0) === 1, "Error en potencia(7, 0)");
console.log("Ejercicio 1.2 superado.");