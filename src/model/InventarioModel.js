
export const UMBRAL_CRITICO = 50;

export const inventario = [
  { producto: "Mascarillas N95",   cantidad: 500,  prioridad: "alta",  estado: "disponible"  },
  { producto: "Guantes de Látex",  cantidad: 1200, prioridad: "media", estado: "disponible"  },
  { producto: "Bisturís",          cantidad: 30,   prioridad: "alta",  estado: "disponible"  },
  { producto: "Analgésicos",       cantidad: 200,  prioridad: "baja",  estado: "en tránsito" },
  { producto: "Suero Fisiológico", cantidad: 45,   prioridad: "alta",  estado: "disponible"  },
  { producto: "Jeringas",          cantidad: 800,  prioridad: "media", estado: "disponible"  },
  { producto: "Gasas Estériles",   cantidad: 100,  prioridad: "baja",  estado: "disponible"  }
];

export const solicitudes = [
  { hospital: "Hospital Central",        producto: "Bisturís",          cantidadRequerida: 40   },
  { hospital: "Clínica San José",        producto: "Mascarillas N95",   cantidadRequerida: 150  },
  { hospital: "Centro Médico del Valle", producto: "Suero Fisiológico", cantidadRequerida: 20   },
  { hospital: "Hospital Norte",          producto: "Guantes de Látex",  cantidadRequerida: 1500 }
];
