export class NodoTrie {
    constructor() {
        // Usamos Map en lugar de Array[26] para evitar el desperdicio de memoria 
        // en nodos dispersos, reduciendo la huella energética del servidor.
        this.hijos = new Map(); 
        this.esFinDePalabra = false;
    }
}
