
import { inventario, solicitudes, UMBRAL_CRITICO } from "../model/InventarioModel.js";
import { buscarIndiceLote, estaDisponible, tieneSuficienteStock } from "../utils/helpers.js";


export function procesarSolicitudes() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("      SALUDLOGÍSTICA — MOTOR LÓGICO DE INVENTARIO      ");
  console.log("═══════════════════════════════════════════════════════");
  console.log("\n📋 PROCESANDO SOLICITUDES URGENTES...\n");

  for (let i = 0; i < solicitudes.length; i++) {
    const solicitud = solicitudes[i];

    const idx = buscarIndiceLote(inventario, solicitud.producto);

    if (idx === -1) {
      console.log(`❌ RECHAZADA  | ${solicitud.hospital} → "${solicitud.producto}" no existe en inventario.`);
      continue;
    }

    const lote = inventario[idx];

    if (!estaDisponible(lote)) {
      console.log(`⚠️  RECHAZADA  | ${solicitud.hospital} → "${solicitud.producto}" estado actual: "${lote.estado}".`);
      continue;
    }

    if (!tieneSuficienteStock(lote, solicitud.cantidadRequerida)) {
      console.log(`⚠️  INSUFICIENTE | ${solicitud.hospital} → pidió ${solicitud.cantidadRequerida} de "${solicitud.producto}" pero solo hay ${lote.cantidad} unidades.`);
      continue;
    }

    lote.cantidad = lote.cantidad - solicitud.cantidadRequerida; // descontar stock
    lote.estado   = "en tránsito";                               // actualizar estado

    console.log(`✅ APROBADA   | ${solicitud.hospital} → ${solicitud.cantidadRequerida} unidades de "${solicitud.producto}" despachadas. Stock restante: ${lote.cantidad}`);
  }
}


export function generarReportePorPrioridad() {
  console.log("\n═══════════════════════════════════════════════════════");
  console.log("      📊 REPORTE DE INVENTARIO POR PRIORIDAD           ");
  console.log("═══════════════════════════════════════════════════════\n");

  // Contadores manuales por nivel de prioridad
  let totalAlta  = 0;
  let totalMedia = 0;
  let totalBaja  = 0;

  for (let i = 0; i < inventario.length; i++) {
    const lote = inventario[i];

    if (lote.prioridad === "alta") {
      totalAlta = totalAlta + lote.cantidad;
    } else if (lote.prioridad === "media") {
      totalMedia = totalMedia + lote.cantidad;
    } else if (lote.prioridad === "baja") {
      totalBaja = totalBaja + lote.cantidad;
    }
  }

  console.log(`🔴 Prioridad ALTA  → ${totalAlta}  unidades totales`);
  console.log(`🟡 Prioridad MEDIA → ${totalMedia} unidades totales`);
  console.log(`🟢 Prioridad BAJA  → ${totalBaja}  unidades totales`);
}

export function emitirAlertasCriticas() {
  console.log("\n═══════════════════════════════════════════════════════");
  console.log("      🚨 ALERTAS DE ESCASEZ CRÍTICA                    ");
  console.log("═══════════════════════════════════════════════════════\n");

  let hayAlertas = false;

  for (let i = 0; i < inventario.length; i++) {
    const lote = inventario[i];

    if (lote.cantidad < UMBRAL_CRITICO) {
      console.warn(`🚨 ALERTA | "${lote.producto}" → ${lote.cantidad} unidades (umbral: ${UMBRAL_CRITICO}) — Prioridad: ${lote.prioridad.toUpperCase()}`);
      hayAlertas = true;
    }
  }

  if (!hayAlertas) {
    console.log("✅ Sin alertas. Todos los productos superan el umbral mínimo.");
  }
}


export function mostrarEstadoFinal() {
  console.log("\n═══════════════════════════════════════════════════════");
  console.log("      📦 ESTADO FINAL DEL INVENTARIO                   ");
  console.log("═══════════════════════════════════════════════════════\n");

  console.table(inventario);

  console.log("\n✔️  Procesamiento completado. — SaludLogística v1.0");
}
