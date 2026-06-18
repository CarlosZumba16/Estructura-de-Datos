class Perro {
  // El constructor inicializa las propiedades del objeto cuando se crea
  constructor(nombre, raza) {
    this.nombre = nombre; // Propiedad
    this.raza = raza;     // Propiedad
  }

  // Un método (función dentro de la clase)
  ladrar() {
    return `${this.nombre} dice: ¡Guau, guau!`;
  }

  // Otro método
  presentarse() {
    return `Hola, soy un ${this.raza} y me llamo ${this.nombre}.`;
  }
}

// 2. Creamos instancias (objetos reales a partir del molde)
const miPerro1 = new Perro("Firulais", "Labrador");
const miPerro2 = new Perro("Luna", "Poodle");

// 3. Usamos los objetos
console.log(miPerro1.presentarse()); // Resultado: Hola, soy un Labrador y me llamo Firulais.
console.log(miPerro2.ladrar());