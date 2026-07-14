import HospitalHeap from './HospitalHeap.js';

function main() {
    const sala = new HospitalHeap();

    // Probando la PARTE 1 (Inserción con Sift-Up automático)
    sala.ingresarPaciente("Juan", 2);
    sala.ingresarPaciente("María", 5);
    sala.ingresarPaciente("Pedro", 10); // Pedro flotará a la posición 0
    sala.ingresarPaciente("Ana", 8);    // Ana flotará a ser hija de Pedro

    console.log("--- ATENCIÓN DE PACIENTES REAL (MÁXIMA EFICIENCIA) ---");
    // Probando la PARTE 2 (Extracción con Sift-Down automático)
    console.log(sala.atenderSiguiente()); // Sale Pedro (10)
    console.log(sala.atenderSiguiente()); // Sale Ana (8)
    console.log(sala.atenderSiguiente()); // Sale María (5)
}

main();