/**
 * @class AuditoriaRedUrbana
 * @description Gestiona la topología de los centros de acopio de la red de
 * distribución UNLD_Audit. Cada centro de acopio se representa como un nodo
 * (identificado por un entero) que almacena una cola de paquetes pendientes.
 *
 * Estructura interna:
 *   centrosAcopio: Map<nodoId: number, paquetes: string[]>
 *
 * Complejidad espacial: O(n + p), donde n = número de nodos activos y
 * p = número total de paquetes almacenados en todos los nodos.
 */
class AuditoriaRedUrbana {
    /**
     * Inicializa la topología vacía y los contadores de auditoría.
     * Big-O: O(1)
     */
    constructor() {
        /** @type {Map<number, string[]>} Topología: nodoId -> cola de paquetes */
        this.centrosAcopio = new Map();

        /**
         * Contador de operaciones ejecutadas durante la auditoría,
         * usado para el reporte estadístico final.
         * @type {{insercion: number, eliminacion: number, busqueda: number, fallidas: number}}
         */
        this.contadorOperaciones = {
            insercion: 0,
            eliminacion: 0,
            busqueda: 0,
            fallidas: 0
        };
    }

    /**
     * Registra un nuevo centro de acopio (nodo) en la topología si no existe.
     * Big-O: O(1) amortizado (operación nativa de Map).
     *
     * @param {number} nodoId - Identificador único del centro de acopio.
     * @returns {void}
     */
    registrarNodo(nodoId) {
        if (!this.centrosAcopio.has(nodoId)) {
            this.centrosAcopio.set(nodoId, []);
        }
    }

    /**
     * Inserta un paquete en la cola del centro de acopio indicado.
     * Si el nodo no existe, se crea automáticamente (topología dinámica).
     * Big-O: O(1) amortizado — Map.get es O(1) y Array.push es O(1) amortizado.
     *
     * @param {number} nodoId - Nodo destino del paquete.
     * @param {string} paquete - Identificador del paquete a insertar.
     * @returns {void}
     */
    insertarPaquete(nodoId, paquete) {
        this.registrarNodo(nodoId);
        this.centrosAcopio.get(nodoId).push(paquete);
        this.contadorOperaciones.insercion++;
    }

    /**
     * Elimina (despacha) el paquete más antiguo del nodo indicado, simulando
     * una disciplina FIFO propia de una cola de distribución.
     * Big-O: O(k), donde k = número de paquetes actualmente en el nodo,
     * debido al reindexado interno que realiza Array.shift().
     *
     * @param {number} nodoId - Nodo del cual despachar un paquete.
     * @returns {string|null} El paquete despachado, o null si el nodo está vacío o no existe.
     */
    eliminarPaquete(nodoId) {
        const cola = this.centrosAcopio.get(nodoId);
        if (!cola || cola.length === 0) {
            this.contadorOperaciones.fallidas++;
            return null;
        }
        this.contadorOperaciones.eliminacion++;
        return cola.shift();
    }

    /**
     * Busca un centro de acopio y devuelve su estado actual (sin modificarlo).
     * Big-O: O(1) — acceso directo mediante Map.get.
     *
     * @param {number} nodoId - Nodo a consultar.
     * @returns {string[]|undefined} Cola de paquetes del nodo, o undefined si no existe.
     */
    buscarNodo(nodoId) {
        this.contadorOperaciones.busqueda++;
        return this.centrosAcopio.get(nodoId);
    }

    /**
     * Ejecuta una prueba de integración y estrés sobre la red, simulando
     * `eventos` operaciones concurrentes. En cada evento se genera un número
     * pseudoaleatorio mediante Math.random(), el cual aproxima una
     * distribución uniforme estandarizada U(0,1) (continua en [0,1)).
     * Ese valor decide, por rango, qué operación se ejecuta sobre un nodo
     * también elegido al azar (0-99):
     *
     *   [0.00, 0.50) -> insertarPaquete   (50% de probabilidad)
     *   [0.50, 0.80) -> buscarNodo        (30% de probabilidad)
     *   [0.80, 1.00) -> eliminarPaquete   (20% de probabilidad)
     *
     * Big-O: O(m) llamadas, cada una O(1) o O(k) según la operación elegida;
     * en el peor caso (todas eliminaciones sobre un nodo saturado) el costo
     * total es O(m · k), con m = eventos y k = tamaño máximo de una cola.
     *
     * @param {number} eventos - Número de eventos concurrentes a simular (p. ej. 10000).
     * @returns {void}
     */
    simularCargaEstocastica(eventos) {
        console.log("Iniciando auditoría de estrés sobre red UNLD...");
        console.time("Duración auditoría");

        for (let i = 0; i < eventos; i++) {
            const nodoId = Math.floor(Math.random() * 100); // nodo objetivo: 0-99
            const u = Math.random(); // muestra de U(0,1)

            if (u < 0.5) {
                this.insertarPaquete(nodoId, `Paquete-Eco-${i}`);
            } else if (u < 0.8) {
                this.buscarNodo(nodoId);
            } else {
                this.eliminarPaquete(nodoId);
            }
        }

        console.timeEnd("Duración auditoría");
        console.log(`Auditoría finalizada: ${this.centrosAcopio.size} nodos procesados.`);
        console.log("Resumen de operaciones:", this.contadorOperaciones);
    }
}

module.exports = AuditoriaRedUrbana;