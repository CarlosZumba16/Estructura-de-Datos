/*
== 
=== el mismo tipo y del mismo valor
===!=
|=
|==


<
>

and

or

not
los tipos de condicionales nvestigando y si se utiliza un bucle for se crea un hatml klamando al java script en un sitio web



*/
let stock = 0;
let precioProducto = 25.50;
let dineroDisponible = 50;

// Ejemplo 1: Validar si hay mercancía usando conversión estricta
if (stock === 0) {
    console.log("Lo sentimos, producto agotado.");
}

// Ejemplo 2: Validar si te alcanza el dinero
if (dineroDisponible >= precioProducto) {
    console.log("¡Compra realizada con éxito!");
} else {
    console.log("Fondos insuficientes.");
}