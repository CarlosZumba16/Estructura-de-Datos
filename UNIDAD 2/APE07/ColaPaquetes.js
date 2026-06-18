class ColaPaquetes {
    constructor(capacidad) {
        this.queue = new Array(capacidad);
        this.frente = 0;
        this.fin = 0;
        this.total = 0;
    }

    enqueue(p) {
        // Verificar si la cola está llena
        if (this.total === this.queue.length) {
            console.log("Error: La cola de paquetes está llena.");
            return;
        }

        this.queue[this.fin] = p;
        // Avanzamos 'fin' de forma circular con módulo
        this.fin = (this.fin + 1) % this.queue.length;
        this.total++;
    }

    dequeue() {
        // Verificar si la cola está vacía
        if (this.total === 0) {
            console.log("Error: La cola de paquetes está vacía.");
            return null;
        }

        let p = this.queue[this.frente];
        this.queue[this.frente] = null; // Buena práctica para liberar memoria

        // Avanzamos 'frente' de forma circular
        this.frente = (this.frente + 1) % this.queue.length;
        this.total--;

        return p;
    }
}