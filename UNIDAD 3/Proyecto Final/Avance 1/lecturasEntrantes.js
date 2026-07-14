// Simulamos la llegada de lecturas de sensores IoT (algunas vienen duplicadas)
const lecturasEntrantes = [
    { sensor_id: "A1", valor: 22.5 },
    { sensor_id: "B1", valor: 19.0 },
    { sensor_id: "A1", valor: 22.5 },  // <-- DUPLICADO por fallo de red
    { sensor_id: "C1", valor: 24.1 },
    { sensor_id: "B1", valor: 19.0 },  // <-- DUPLICADO por fallo de red
];

// Creamos un Set en memoria para registrar los IDs que ya procesamos
const sensoresProcesados = new Set();
const lecturasFiltradas = [];

console.log("--- Procesando Ingesta de Datos ---");

for (const lectura of lecturasEntrantes) {
    const idSensor = lectura.sensor_id;
    
    // Pregunta instantánea: ¿Ya vi este sensor antes? (Costo O(1))
    // En JS usamos el método .has()
    if (!sensoresProcesados.has(idSensor)) {
        // Si es nuevo, lo registramos en el Set (.add) y lo aprobamos (.push)
        sensoresProcesados.add(idSensor);
        lecturasFiltradas.push(lectura);
        console.log(`✅ Lectura del sensor ${idSensor} procesada exitosamente.`);
    } else {
        // Si el ID ya existe en el Set, se ignora de inmediato
        console.log(`⚠️ Duplicado detectado para el sensor ${idSensor}. Descartando...`);
    }
}

console.log("\n--- Resultados Finales ---");
console.log(`Total de lecturas limpias listas para la Base de Datos: ${lecturasFiltradas.length}`);
