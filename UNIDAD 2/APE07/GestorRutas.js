class GestorRutas {
    // Usamos 'static' para poder llamarlo sin instanciar la clase (GestorRutas.ordenar(datos))
    static ordenar(datos) {
        if (datos == null || datos.length < 2) {
            return;
        }

        let n = datos.length;
        let intercambiado;

        for (let i = 0; i < n - 1; i++) {
            intercambiado = false;

            for (let j = 0; j < n - 1 - i; j++) {
                // Comparamos por ID de menor a mayor
                if (datos[j].getId() > datos[j + 1].getId()) {
                    // SWAP
                    let temporal = datos[j];
                    datos[j] = datos[j + 1];
                    datos[j + 1] = temporal;

                    intercambiado = true;
                }
            }

            // Optimización si ya está ordenado
            if (!intercambiado) {
                break;
            }
        }
    }
}