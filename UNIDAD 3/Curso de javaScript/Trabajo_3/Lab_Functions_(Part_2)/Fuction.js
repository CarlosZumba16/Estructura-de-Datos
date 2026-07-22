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

let showContact = function(contacts, i) {
    if (contacts instanceof Array && contacts[i]) {
        console.log(`${contacts[i].name} / ${contacts[i].phone} / ${contacts[i].email}`);
    }
};

let showAllContacts = function(contacts) {
    if (contacts instanceof Array) {
        for (let contact of contacts) {
            console.log(`${contact.name} / ${contact.phone} / ${contact.email}`);
        }
    }
};

let addNewContact = function(contacts, name, phone, email) {
    if (contacts instanceof Array && name && phone && email) {
        contacts.push({
            name: name,
            phone: phone,
            email: email
        });
    }
};

// --- NUEVA FUNCIÓN: LAB 5.1.12 ---
let sortContacts = function(contacts, sortBy) {
    if (contacts instanceof Array) {
        // Verificamos que el criterio de ordenamiento sea válido
        if (sortBy === "name" || sortBy === "phone" || sortBy === "email") {
            contacts.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                    return -1; // a va antes que b
                } else if (a[sortBy] > b[sortBy]) {
                    return 1;  // a va después que b
                }
                return 0;      // son iguales
            });
            console.log(`Contactos ordenados exitosamente por: ${sortBy}`);
        } else {
            console.log("Criterio no válido. Usa: 'name', 'phone' o 'email'.");
        }
    } else {
        console.log("Error: El primer argumento debe ser una lista de contactos.");
    }
};

// --- Pruebas de funcionamiento ---

console.log("--- Lista original ---");
showAllContacts(contacts);

console.log("\n--- Ordenando por Nombre ---");
sortContacts(contacts, "name");
showAllContacts(contacts);

console.log("\n--- Ordenando por Email ---");
sortContacts(contacts, "email");
showAllContacts(contacts);