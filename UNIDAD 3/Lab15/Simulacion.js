/**
 * @file Simulacion.js
 * @description Punto de entrada de la Tarea 2 (Pruebas de Integración y Estrés - ABP).
 * Instancia AuditoriaRedUrbana y ejecuta 10,000 eventos concurrentes
 * eligiendo operaciones al azar mediante una distribución uniforme
 * estandarizada U(0,1).
 *
 * Ejecución: node Simulacion.js
 */
const AuditoriaRedUrbana = require('./AuditoriaRedUrbana');

const unlD = new AuditoriaRedUrbana();
unlD.simularCargaEstocastica(10000);