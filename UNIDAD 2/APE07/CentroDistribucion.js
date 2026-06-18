class CentroDistribucion {
    constructor() {
        this.inventario = []; 
    }

    recibirCajaCamion(p) {
        this.inventario.push(p);
    }

    despacharACliente() {
        if (this.inventario.length > 0) {
            return this.inventario.pop();
        }
        return null;
    }

    // --- TAREA 2: Búsqueda Lineal ---
    busquedaLineal(idBuscado) {
        for (let i = 0; i < this.inventario.length; i++) {
            if (this.inventario[i].getId() === idBuscado) {
                return this.inventario[i];
            }
        }
        return null;
    }

    // --- TAREA 2: Validación de Ordenamiento ---
    estaOrdenadoPorId() {
        for (let i = 0; i < this.inventario.length - 1; i++) {
            if (this.inventario[i].getId() > this.inventario[i + 1].getId()) {
                return false; 
            }
        }
        return true;
    }

    // --- TAREA 2: Búsqueda Binaria ---
    busquedaBinaria(idBuscado) {
        if (!this.estaOrdenadoPorId()) {
            console.log("⚠️ [ERROR]: Búsqueda binaria cancelada. Los datos NO están ordenados por ID.");
            return null;
        }

        let inicio = 0;
        let fin = this.inventario.length - 1;

        while (inicio <= fin) {
            let medio = Math.floor((inicio + fin) / 2);
            let idMedio = this.inventario[medio].getId();

            if (idMedio === idBuscado) {
                return this.inventario[medio];
            } else if (idMedio < idBuscado) {
                inicio = medio + 1;
            } else {
                fin = medio - 1;
            }
        }
        return null;
    }

    // --- ALGORITMO QUICKSORT AJUSTADO POR ID ---
    ordenarBodegaQuicksort() {
        if (this.inventario.length > 1) {
            this._quicksort(0, this.inventario.length - 1);
        }
    }

    _quicksort(bajo, alto) {
        if (bajo < alto) {
            let indiceParticion = this._particion(bajo, alto);
            this._quicksort(bajo, indiceParticion - 1);
            this._quicksort(indiceParticion + 1, alto);
        }
    }

    _particion(bajo, alto) {
        let pivote = this.inventario[alto].getId(); 
        let i = (bajo - 1);

        for (let j = bajo; j < alto; j++) {
            if (this.inventario[j].getId() <= pivote) {
                i++;
                let temp = this.inventario[i];
                this.inventario[i] = this.inventario[j];
                this.inventario[j] = temp;
            }
        }

        let temp = this.inventario[i + 1];
        this.inventario[i + 1] = this.inventario[alto];
        this.inventario[alto] = temp;

        return i + 1;
    }
}

// Exportamos la clase
module.exports = CentroDistribucion;