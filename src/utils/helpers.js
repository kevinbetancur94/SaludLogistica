
export function buscarIndiceLote(inv, nombreProducto) {
  for (let i = 0; i < inv.length; i++) {
    if (inv[i].producto === nombreProducto) {
      return i; 
    }
  }
  return -1; 
}

export function estaDisponible(lote) {
  return lote.estado === "disponible";
}

export function tieneSuficienteStock(lote, cantidadRequerida) {
  return lote.cantidad >= cantidadRequerida;
}
