export class Ejercicio3 {
    static max(array) {
        if (!array || array.length === 0) return undefined;

        // Corrección: Iniciar en el índice 0 en lugar del índice 1
        let maxValue = array[0]; 
        
        for (let i = 1; i < array.length; i++) {
            if (array[i] > maxValue) {
                maxValue = array[i];
            }
        }
        return maxValue;
    }

    static ejecutar() {
        console.log("=== EJERCICIO 3 ===");
        
        console.log(" max([1, 4, 6, 2])  ->", Ejercicio3.max([1, 4, 6, 2]));  // Imprime 6
        console.log(" max([10, 4, 6, 2]) ->", Ejercicio3.max([10, 4, 6, 2])); // Imprime 10
        console.log("\n");
    }
}