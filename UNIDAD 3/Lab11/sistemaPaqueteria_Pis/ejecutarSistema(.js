import { MotorAutocompletado } from './MotorAutocompletado.js';

// 2. Creamos la función principal para ejecutar el flujo
function ejecutarSistema() {
    console.log("--- Iniciando Sistema de Paquetería PIS ---");
    
    // Instanciar el motor de autocompletado
    const motor = new MotorAutocompletado();

    // 3. Registrar términos (ej. destinos comunes de paquetes en el sistema)
    console.log("Registrando palabras clave en el Motor Trie...");
    motor.insertarTermino("Quito");
    motor.insertarTermino("Guayaquil");
    motor.insertarTermino("Cuenca");
    motor.insertarTermino("Loja");
    motor.insertarTermino("Ambato");
    motor.insertarTermino("Manta");

    // 4. Probar el autocompletado simulando que el usuario escribe en el buscador
    const prefijoBuscado = "m"; 
    console.log(`\nBuscando sugerencias para el prefijo: "${prefijoBuscado}"`);
    
    const sugerencias = motor.obtenerSugerencias(prefijoBuscado);

    // 5. Mostrar los resultados
    if (sugerencias.length > 0) {
        console.log("Resultados encontrados:");
        sugerencias.forEach((ciudad, indice) => {
            console.log(`${indice + 1}. ${ciudad}`);
        });
    } else {
        console.log("No se encontraron coincidencias para ese prefijo.");
    }
}

// Ejecutamos el método principal
ejecutarSistema();