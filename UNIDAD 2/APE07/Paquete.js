class Paquete {
    constructor(id, codigoPostal) {
        this.id = id;
        this.codigoPostal = codigoPostal;
    }

    getId() {
        return this.id;
    }

    getCodigoPostal() {
        return this.codigoPostal;
    }
}

// Exportamos la clase para que otros archivos la usen
module.exports = Paquete;