// Lab 10 - Arboles Binarios de Busqueda (BST)
// Motor de indexacion local tipo Mini-Google

class NodoBusqueda {
    constructor(keyword, urlCache) {
        this.keyword = keyword;         // Llave de busqueda
        this.urlCache = urlCache;       // URL guardada en cache
        this.visitas = 1;               // Frecuencia de busqueda
        this.izquierdo = null;
        this.derecho = null;
    }
}

class MotorIndexacionBST {
    constructor() {
        this.raiz = null;
    }

    // Indexa una nueva consulta o aumenta las visitas si ya existe.
    indexar(keyword, urlCache) {
        const nuevoNodo = new NodoBusqueda(keyword, urlCache);

        if (this.raiz === null) {
            this.raiz = nuevoNodo;
            return;
        }

        this._insertarNodo(this.raiz, nuevoNodo);
    }

    _insertarNodo(nodoActual, nuevoNodo) {
        let actual = nodoActual;

        while (actual !== null) {
            const comparacion = nuevoNodo.keyword.localeCompare(actual.keyword);

            if (comparacion === 0) {
                actual.visitas += 1;
                actual.urlCache = nuevoNodo.urlCache;
                return;
            }

            if (comparacion < 0) {
                if (actual.izquierdo === null) {
                    actual.izquierdo = nuevoNodo;
                    return;
                }
                actual = actual.izquierdo;
            } else {
                if (actual.derecho === null) {
                    actual.derecho = nuevoNodo;
                    return;
                }
                actual = actual.derecho;
            }
        }
    }

    // Busqueda iterativa para evitar errores por exceso de recursion.
    buscar(keyword) {
        let actual = this.raiz;
        let ciclosCPU = 0;

        while (actual !== null) {
            ciclosCPU++;
            const comparacion = keyword.localeCompare(actual.keyword);

            if (comparacion === 0) {
                return {
                    encontrado: true,
                    keyword: actual.keyword,
                    urlCache: actual.urlCache,
                    visitas: actual.visitas,
                    ciclosCPU
                };
            }

            actual = comparacion < 0 ? actual.izquierdo : actual.derecho;
        }

        return { encontrado: false, ciclosCPU };
    }

    // Inorden iterativo: devuelve el historial ordenado de A-Z.
    exportarHistorial() {
        const historial = [];
        const pila = [];
        let actual = this.raiz;

        while (actual !== null || pila.length > 0) {
            while (actual !== null) {
                pila.push(actual);
                actual = actual.izquierdo;
            }

            actual = pila.pop();
            historial.push({
                keyword: actual.keyword,
                urlCache: actual.urlCache,
                visitas: actual.visitas
            });

            actual = actual.derecho;
        }

        return historial;
    }
}

function generarPalabras(cantidad) {
    const palabras = [];
    for (let i = 1; i <= cantidad; i++) {
        palabras.push(`keyword_${String(i).padStart(5, '0')}`);
    }
    return palabras;
}

// Generador simple con semilla para que la prueba sea repetible.
function crearGeneradorSemilla(semilla) {
    let valor = semilla;
    return function () {
        valor = (valor * 16807) % 2147483647;
        return (valor - 1) / 2147483646;
    };
}

function fisherYates(array, semilla = 42) {
    const copia = [...array];
    const random = crearGeneradorSemilla(semilla);

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

// Auditoria de ciclos CPU solicitada en la practica.
const TOTAL = 20000;
const palabras = generarPalabras(TOTAL);
const ultimaPalabra = palabras[palabras.length - 1];

const motorDegenerado = new MotorIndexacionBST();
for (const palabra of palabras) {
    motorDegenerado.indexar(palabra, `https://cache.local/${palabra}`);
}

const resultadoDegenerado = motorDegenerado.buscar(ultimaPalabra);
console.log(`Busqueda en arbol degenerado: ${resultadoDegenerado.ciclosCPU} ciclos de CPU`);

const motorPseudoBalanceado = new MotorIndexacionBST();
const palabrasBarajadas = fisherYates(palabras, 42);
for (const palabra of palabrasBarajadas) {
    motorPseudoBalanceado.indexar(palabra, `https://cache.local/${palabra}`);
}

const resultadoPseudo = motorPseudoBalanceado.buscar(ultimaPalabra);
console.log(`Busqueda en arbol pseudo-balanceado: ${resultadoPseudo.ciclosCPU} ciclos de CPU`);

const ahorro = ((resultadoDegenerado.ciclosCPU - resultadoPseudo.ciclosCPU) / resultadoDegenerado.ciclosCPU) * 100;
console.log(`Ahorro de ciclos: ${ahorro.toFixed(2)}%`);

// Prueba rapida de duplicado.
motorPseudoBalanceado.indexar(ultimaPalabra, `https://cache.local/${ultimaPalabra}-actualizada`);
const duplicado = motorPseudoBalanceado.buscar(ultimaPalabra);
console.log(`Visitas de clave duplicada '${ultimaPalabra}': ${duplicado.visitas}`);
