

class GestorRegistrosVerdes{

    constructor(){
    }
    
    busquedaBinaria(arreglo, idBuscado) {
        let inicio = 0;
        let fin = arreglo.length - 1;

        while (inicio <= fin) {
            let medio = Math.floor(inicio + (fin - inicio) / 2);

            if (arreglo[medio].idRegistro === idBuscado) {
                return medio;
            } else if (arreglo[medio].idRegistro < idBuscado) {
                inicio = medio + 1;
            } else {
                fin = medio - 1;
            }
        }
        return -1;
    }
    
    busquedaSecuencial(arreglo, idBuscado) {
        for (let i = 0; i < arreglo.length; i++) {
            if (arreglo[i].idRegistro === idBuscado) {
                return i;
            }
        }
        return -1;
    }
    
    mergeSort(arreglo, inicio, fin) {
        if (inicio < fin) {

            let medio = Math.floor(inicio + (fin - inicio) / 2);

            this.mergeSort(arreglo, inicio, medio);
            this.mergeSort(arreglo, medio + 1, fin);

            this.merge(arreglo, inicio, medio, fin);
        }
    }

    merge(arreglo, inicio, medio, fin) {

        let izquierda = arreglo.slice(inicio, medio + 1);
        let derecha = arreglo.slice(medio + 1, fin + 1);

        let i = 0;
        let j = 0;
        let k = inicio;

        while (i < izquierda.length && j < derecha.length) {

            if (izquierda[i].idRegistro <= derecha[j].idRegistro) {
                arreglo[k] = izquierda[i];
                i++;
            } else {
                arreglo[k] = derecha[j];
                j++;
            }

            k++;
        }

        while (i < izquierda.length) {
            arreglo[k] = izquierda[i];
            i++;
            k++;
        }

        while (j < derecha.length) {
            arreglo[k] = derecha[j];
            j++;
            k++;
        }
    }

    mergeSortPorCO2(arreglo, inicio, fin) {

        if (inicio < fin) {

            let medio = Math.floor(inicio + (fin - inicio) / 2);

            this.mergeSortPorCO2(arreglo, inicio, medio);
            this.mergeSortPorCO2(arreglo, medio + 1, fin);

            this.mergePorCO2(arreglo, inicio, medio, fin);
        }
    }

    mergePorCO2(arreglo, inicio, medio, fin) {

        let izquierda = arreglo.slice(inicio, medio + 1);
        let derecha = arreglo.slice(medio + 1, fin + 1);

        let i = 0;
        let j = 0;
        let k = inicio;

        while (i < izquierda.length && j < derecha.length) {

            if (izquierda[i].toneladasCO2 <= derecha[j].toneladasCO2) {
                arreglo[k] = izquierda[i];
                i++;
            } else {
                arreglo[k] = derecha[j];
                j++;
            }

            k++;
        }

        while (i < izquierda.length) {
            arreglo[k] = izquierda[i];
            i++;
            k++;
        }

        while (j < derecha.length) {
            arreglo[k] = derecha[j];
            j++;
            k++;
        }
    }
}
module.exports = GestorRegistrosVerdes;