function factorialCola(n, acumulador = 1) {
    // CASO BASE
    if (n <= 1) {
        return acumulador;
    }
    
    // CASO RECURSIVO DE COLA
    // La llamada es limpia; no hay multiplicaciones pendientes "por fuera"
    return factorialCola(n - 1, n * acumulador);
}