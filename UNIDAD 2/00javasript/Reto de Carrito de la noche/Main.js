const Producto = require('./Producto'); 
const Carrito = require('./Carrito');

class Main {
    static ejecutar() {
        console.log(" Iniciando Simulación del Carrito de Compras...\n");

        const producto1 = new Producto(101, "Leche Entera", 1.50);
        const producto2 = new Producto(102, "Pan de Molde", 2.10);
        const producto3 = new Producto(103, "Café Premium", 4.50);

        const carrito = new Carrito();

        
        // 1. Agrega una leche
        carrito.agregar(producto1); 

        // 2. Agrega un café
        carrito.agregar(producto3); 

        // 3. Agrega otra leche (Suma al total y aumenta cantidad de Leche)
        carrito.agregar(producto1); 

        // 4. Agrega de Pan de Molde
        carrito.agregar(producto2); 

        // 5. Elimina una leche (Resta del total y disminuye cantidad)
        carrito.quitar(101); 

        // 6. Elimina la última leche restante (Desaparece del carrito y resta su valor)
        carrito.quitar(101); 
    }
}

Main.ejecutar();