class HospitalHeap {
    constructor() {
        this.heap = [];
    }

    // PARTE 1: INSERTAR Y SIFT-UP (Burbujeo hacia arriba)
    ingresarPaciente(nombre, urgencia) {
        const nuevo = { nombre, urgencia };
        this.heap.push(nuevo); // 1. Va al final
        this.siftUp(this.heap.length - 1); // 2. Sube a su posición correcta
    }

    siftUp(index) {
        while (index > 0) {
            let padreIndex = Math.floor((index - 1) / 2); // Fórmula matemática para hallar al padre
            
            // Si el paciente es más urgente que su padre, intercambian
            if (this.heap[index].urgencia > this.heap[padreIndex].urgencia) {
                [this.heap[index], this.heap[padreIndex]] = [this.heap[padreIndex], this.heap[index]];
                index = padreIndex; // Seguimos evaluando desde la nueva posición
            } else {
                break; // Si ya no es más urgente, se queda ahí
            }
        }
    }

    // PARTE 2: EXTRAER Y SIFT-DOWN (Filtrado hacia abajo)
    atenderSiguiente() {
        if (this.heap.length === 0) return "No hay pacientes.";
        if (this.heap.length === 1) return this.heap.pop();

        const atendido = this.heap[0]; // El más urgente está en la posición 0
        this.heap[0] = this.heap.pop(); // Movemos al último de la fila al puesto 0
        this.siftDown(0); // Lo bajamos a su posición correcta

        return `Médico atiende a: ${atendido.nombre} [Urgencia: ${atendido.urgencia}]`;
    }

    siftDown(index) {
        let tamaño = this.heap.length;
        
        while (true) {
            let izquierdo = 2 * index + 1; // Fórmula hijo izquierdo
            let derecho = 2 * index + 2;   // Fórmula hijo derecho
            let mayor = index;

            // ¿El hijo izquierdo es más urgente?
            if (izquierdo < tamaño && this.heap[izquierdo].urgencia > this.heap[mayor].urgencia) {
                mayor = izquierdo;
            }
            // ¿El hijo derecho es aún más urgente?
            if (derecho < tamaño && this.heap[derecho].urgencia > this.heap[mayor].urgencia) {
                mayor = derecho;
            }

            // Si el de arriba no era el mayor, intercambiamos y seguimos bajando
            if (mayor !== index) {
                [this.heap[index], this.heap[mayor]] = [this.heap[mayor], this.heap[index]];
                index = mayor;
            } else {
                break; // Ya está en su lugar correcto
            }
        }
    }
}

export default HospitalHeap;
