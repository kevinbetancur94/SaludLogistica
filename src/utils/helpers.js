// ============================================================
//  helpers.js — Capa de UTILIDADES (Utils)
//  Funciones auxiliares reutilizables para toda la aplicación.
//  No contiene datos ni lógica de negocio, solo herramientas.
// ============================================================

/**
 * buscarIndiceLote(inventario, nombreProducto)
 *
 * Recorre el arreglo de inventario MANUALMENTE con un for
 * y retorna el ÍNDICE (posición) del lote cuyo producto coincida.
 * Si no encuentra el producto, retorna -1.
 *
 * ¿Por qué retornamos el índice y no el objeto directamente?
 * Porque necesitamos poder MODIFICAR el lote original en el arreglo
 * (restar cantidad, cambiar estado), y eso solo es posible si
 * sabemos en qué posición está: inventario[indice].cantidad = ...
 */
export function buscarIndiceLote(inv, nombreProducto) {
  for (let i = 0; i < inv.length; i++) {
    if (inv[i].producto === nombreProducto) {
      return i; // ← posición encontrada
    }
  }
  return -1; // ← no encontrado
}

/**
 * estaDisponible(lote)
 *
 * Verifica si el estado de un lote es "disponible".
 * Retorna true o false.
 * Separa esta validación para no repetir la condición en el controlador.
 */
export function estaDisponible(lote) {
  return lote.estado === "disponible";
}

/**
 * tieneSuficienteStock(lote, cantidadRequerida)
 *
 * Verifica si un lote tiene suficientes unidades para
 * cubrir la cantidad solicitada por el hospital.
 * Retorna true o false.
 */
export function tieneSuficienteStock(lote, cantidadRequerida) {
  return lote.cantidad >= cantidadRequerida;
}
