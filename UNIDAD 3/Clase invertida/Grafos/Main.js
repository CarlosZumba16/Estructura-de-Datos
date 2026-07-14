// Traemos la plantilla que creamos en el otro archivo
import Grafo from './Grafo.js';

function main() {
    // 1. Creamos nuestra red social para 3 personas (Persona 0, Persona 1 y Persona 2)
    const miRedSocial = new Grafo(3);

    // 2. Registramos las amistades
    // Conectamos a la Persona 0 (Ana) con la Persona 1 (Beto)
    miRedSocial.conectarPersonas(0, 1);
    
    // Conectamos a la Persona 0 (Ana) con la Persona 2 (Carlos)
    miRedSocial.conectarPersonas(0, 2);

    // 3. Le pedimos al programa que nos muestre cómo quedó la red
    miRedSocial.mostrarAmistades();
}

// ¡Arrancamos el programa!
main();