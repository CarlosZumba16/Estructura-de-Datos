const LogisticaGrafo = require("./LogisticaGrafo");

// Simulación de red de distribución (Tarea 3.1)
const redLogistica1 = new LogisticaGrafo(5);
redLogistica1.agregarRuta(0, 1, 4);
redLogistica1.agregarRuta(0, 2, 2);
redLogistica1.agregarRuta(1, 3, 5);
redLogistica1.agregarRuta(2, 1, 1);
redLogistica1.agregarRuta(2, 4, 8);
redLogistica1.agregarRuta(3, 4, 3);

const resultado1 = redLogistica1.dijkstra(0, 4);
console.log("Ruta optimizada:", resultado1.ruta.join(" -> "));
console.log("Consumo total:", resultado1.consumoTotal, "kWh");

console.log(" ")

// --- Simulación de red de distribución (Tarea 3.1) ---
const redLogistica2 = new LogisticaGrafo(5); // 5 centros de acopio (0 a 4)

// Definir conexiones y consumo energético estimado (kWh)
redLogistica2.agregarRuta(0, 1, 4); // Centro 0 a 1
redLogistica2.agregarRuta(0, 2, 2); // Centro 0 a 2
redLogistica2.agregarRuta(1, 3, 5); // Centro 1 a 3
redLogistica2.agregarRuta(2, 1, 1); // Centro 2 a 1
redLogistica2.agregarRuta(2, 4, 8); // Centro 2 a 4
redLogistica2.agregarRuta(3, 4, 3); // Centro 3 a 4

const resultado2 = redLogistica2.dijkstra(0, 4);

console.log("Ruta optimizada para el camión eléctrico:");
console.log("Centros visitados:", resultado2.ruta.join(" -> "));
console.log("Consumo total estimado:", resultado2.consumoTotal, "kWh");
