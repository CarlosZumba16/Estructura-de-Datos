class Carrito {
    constructor() {
        this.articulos = []; 
    }

    // Agregar producto y actualizar la suma total
    agregar(producto) {
        const itemEnCarrito = this.articulos.find(item => item.id === producto.id);

        if (itemEnCarrito) {
            itemEnCarrito.cantidad += 1;
            console.log(`➕ Se aumentó la cantidad de: ${producto.nombre}`);
        } else {
            this.articulos.push({ ...producto, cantidad: 1 });
            console.log(`📥 Se añadió al carrito: ${producto.nombre}`);
        }
        
        // Al finalizar, mostramos el impacto en el total
        this.mostrarResumen();
    }

    // Eliminar o restar producto de la suma total
    quitar(id) {
        const itemEnCarrito = this.articulos.find(item => item.id === id);

        if (itemEnCarrito) {
            itemEnCarrito.cantidad -= 1;
            console.log(`➖ Se restó una unidad de: ${itemEnCarrito.nombre}`);

            // Si la cantidad llega a 0, se elimina por completo del total
            if (itemEnCarrito.cantidad === 0) {
                console.log(`🗑️ ${itemEnCarrito.nombre} se eliminó por completo del carrito.`);
                this.articulos = this.articulos.filter(item => item.id !== id);
            }
        } else {
            console.log("❌ El producto no está en el carrito.");
        }

        // Al finalizar, mostramos el impacto en el total
        this.mostrarResumen();
    }

    // Método encargado de calcular la suma total en tiempo real
    calcularTotal() {
        return this.articulos.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    // Imprime el estado actual del carrito y la suma total
    mostrarResumen() {
        console.log("--- ESTADO DEL CARRITO ---");
        if (this.articulos.length === 0) {
            console.log("(Carrito vacío)");
        } else {
            console.table(this.articulos.map(item => ({
                Producto: item.nombre,
                Precio: `$${item.precio.toFixed(2)}`,
                Cantidad: item.cantidad,
                Subtotal: `$${(item.precio * item.cantidad).toFixed(2)}`
            })));
        }
        console.log(` SUMA TOTAL: $${this.calcularTotal().toFixed(2)}`);
        console.log("------------------------------------------\n");
    }
}

module.exports = Carrito;