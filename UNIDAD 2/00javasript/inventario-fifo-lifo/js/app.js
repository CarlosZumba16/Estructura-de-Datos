// ================================================
// app.js
// Inventario FIFO vs LIFO — Tienda Tecnológica
// Autor: Cristian Narvaez G.
// ================================================

// ── Paleta de colores para los lotes ──────────────
const COLORES = [
  { bg: '#B5D4F4', borde: '#185FA5', txt: '#042C53' },
  { bg: '#9FE1CB', borde: '#0F6E56', txt: '#04342C' },
  { bg: '#FAC775', borde: '#BA7517', txt: '#412402' },
  { bg: '#F5C4B3', borde: '#993C1D', txt: '#4A1B0C' },
  { bg: '#CECBF6', borde: '#534AB7', txt: '#26215C' },
  { bg: '#C0DD97', borde: '#3B6D11', txt: '#173404' },
];

// ── Estado global de la aplicación ────────────────
let fifoQueue = [];   // cola FIFO (primer en entrar, primero en salir)
let lifoStack = [];   // pila LIFO (último en entrar, primero en salir)

let fifoStats = { costo: 0, ingresos: 0, vendidas: 0 };
let lifoStats = { costo: 0, ingresos: 0, vendidas: 0 };

let contadorLotes = 0;
let precioVenta = 65;

// ── FUNCIÓN: Agregar un lote al inventario ─────────
function agregarLote() {
  const producto = document.getElementById('sel-prod').value;
  const cantidad = Math.max(1, parseInt(document.getElementById('inp-qty').value) || 1);
  const costo    = Math.max(1, parseFloat(document.getElementById('inp-costo').value) || 1);
  precioVenta    = Math.max(costo + 1, parseFloat(document.getElementById('inp-pvp').value) || costo + 20);

  const color = COLORES[contadorLotes % COLORES.length];

  const lote = {
    id:      ++contadorLotes,
    producto: producto,
    cantidad: cantidad,
    restante: cantidad,
    costo:    costo,
    pvp:      precioVenta,
    color:    color,
  };

  // Se agrega una copia independiente a cada estructura
  fifoQueue.push({ ...lote, restante: cantidad });
  lifoStack.push({ ...lote, restante: cantidad });

  registrarMovimiento('fifo', 'in', `Lote #${lote.id}: ${cantidad} u. de "${producto}" a $${costo.toFixed(2)} c/u`);
  registrarMovimiento('lifo', 'in', `Lote #${lote.id}: ${cantidad} u. de "${producto}" a $${costo.toFixed(2)} c/u`);

  renderizar();
}

// ── FUNCIÓN: Vender unidades ───────────────────────
function vender() {
  let unidades = Math.max(1, parseInt(document.getElementById('inp-vender').value) || 1);

  const stockFifo = fifoQueue.reduce((acc, l) => acc + l.restante, 0);
  const stockLifo = lifoStack.reduce((acc, l) => acc + l.restante, 0);

  if (stockFifo === 0 && stockLifo === 0) {
    alert('Sin stock disponible. Agrega un lote primero.');
    return;
  }

  // Limitar la venta al stock mínimo disponible entre ambos métodos
  unidades = Math.min(unidades, stockFifo, stockLifo);

  procesarVenta('fifo', fifoQueue, fifoStats, unidades);
  procesarVenta('lifo', lifoStack, lifoStats, unidades);

  renderizar();
}

// ── FUNCIÓN: Lógica interna de venta ──────────────
function procesarVenta(metodo, cola, stats, cantidad) {
  let restante     = cantidad;
  let costoTotal   = 0;
  let ingresoTotal = cantidad * precioVenta;

  while (restante > 0 && cola.length > 0) {
    // FIFO: toma del frente (índice 0)
    // LIFO: toma del tope (último elemento)
    const lote = metodo === 'fifo' ? cola[0] : cola[cola.length - 1];

    const tomar = Math.min(restante, lote.restante);
    lote.restante -= tomar;
    costoTotal    += tomar * lote.costo;
    restante      -= tomar;

    // Si el lote quedó vacío, se elimina de la estructura
    if (lote.restante === 0) {
      metodo === 'fifo' ? cola.shift() : cola.pop();
    }
  }

  stats.costo    += costoTotal;
  stats.ingresos += ingresoTotal;
  stats.vendidas += cantidad;

  const ganancia = ingresoTotal - costoTotal;
  registrarMovimiento(
    metodo,
    'out',
    `Vendidas ${cantidad} u. | Costo: $${costoTotal.toFixed(2)} | Ingreso: $${ingresoTotal.toFixed(2)} | Ganancia: $${ganancia.toFixed(2)}`
  );
}

// ── FUNCIÓN: Renderizar toda la interfaz ───────────
function renderizar() {
  dibujarBodega('fifo', fifoQueue, false);
  dibujarBodega('lifo', lifoStack, true);
  actualizarEstadisticas();
}

// ── FUNCIÓN: Dibujar los lotes en la bodega ────────
function dibujarBodega(metodo, cola, invertir) {
  const bodegaEl  = document.getElementById(metodo + '-bodega');
  const flechaEl  = document.getElementById(metodo + '-flecha');

  if (cola.length === 0) {
    bodegaEl.innerHTML = '<div class="bodega-vacia">Sin stock. Agrega un lote.</div>';
    flechaEl.textContent = '—';
    return;
  }

  // Para LIFO mostramos los lotes en orden inverso (el tope queda a la izquierda)
  const lotes = invertir ? [...cola].reverse() : [...cola];
  let html = '';

  lotes.forEach((lote, indice) => {
    const esSiguiente = indice === 0;
    const c = lote.color;
    const marcado = esSiguiente ? `box-shadow: 0 0 0 2.5px ${c.borde};` : '';

    html += `
      <div class="caja">
        <div class="caja-box" style="background:${c.bg}; border-color:${c.borde}; color:${c.txt}; ${marcado}">
          <span>#${lote.id}</span>
          <span>${lote.restante} u.</span>
        </div>
        <div class="caja-precio" style="color:${c.borde}">$${lote.costo.toFixed(2)}</div>
        <div class="caja-prod">${lote.producto.split(' ')[0]}</div>
        ${esSiguiente ? `<div class="tag-sale ${metodo === 'lifo' ? 'tag-sale-lifo' : ''}">sale primero</div>` : ''}
      </div>
    `;
  });

  bodegaEl.innerHTML = html;

  // Mostrar qué lote saldría en la próxima venta
  const siguiente = metodo === 'fifo' ? cola[0] : cola[cola.length - 1];
  const direccion  = metodo === 'fifo' ? '→' : '←';
  flechaEl.textContent = `${direccion} Al vender, sale el Lote #${siguiente.id} (costo: $${siguiente.costo.toFixed(2)}/u)`;
}

// ── FUNCIÓN: Actualizar números y tabla ────────────
function actualizarEstadisticas() {
  const gananciaFifo = fifoStats.ingresos - fifoStats.costo;
  const gananciaLifo = lifoStats.ingresos - lifoStats.costo;

  const invFifo  = fifoQueue.reduce((acc, l) => acc + l.restante * l.costo, 0);
  const invLifo  = lifoStack.reduce((acc, l) => acc + l.restante * l.costo, 0);
  const stockFifo = fifoQueue.reduce((acc, l) => acc + l.restante, 0);
  const stockLifo = lifoStack.reduce((acc, l) => acc + l.restante, 0);

  // Estadísticas panel FIFO
  document.getElementById('fifo-costo').textContent    = '$' + fifoStats.costo.toFixed(2);
  document.getElementById('fifo-ingresos').textContent = '$' + fifoStats.ingresos.toFixed(2);
  document.getElementById('fifo-ganancia').textContent = '$' + gananciaFifo.toFixed(2);
  document.getElementById('fifo-vendidas').textContent = fifoStats.vendidas;

  // Estadísticas panel LIFO
  document.getElementById('lifo-costo').textContent    = '$' + lifoStats.costo.toFixed(2);
  document.getElementById('lifo-ingresos').textContent = '$' + lifoStats.ingresos.toFixed(2);
  document.getElementById('lifo-ganancia').textContent = '$' + gananciaLifo.toFixed(2);
  document.getElementById('lifo-vendidas').textContent = lifoStats.vendidas;

  // Tabla de comparación
  document.getElementById('r-fifo-costo').textContent = '$' + fifoStats.costo.toFixed(2);
  document.getElementById('r-lifo-costo').textContent = '$' + lifoStats.costo.toFixed(2);
  document.getElementById('r-fifo-inv').textContent   = '$' + invFifo.toFixed(2);
  document.getElementById('r-lifo-inv').textContent   = '$' + invLifo.toFixed(2);
  document.getElementById('r-fifo-stock').textContent = stockFifo;
  document.getElementById('r-lifo-stock').textContent = stockLifo;

  // Ganancia con indicador de ganador
  let htmlFifoGan = '$' + gananciaFifo.toFixed(2);
  let htmlLifoGan = '$' + gananciaLifo.toFixed(2);

  if (fifoStats.vendidas > 0 || lifoStats.vendidas > 0) {
    if (gananciaFifo > gananciaLifo) {
      htmlFifoGan += '<span class="ganador">Mayor ganancia</span>';
    } else if (gananciaLifo > gananciaFifo) {
      htmlLifoGan += '<span class="ganador">Mayor ganancia</span>';
    }
  }

  document.getElementById('r-fifo-gan').innerHTML = htmlFifoGan;
  document.getElementById('r-lifo-gan').innerHTML = htmlLifoGan;
}

// ── FUNCIÓN: Registrar en el historial ────────────
function registrarMovimiento(metodo, tipo, mensaje) {
  const lista = document.getElementById(metodo + '-log');
  const item  = document.createElement('div');

  item.className = 'hist-item hist-' + tipo;
  item.textContent = (tipo === 'in' ? '▲ Entrada: ' : '▼ Salida: ') + mensaje;

  lista.insertBefore(item, lista.firstChild);

  // Mantener máximo 6 entradas visibles
  while (lista.children.length > 6) {
    lista.removeChild(lista.lastChild);
  }
}

// ── FUNCIÓN: Reiniciar todo ────────────────────────
function reiniciar() {
  fifoQueue = [];
  lifoStack = [];
  fifoStats = { costo: 0, ingresos: 0, vendidas: 0 };
  lifoStats = { costo: 0, ingresos: 0, vendidas: 0 };
  contadorLotes = 0;
  precioVenta   = 65;

  const vacio = '<div class="bodega-vacia">Sin stock. Agrega un lote.</div>';
  document.getElementById('fifo-bodega').innerHTML = vacio;
  document.getElementById('lifo-bodega').innerHTML = vacio;
  document.getElementById('fifo-flecha').textContent = '—';
  document.getElementById('lifo-flecha').textContent = '—';
  document.getElementById('fifo-log').innerHTML = '';
  document.getElementById('lifo-log').innerHTML = '';

  actualizarEstadisticas();
}

// ── Ajuste automático del precio de venta ─────────
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('inp-costo').addEventListener('input', function () {
    const costo  = parseFloat(this.value) || 1;
    const pvpInput = document.getElementById('inp-pvp');
    if (parseFloat(pvpInput.value) <= costo) {
      pvpInput.value = Math.round(costo * 1.3);
    }
  });
});
