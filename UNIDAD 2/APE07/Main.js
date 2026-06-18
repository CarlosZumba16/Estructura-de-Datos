const Paquete = require('./Paquete');
const CentroDistribucion = require('./CentroDistribucion');

// ==========================================
// TAREA 3: EJECUCIÓN (MAIN)
// ==========================================
function main() {
    const centro = new CentroDistribucion();
    const totalPaquetes = 10000; 
    
    // Generamos 10,000 IDs desordenados
    let listaIds = Array.from({ length: totalPaquetes }, (_, i) => i);
    listaIds.sort(() => Math.random() - 0.5);

    console.log(`Generando ${totalPaquetes} paquetes aleatorios en la bodega...`);

    for (let i = 0; i < totalPaquetes; i++) {
        let cp = Math.floor(Math.random() * 5000) + 110101;
        // Instanciamos la clase Paquete importada
        centro.recibirCajaCamion(new Paquete(listaIds[i], cp));
    }

    const idBuscado = listaIds[Math.floor(totalPaquetes * 0.75)];
    console.log(`\n--- INICIANDO SIMULACIÓN DE BÚSQUEDA PARA EL ID: [${idBuscado}] ---`);

    // Medir Búsqueda Lineal
    let inicioLineal = process.hrtime.bigint();
    centro.busquedaLineal(idBuscado);
    let finLineal = process.hrtime.bigint();
    let tiempoLinealNS = Number(finLineal - inicioLineal);

    // Intento de Búsqueda Binaria (Debe fallar intencionalmente)
    console.log("\nEjecutando control de seguridad de la búsqueda binaria...");
    centro.busquedaBinaria(idBuscado); 

    // Medir Ordenamiento Quicksort
    console.log("\nOrdenando la bodega con el algoritmo Quicksort...");
    let inicioOrden = process.hrtime.bigint();
    centro.ordenarBodegaQuicksort();
    let finOrden = process.hrtime.bigint();
    let tiempoOrdenNS = Number(finOrden - inicioOrden);
    console.log("¡Bodega ordenada con éxito!");

    // Medir Búsqueda Binaria (Ahora debe funcionar)
    let inicioBinario = process.hrtime.bigint();
    centro.busquedaBinaria(idBuscado);
    let finBinario = process.hrtime.bigint();
    let tiempoBinarioNS = Number(finBinario - inicioBinario);

    // Imprimir Tabla del Reporte
    console.log("\n====================================================================");
    console.log("             TABLA COMPARATIVA DE RENDIMIENTO (TAREA 3)             ");
    console.log("====================================================================");
    
    console.table([
        {
            "Algoritmo / Proceso": "Búsqueda Lineal (Sin Ordenar)",
            "Tiempo (Nanosegundos)": tiempoLinealNS.toLocaleString() + " ns",
            "Tiempo (Milisegundos)": (tiempoLinealNS / 1000000).toFixed(4) + " ms"
        },
        {
            "Algoritmo / Proceso": "Ordenamiento previo (Quicksort)",
            "Tiempo (Nanosegundos)": tiempoOrdenNS.toLocaleString() + " ns",
            "Tiempo (Milisegundos)": (tiempoOrdenNS / 1000000).toFixed(4) + " ms"
        },
        {
            "Algoritmo / Proceso": "Búsqueda Binaria (Ya Ordenado)",
            "Tiempo (Nanosegundos)": tiempoBinarioNS.toLocaleString() + " ns",
            "Tiempo (Milisegundos)": (tiempoBinarioNS / 1000000).toFixed(4) + " ms"
        },
        {
            "Algoritmo / Proceso": "Estrategia Binaria TOTAL (Orden + Búsqueda)",
            "Tiempo (Nanosegundos)": (tiempoOrdenNS + tiempoBinarioNS).toLocaleString() + " ns",
            "Tiempo (Milisegundos)": ((tiempoOrdenNS + tiempoBinarioNS) / 1000000).toFixed(4) + " ms"
        }
    ]);
}

// Ejecutar programa
main();