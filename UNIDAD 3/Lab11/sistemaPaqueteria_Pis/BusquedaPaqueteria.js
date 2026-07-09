const MotorAutocompletado = require('./MotorAutocompletado');

// 1. Inicialización y carga del diccionario
const motor = new MotorAutocompletado();
const diccionario = ["paquete_express", "postal_nacional", "prioritario", "estandar", "perecedero"];
diccionario.forEach(termino => motor.insertarTermino(termino));
console.log("Diccionario de paquetería cargado exitosamente.");

// 2. Opción A: llamadas individuales
console.log("Sugerencias para 'p':", motor.obtenerSugerencias("p"));
console.log("Sugerencias para 'pa':", motor.obtenerSugerencias("pa"));
console.log("Sugerencias para 'pos':", motor.obtenerSugerencias("pos"));

// Opción B: simulación de bucle
const prefijosPrueba = ["p", "pa", "pos", "e", "pe"];
console.log("\n--- Simulación de Bucle de Búsqueda ---");
prefijosPrueba.forEach(prefijo => {
    console.log(`Buscando '${prefijo}':`, motor.obtenerSugerencias(prefijo));
});