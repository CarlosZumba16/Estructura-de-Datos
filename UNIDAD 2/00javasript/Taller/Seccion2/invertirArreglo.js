function invertirArreglo(arr, inicio, fin) {
    // CASO BASE: Condición de parada cuando los índices se cruzan o son iguales. [cite: 63]
    if (inicio >= fin) {
        return;
    }

    // INTERCAMBIO (In-place) sin usar arreglos auxiliares en memoria. [cite: 58, 64]
    let temporal = arr[inicio];
    arr[inicio] = arr[fin];
    arr[fin] = temporal;

    // CASO RECURSIVO: Avanzar punteros hacia el centro del arreglo. [cite: 64]
    invertirArreglo(arr, inicio + 1, fin - 1);
}

// Casos de prueba para validación
let miLista = [10, 20, 30, 40, 50];
invertirArreglo(miLista, 0, miLista.length - 1);
console.assert(JSON.stringify(miLista) === JSON.stringify([50, 40, 30, 20, 10]));
console.log("Ejercicio 2.1 superado.");
