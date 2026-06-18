const numerSecreto = Math.floor(Math.random() * 10 + 1);
const numerojugador = parseInt(prompt("Adivina el numero secreto entre 1 al 10: "));

// CORREGIDO: Usamos comillas invertidas (``) para que funcione el ${}
console.log(`Este es el numero con el que juegas ${numerojugador}`);
console.log(`El número secreto era: ${numerSecreto}`); // Añadido para que puedas espiar en la consola

if (numerojugador === numerSecreto) {
    console.log("Felicidades, adivinaste el numero");
    alert("Felicidades, adivinaste el numero"); // Te añade una alerta visual en el navegador
} else if (numerojugador < numerSecreto) {
    console.log("numero menor compa intentalo de nuevo puede que le atines");
    alert("El número que pusiste es MENOR al secreto. ¡Inténtalo de nuevo!");
} else if (numerojugador > numerSecreto) {
    console.log("Numero mayor !!!! intentalo de nuevo");
    alert("El número que pusiste es MAYOR al secreto. ¡Inténtalo de nuevo!");
} else {
    console.log("numero no encontrado , intenta de nuevo bro");
    alert("Ingreso no válido. Intenta de nuevo bro.");
}