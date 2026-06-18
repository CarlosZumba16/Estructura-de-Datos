class PilaPaquete {
    constructor(capacidad) {
        this.stack = new Array(capacidad);
        this.top = -1; // Iniciamos en -1 como en tu código Java
    }

    push(p) {
        // Validamos si la pila está llena
        if (this.top === this.stack.length - 1) {
            console.log("Error: La pila está llena.");
            return;
        }
        this.top++;
        this.stack[this.top] = p;
    }

    pop() {
        // Validamos si la pila está vacía
        if (this.top === -1) {
            console.log("Error: La pila está vacía.");
            return null;
        }
        let p = this.stack[this.top];
        this.stack[this.top] = null; // Liberar referencia
        this.top--;
        return p;
    }
}
