let contacts = [{
    name: "Maxwell Wright",
    phone: "(0191) 719 6495",
    email: "Curabitur.egestas.nunc@nonummyac.co.uk"
}, {
    name: "Raja Villarreal",
    phone: "0866 398 2895",
    email: "posuere.vulputate@sed.com"
}, {
    name: "Helen Richards",
    phone: "0800 1111",
    email: "libero@convallis.edu"
}];

// 1. Función para mostrar un solo contacto según su índice
function showContact(contactsList, index) {
    if (contactsList instanceof Array) {
        if (contactsList[index]) {
            console.log(`Nombre: ${contactsList[index].name} / Teléfono: ${contactsList[index].phone} / Email: ${contactsList[index].email}`);
        } else {
            console.log("Error: El índice especificado no existe.");
        }
    } else {
        console.log("Error: El primer argumento debe ser una lista de contactos (Array).");
    }
}

// 2. Función para mostrar todos los contactos de la lista
function showAllContacts(contactsList) {
    if (contactsList instanceof Array) {
        for (let contact of contactsList) {
            console.log(`Nombre: ${contact.name} / Teléfono: ${contact.phone} / Email: ${contact.email}`);
        }
    } else {
        console.log("Error: El argumento debe ser un Array.");
    }
}

// 3. Función para agregar un nuevo contacto
function addNewContact(contactsList, name, phone, email) {
    if (contactsList instanceof Array) {
        if (name && phone && email) {
            contactsList.push({
                name: name,
                phone: phone,
                email: email
            });
            console.log("Contacto agregado exitosamente.");
        } else {
            console.log("Error: Todos los datos del nuevo contacto (nombre, teléfono, email) deben tener un valor.");
        }
    } else {
        console.log("Error: El primer argumento debe ser un Array.");
    }
}

// --- Pruebas de funcionamiento ---

console.log("--- Mostrando el primer contacto (índice 0) ---");
showContact(contacts, 0);

console.log("\n--- Agregando un nuevo contacto ---");
addNewContact(contacts, "Maisie Haley", "0913 531 3030", "risus.Quisque@urna.ca");

console.log("\n--- Mostrando todos los contactos actualizados ---");
showAllContacts(contacts);
