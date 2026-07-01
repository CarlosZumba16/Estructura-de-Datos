// Estructura del Nodo del Índice
class NodoBusqueda {
    constructor(keyword, urlCache) {
        this.keyword = keyword;        
        this.urlCache = urlCache;      
        this.visitas = 1;              
        this.izquierdo = null;
        this.derecho = null;
    }
}

// Implementación del TDA Árbol Binario de Búsqueda
class MotorIndexacionBST {
    constructor() {
        this.raiz = null;
    }

    // Indexar nueva consulta en el historial
    indexar(keyword, urlCache) {
        const nuevoNodo = new NodoBusqueda(keyword, urlCache);
        if (this.raiz === null) {
            this.raiz = nuevoNodo;
        } else {
            this._insertarNodo(this.raiz, nuevoNodo);
        }
    }

    _insertarNodo(nodoActual, nuevoNodo) {
        // Comparación alfabética mediante localeCompare
        // Devuelve: -1 si es menor, 1 si es mayor, 0 si son iguales
        const comparacion = nuevoNodo.keyword.localeCompare(nodoActual.keyword);

        if (comparacion === 0) {
            // Si el 'keyword' ya existe, incrementa el contador 'visitas'
            nodoActual.visitas++;
        } else if (comparacion < 0) {
            // Ir hacia el subárbol izquierdo (menor)
            if (nodoActual.izquierdo === null) {
                nodoActual.izquierdo = nuevoNodo;
            } else {
                this._insertarNodo(nodoActual.izquierdo, nuevoNodo);
            }
        } else {
            // Ir hacia el subárbol derecho (mayor)
            if (nodoActual.derecho === null) {
                nodoActual.derecho = nuevoNodo;
            } else {
                this._insertarNodo(nodoActual.derecho, nuevoNodo);
            }
        }
    }

    // Buscar una palabra clave en el historial (O(log n) esperado)
    buscar(keyword, nodoActual = this.raiz) {
        // Base de la recursión: no se encontró o se llegó a un nodo vacío
        if (nodoActual === null) {
            return null;
        }

        const comparacion = keyword.localeCompare(nodoActual.keyword);

        if (comparacion === 0) {
            return nodoActual; // Encontrado
        } else if (comparacion < 0) {
            return this.buscar(keyword, nodoActual.izquierdo); // Buscar a la izquierda
        } else {
            return this.buscar(keyword, nodoActual.derecho); // Buscar a la derecha
        }
    }

    // Recorrido Inorden: Exportar el historial ordenado alfabéticamente (A-Z)
    exportarHistorial(nodo = this.raiz, resultado = []) {
        if (nodo !== null) {
            // 1. Visitar subárbol izquierdo
            this.exportarHistorial(nodo.izquierdo, resultado);
            
            // 2. Procesar nodo actual (guardamos una copia o el nodo completo)
            resultado.push({
                keyword: nodo.keyword,
                urlCache: nodo.urlCache,
                visitas: nodo.visitas
            });
            
            // 3. Visitar subárbol derecho
            this.exportarHistorial(nodo.derecho, resultado);
        }
        return resultado;
    }
}

console.log("Iniciando las pruebas Para motor de Busqueda ....|\n")
const Total_Keywords=100000;
let datosSecuenciales=[];

for (let i=1; i<= Total_Keywords;i++){
    datosSecuenciales.push("go_"+i.toString().padStart(5,'0'));
}
const palabraAbuscar= datosSecuenciales[Total_Keywords-1];

