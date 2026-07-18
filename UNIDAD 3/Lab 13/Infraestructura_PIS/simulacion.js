const GrafoInfraestructura = require("./GrafoInfraestructura");  // ← esta línea es la que da la orden de "importar" una clase

console.log("== Opción 1: Simulación de la Red Completa ==")
const red = new GrafoInfraestructura();
const centros = ["Centro de Producción", "Centro de Acopio", "Centro de Distribución", "Almacén", "Punto de Entrega"];
centros.forEach((nombre, i) => red.registrarArea(i, nombre));
red.agregarRuta(0, 3, 15); // Producción a Almacén
red.agregarRuta(0, 1, 30); // Producción a Acopio
red.agregarRuta(1, 2, 10); // Acopio a Distribución
red.agregarRuta(4, 2, 20); // Punto de Entrega a Distribución
red.agregarRuta(3, 4, 25); // Almacén a Punto de Entrega
red.imprimirMapaRutas();

console.log("")

console.log("== Simulación Focalizada (Centro de Producción a Almacén) ==")
const redSimple = new GrafoInfraestructura();
redSimple.registrarArea(0, "Centro de Producción");
redSimple.registrarArea(3, "Almacén");
redSimple.agregarRuta(0, 3, 15); // Producción a Almacén (15 km)
redSimple.imprimirMapaRutas();
