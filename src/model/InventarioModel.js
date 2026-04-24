// ============================================================
//  InventarioModel.js — Capa de DATOS (Model)
//  Contiene únicamente los datos del sistema.
//  Se exporta todo para ser usado en otras capas.
// ============================================================

// Umbral crítico de unidades: si un producto baja de este número, se emite alerta
export const UMBRAL_CRITICO = 50;

// Inventario histórico de lotes de suministros médicos
export const inventario = [
  { producto: "Mascarillas N95",   cantidad: 500,  prioridad: "alta",  estado: "disponible"  },
  { producto: "Guantes de Látex",  cantidad: 1200, prioridad: "media", estado: "disponible"  },
  { producto: "Bisturís",          cantidad: 30,   prioridad: "alta",  estado: "disponible"  },
  { producto: "Analgésicos",       cantidad: 200,  prioridad: "baja",  estado: "en tránsito" },
  { producto: "Suero Fisiológico", cantidad: 45,   prioridad: "alta",  estado: "disponible"  },
  { producto: "Jeringas",          cantidad: 800,  prioridad: "media", estado: "disponible"  },
  { producto: "Gasas Estériles",   cantidad: 100,  prioridad: "baja",  estado: "disponible"  }
];

// Solicitudes urgentes de los hospitales
export const solicitudes = [
  { hospital: "Hospital Central",        producto: "Bisturís",          cantidadRequerida: 40   },
  { hospital: "Clínica San José",        producto: "Mascarillas N95",   cantidadRequerida: 150  },
  { hospital: "Centro Médico del Valle", producto: "Suero Fisiológico", cantidadRequerida: 20   },
  { hospital: "Hospital Norte",          producto: "Guantes de Látex",  cantidadRequerida: 1500 }
];
