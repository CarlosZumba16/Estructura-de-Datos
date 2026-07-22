const PriorityQueue = require("./PriorityQueue");

class LogisticaGrafo {
  constructor(numNodos) {
    this.numNodos = numNodos;
    this.adyacencia = Array.from({ length: numNodos }, () => []);
  }

  agregarRuta(u, v, consumoEnergetico) {
    this.adyacencia[u].push({ nodo: v, peso: consumoEnergetico });
  }

  dijkstra(inicio, fin) {
    const distancias = Array(this.numNodos).fill(Infinity);
    const predecesores = Array(this.numNodos).fill(null);
    const pq = new PriorityQueue();

    distancias[inicio] = 0;
    pq.enqueue(inicio, 0);

    while (!pq.isEmpty()) {
      const { val: u, priority: d } = pq.dequeue();

      if (u === fin) break;
      if (d > distancias[u]) continue;

      for (let neighbor of this.adyacencia[u]) {
        let v = neighbor.nodo;
        let peso = neighbor.peso;
        if (distancias[u] + peso < distancias[v]) {
          distancias[v] = distancias[u] + peso;
          predecesores[v] = u;
          pq.enqueue(v, distancias[v]);
        }
      }
    }
    return { 
      consumoTotal: distancias[fin], 
      ruta: this.reconstruir(predecesores, fin) 
    };
  }

  reconstruir(predecesores, nodo) {
    const ruta = [];
    let actual = nodo;
    while (actual !== null) {
      ruta.unshift(actual);
      actual = predecesores[actual];
    }
    return ruta;
  }
}

module.exports = LogisticaGrafo;