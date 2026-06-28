function busquedaBinariaRecursiva(arr, objetivo, bajo, alto) {
    // CASO BASE 1: El rango de búsqueda se volvió inválido (el elemento no existe). [cite: 72, 74]
    if (bajo > alto) {
        return -1;
    }

    // Calcular el punto medio de forma entera [cite: 73, 75]
    let medio = Math.floor((bajo + alto) / 2);

    // CASO BASE 2: El elemento en el medio es el objetivo [cite: 76]
    if (arr[medio] === objetivo) {
        return medio;
    }

    // CASOS RECURSIVOS: Reducir el espacio de búsqueda a la mitad adecuada [cite: 77]
    if (arr[medio] > objetivo) {
        return busquedaBinariaRecursiva(arr, objetivo, bajo, medio - 1); // Mitad izquierda
    } else {
        return busquedaBinariaRecursiva(arr, objetivo, medio + 1, alto); // Mitad derecha
    }
}

// Casos de prueba para validación
const datosOrdenados = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.assert(busquedaBinariaRecursiva(datosOrdenados, 23, 0, 9) === 5);
console.assert(busquedaBinariaRecursiva(datosOrdenados, 100, 0, 9) === -1);
console.log("Ejercicio 2.2 superado.");