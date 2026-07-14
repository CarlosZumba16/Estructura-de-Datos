class Grafo {
    // El constructor prepara el espacio. Le decimos cuántas personas habrá.
    constructor(numeroDePersonas) {
        // Creamos una lista vacía para cada persona
        // Si hay 3 personas, crea: Personas = [ [], [], [] ]
        this.amigosDeCadaUno = Array.from({ length: numeroDePersonas }, () => []);
    }

    // Este método sirve para conectar a dos personas (hacerlas amigas)
    conectarPersonas(personaA, personaB) {
        // Añadimos a la personaB a la lista de amigos de personaA
        this.amigosDeCadaUno[personaA].push(personaB);
        
        // Como la amistad es de doble vía, añadimos a personaA a la lista de personaB
        this.amigosDeCadaUno[personaB].push(personaA);
    }

    // Este método sirve para imprimir los resultados en la pantalla
    mostrarAmistades() {
        console.log("--- LISTA DE AMIGOS DE LA RED ---");
        
        // Revisamos la lista de cada persona, una por una
        this.amigosDeCadaUno.forEach((listaDeAmigos, numeroDePersona) => {
            // .join(' y ') une los números con la palabra ' y ' para que se vea bonito
            console.log(`Persona ${numeroDePersona} es amiga de: ${listaDeAmigos.join(' y ')}`);
        });
    }
}

// Guardamos esta plantilla para poder usarla en el otro archivo
export default Grafo;