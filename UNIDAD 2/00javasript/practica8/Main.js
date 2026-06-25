const RegistroAmbiental = require("./RegistroAmbiental");
const GestorRegistrosVerdes = require("./GestorRegistrosVerdes");
const { performance } = require("perf_hooks");
function generarDatosPrueba(cantidad) {
    let datos = [];

    for (let i = 0; i < cantidad; i++) {
        let especie = `Especie_${Math.floor(Math.random() * 100)}`;
        let co2 = +(Math.random() * 100).toFixed(2);

        datos.push(new RegistroAmbiental(i, especie, co2));
    }

    // Fisher-Yates
    for (let i = datos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [datos[i], datos[j]] = [datos[j], datos[i]];
    }

    return datos;
}

const gestor = new GestorRegistrosVerdes();

const dataset25K = generarDatosPrueba(25000);
const dataset500K = generarDatosPrueba(500000);
const dataset1M = generarDatosPrueba(1000000);

console.log("=== BUSQUEDA SECUENCIAL ===");

let inicio = performance.now();
let resultado = gestor.busquedaSecuencial(dataset25K, 24999);
let fin = performance.now();

console.log("Indice:", resultado);
console.log("Tiempo:", (fin - inicio).toFixed(4), "ms");

inicio = performance.now();
resultado = gestor.busquedaSecuencial(dataset500K, 499999);
fin = performance.now();

console.log("Indice:", resultado);
console.log("Tiempo:", (fin - inicio).toFixed(4), "ms");

inicio = performance.now();
resultado = gestor.busquedaSecuencial(dataset1M, 999999);
fin = performance.now();

console.log("Indice:", resultado);
console.log("Tiempo:", (fin - inicio).toFixed(4), "ms");

console.log("\n=== ORDENANDO CON MERGE SORT ===");

gestor.mergeSort(dataset25K, 0, dataset25K.length - 1);
gestor.mergeSort(dataset500K, 0, dataset500K.length - 1);
gestor.mergeSort(dataset1M, 0, dataset1M.length - 1);

console.log("\n=== BUSQUEDA BINARIA ===");

inicio = performance.now();
resultado = gestor.busquedaBinaria(dataset25K, 24999);
fin = performance.now();

console.log("Indice:", resultado);
console.log("Tiempo:", (fin - inicio).toFixed(4), "ms");

inicio = performance.now();
resultado = gestor.busquedaBinaria(dataset500K, 499999);
fin = performance.now();

console.log("Indice:", resultado);
console.log("Tiempo:", (fin - inicio).toFixed(4), "ms");

inicio = performance.now();
resultado = gestor.busquedaBinaria(dataset1M, 999999);
fin = performance.now();

console.log("Indice:", resultado);
console.log("Tiempo:", (fin - inicio).toFixed(4), "ms");