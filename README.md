# 🏥 SaludLogística — Motor Lógico de Inventario

> Sistema de gestión y despacho de suministros médicos para la red de clínicas y hospitales de SaludLogística.
> Desarrollado como ejercicio académico de JavaScript con arquitectura MVC, módulos ES6 y restricciones técnicas estrictas.

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Tecnologías y Versiones](#-tecnologías-y-versiones)
- [Requisitos Previos](#-requisitos-previos)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Ejecución](#-instalación-y-ejecución)
- [Funcionalidades](#-funcionalidades)
- [Restricciones Técnicas Aplicadas](#-restricciones-técnicas-aplicadas)
- [Arquitectura MVC](#-arquitectura-mvc)
- [Flujo de Git y Ramas](#-flujo-de-git-y-ramas)
- [Autor](#-autor)

---

## 📌 Descripción del Proyecto

**SaludLogística** es una empresa de distribución de suministros médicos que necesita digitalizar
su sistema de gestión de inventario. Este proyecto implementa el núcleo lógico de ese sistema:
un motor de procesamiento capaz de:

- Recibir solicitudes urgentes de hospitales y determinar si pueden ser atendidas.
- Actualizar el inventario en tiempo real al aprobar un despacho.
- Generar reportes del estado del inventario agrupados por nivel de prioridad.
- Emitir alertas automáticas cuando un producto cae por debajo del umbral crítico de stock.

Toda la salida del sistema se visualiza en la **consola del navegador** (`F12`).
No se utiliza ni se modifica el DOM en ningún momento.

---

## 🛠️ Tecnologías y Versiones

| Tecnología | Versión | Uso en el proyecto |
|---|---|---|
| **HTML5** | Standard (sin versión numérica) | Punto de entrada — carga los módulos JS |
| **JavaScript** | ES6+ (ECMAScript 2015 en adelante) | Lógica del sistema, módulos, constantes |
| **ES Modules** | ES6 (`import` / `export`) | Sistema de modularidad entre archivos JS |
| **Node.js** *(solo dev)* | v22.x o superior | No se usa en producción; opcional para entorno local |
| **Live Server** *(extensión)* | v5.7.9 (VS Code Marketplace) | Servidor local para ejecutar módulos ES6 en el navegador |
| **VS Code** *(recomendado)* | v1.89 o superior | Editor de código recomendado |
| **Git** | v2.x o superior | Control de versiones |

> ⚠️ **Importante:** Este proyecto corre exclusivamente en el **navegador**.
> Node.js está listado como referencia del entorno de desarrollo, pero el código no lo usa.
> Queda prohibido por las restricciones del ejercicio.

### Navegadores compatibles

| Navegador | Versión mínima | Estado |
|---|---|---|
| Google Chrome | 61+ | ✅ Recomendado |
| Microsoft Edge | 79+ | ✅ Compatible |
| Mozilla Firefox | 60+ | ✅ Compatible |
| Safari | 10.1+ | ✅ Compatible |

> Los módulos ES6 (`type="module"`) son compatibles con todos los navegadores modernos desde 2017.

---

## ✅ Requisitos Previos

Antes de ejecutar el proyecto necesitas tener instalado:

1. **VS Code** — [Descargar aquí](https://code.visualstudio.com/)
2. **Extensión Live Server** para VS Code:
   - Abre VS Code → pestaña de Extensiones (`Ctrl+Shift+X`)
   - Busca `Live Server` de **Ritwick Dey**
   - Haz clic en **Instalar**
3. **Git** — [Descargar aquí](https://git-scm.com/)
   - Verificar instalación: `git --version`

---

## 📁 Estructura del Proyecto

```
saludlogistica/
│
├── src/                            # Código fuente JavaScript
│   │
│   ├── controllers/
│   │   └── SolicitudController.js  # Lógica principal del sistema
│   │                               # Procesa solicitudes y genera reportes en consola
│   │
│   ├── model/
│   │   └── InventarioModel.js      # Capa de datos
│   │                               # Inventario, solicitudes y constantes exportadas
│   │
│   └── utils/
│       └── helpers.js              # Funciones auxiliares reutilizables
│                                   # buscarIndiceLote, estaDisponible, tieneSuficienteStock
│
├── index.html                      # Punto de entrada HTML
│                                   # Solo carga el módulo principal via <script type="module">
│
├── .gitignore                      # Archivos y carpetas ignorados por Git
└── README.md                       # Este archivo
```

### ¿Por qué esta estructura?

El proyecto sigue el patrón **MVC (Model - View - Controller)**:

- **Model** (`InventarioModel.js`) — Solo contiene datos. No hace nada por sí solo.
- **View** — En este proyecto es la consola del navegador (no hay HTML dinámico).
- **Controller** (`SolicitudController.js`) — Contiene toda la lógica. Importa datos y helpers.
- **Utils** (`helpers.js`) — Capa adicional de funciones reutilizables sin lógica de negocio.

---

## 🚀 Instalación y Ejecución

### Paso 1 — Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/saludlogistica.git
cd saludlogistica
```

### Paso 2 — Abrir en VS Code

```bash
code .
```

O bien: *Archivo → Abrir carpeta* y selecciona la carpeta `saludlogistica`.

### Paso 3 — Iniciar Live Server

- Clic derecho sobre `index.html` en el explorador de VS Code
- Selecciona **"Open with Live Server"**
- Se abrirá el navegador automáticamente en `http://127.0.0.1:5500`

### Paso 4 — Ver la salida en consola

- Presiona `F12` (o `Ctrl+Shift+I`) para abrir las herramientas de desarrollador
- Ve a la pestaña **Consola**
- Verás todos los reportes del sistema impresos ahí

> ❌ **No abras `index.html` con doble clic.** Por usar `type="module"`, el navegador
> bloquea los `import` cuando el archivo se carga desde el sistema de archivos local (`file:///`).
> Siempre usa Live Server o cualquier servidor HTTP local.

---

## ⚙️ Funcionalidades

### 1. Procesamiento de solicitudes urgentes

Recorre cada solicitud de hospital y evalúa 4 condiciones en orden:

| Condición | Resultado |
|---|---|
| El producto no existe en el inventario | ❌ Rechazada |
| El producto existe pero su estado no es `"disponible"` | ⚠️ Rechazada |
| El producto está disponible pero el stock es insuficiente | ⚠️ Insuficiente |
| Existe, está disponible y hay suficiente stock | ✅ Aprobada — se descuenta del inventario |

Cuando una solicitud es aprobada, el sistema:
- Resta las unidades despachadas del inventario
- Cambia el estado del lote a `"en tránsito"`

### 2. Reporte por nivel de prioridad

Suma el total de unidades disponibles agrupadas por prioridad:
- 🔴 **Alta** — suministros críticos (Bisturís, Mascarillas N95, Suero Fisiológico)
- 🟡 **Media** — suministros frecuentes (Guantes de Látex, Jeringas)
- 🟢 **Baja** — suministros de apoyo (Analgésicos, Gasas Estériles)

### 3. Alertas de escasez crítica

Detecta automáticamente productos con **menos de 50 unidades** y emite una alerta
por consola (`console.warn`) para cada uno. Si todos están sobre el umbral, confirma
que no hay alertas activas.

### 4. Estado final del inventario

Muestra el inventario completo y actualizado en formato de tabla (`console.table`)
al finalizar todo el procesamiento.

---

## 🚫 Restricciones Técnicas Aplicadas

El ejercicio impone restricciones estrictas. Aquí se documenta cómo se cumplió cada una:

### ❌ Sin manipulación del DOM

Toda la salida usa exclusivamente métodos de consola:
```js
console.log()    // mensajes informativos
console.warn()   // alertas críticas (aparecen en amarillo)
console.table()  // tabla del inventario final
```
Ninguna línea del código accede a `document`, `querySelector`, `getElementById` ni similar.

### ❌ Sin métodos nativos de arreglos

Prohibidos: `push`, `pop`, `map`, `filter`, `reduce`, `forEach`, `find`, `findIndex`,
`includes`, `splice`, `concat`, `flat`, etc.

Todos los recorridos se hacen con `for` clásico manual:
```js
for (let i = 0; i < arreglo.length; i++) {
  // arreglo[i] para acceder al elemento
}
```

### ❌ Sin clases ni constructores

Prohibidos: `class`, `new MiClase()`, `function Constructor()`, `Object.keys()`,
`Object.values()`, `Object.entries()`.

Todos los datos son **objetos literales**:
```js
{ producto: "Bisturís", cantidad: 30, prioridad: "alta", estado: "disponible" }
```

### ❌ Sin Node.js

El código corre exclusivamente en el navegador.
No hay `require()`, no hay `process`, no hay `fs`.

### ❌ Sin asincronía

Prohibidos: `async`, `await`, `Promise`, `fetch`, `setTimeout`, `setInterval`.
El sistema es 100% síncrono, línea por línea.

### ✅ Módulos ES6 obligatorios

El código está dividido en al menos 2 archivos JS que se comunican con `import` / `export`:
```js
// InventarioModel.js
export const inventario = [ ... ];

// SolicitudController.js
import { inventario } from "../model/InventarioModel.js";
```

---

## 🏗️ Arquitectura MVC

```
┌─────────────────────────────────────────────────────┐
│                     index.html                      │
│         <script type="module" src="...">            │
└──────────────────────┬──────────────────────────────┘
                       │ importa y ejecuta
                       ▼
┌─────────────────────────────────────────────────────┐
│            SolicitudController.js                   │
│  procesarSolicitudes()                              │
│  generarReportePorPrioridad()                       │
│  emitirAlertasCriticas()                            │
│  mostrarEstadoFinal()                               │
└────────────┬───────────────────┬────────────────────┘
             │ importa           │ importa
             ▼                   ▼
┌────────────────────┐  ┌────────────────────────────┐
│  InventarioModel   │  │        helpers.js           │
│  inventario[]      │  │  buscarIndiceLote()         │
│  solicitudes[]     │  │  estaDisponible()           │
│  UMBRAL_CRITICO    │  │  tieneSuficienteStock()     │
└────────────────────┘  └────────────────────────────┘
```

---

## 🌿 Flujo de Git y Ramas

Este proyecto sigue el flujo de trabajo **Feature Branch**:

```
main
 └── feature/logica-inventario   ← rama de desarrollo
```

### Comandos usados

```bash
# 1. Inicializar el repositorio
git init

# 2. Crear y moverse a la rama de desarrollo (NO trabajar en main)
git checkout -b feature/logica-inventario

# 3. Primer commit — estructura del proyecto
git add .
git commit -m "feat: estructura inicial del proyecto SaludLogística"

# 4. Commits por cada avance significativo
git commit -m "feat: agrega InventarioModel con datos del inventario y solicitudes"
git commit -m "feat: agrega helpers buscarIndiceLote, estaDisponible y tieneSuficienteStock"
git commit -m "feat: implementa procesarSolicitudes con validación de stock y estado"
git commit -m "feat: agrega generarReportePorPrioridad con contadores manuales"
git commit -m "feat: agrega emitirAlertasCriticas con umbral de 50 unidades"
git commit -m "feat: agrega mostrarEstadoFinal con console.table"
git commit -m "docs: agrega README completo con estructura y documentación"

# 5. Subir la rama al repositorio remoto
git remote add origin https://github.com/TU_USUARIO/saludlogistica.git
git push -u origin feature/logica-inventario

# 6. Crear Pull Request en GitHub: feature/logica-inventario → main
```

### Convención de mensajes de commit

| Prefijo | Uso |
|---|---|
| `feat:` | Agrega una nueva funcionalidad |
| `fix:` | Corrige un error |
| `docs:` | Cambios solo en documentación |
| `refactor:` | Mejora el código sin cambiar funcionalidad |
| `chore:` | Tareas de mantenimiento (gitignore, estructura) |

---

## 👤 Autor

**Nombre:** _Juan Kevin Betancur Sierra_  
**Curso:** Programación Web / Desarrollo de Software  
**Institución:** _Cesde_  
**Año:** 2026

---

> 📌 Ejercicio académico — "Motor Lógico de SaludLogística" | JavaScript ES6 | Arquitectura MVC
