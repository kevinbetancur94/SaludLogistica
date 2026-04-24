# 📖 Guía de Comprensión — SaludLogística

> Léela con el código abierto al lado. Cada sección corresponde a un archivo o función específica.

---

## 🗂️ Primero: ¿Por qué la estructura MVC?

El proyecto está dividido en tres capas llamadas **MVC** (Model - View - Controller).
En este ejercicio no hay "View" visual porque todo va a consola, pero la idea se mantiene:

| Carpeta | Rol | Archivo |
|---|---|---|
| `model/` | **Guarda los datos** — no hace nada, solo los tiene | `InventarioModel.js` |
| `utils/` | **Herramientas reutilizables** — funciones sin lógica de negocio | `helpers.js` |
| `controllers/` | **Hace el trabajo** — importa datos y helpers, ejecuta la lógica | `SolicitudController.js` |

### ¿Por qué separar así y no poner todo en un archivo?

Porque el enunciado lo exige (mínimo 2 archivos JS con ES6 modules), pero también porque
es la forma correcta de programar: cada archivo tiene una **sola responsabilidad**.
Si mañana cambian los datos, solo tocas `InventarioModel.js`.
Si mañana cambia la lógica, solo tocas `SolicitudController.js`.

---

## 📁 Archivo 1: `InventarioModel.js`

```
src/model/InventarioModel.js
```

### ¿Qué hace?

Declara los tres bloques de datos que todo el sistema necesita y los **exporta**.

### La palabra clave `export`

```js
export const inventario = [ ... ];
export const solicitudes = [ ... ];
export const UMBRAL_CRITICO = 50;
```

`export` significa: *"este dato puede ser usado por otros archivos"*.
Sin `export`, el dato existe pero está encerrado, nadie más lo puede ver.

### ¿Por qué `UMBRAL_CRITICO` en MAYÚSCULAS?

Es una convención universal en programación: las constantes que nunca van a cambiar
y representan una configuración del sistema se escriben en MAYÚSCULAS con guiones bajos.
No es obligatorio técnicamente, pero le dice a cualquier programador que lea el código:
*"este valor es fijo, no lo toques"*.

### Estructura de cada objeto en `inventario`

```js
{ producto: "Mascarillas N95", cantidad: 500, prioridad: "alta", estado: "disponible" }
```

Cada lote es un **objeto literal** (pares clave-valor). El enunciado prohíbe usar
clases o constructores (`new Objeto()`), así que esta es la única forma permitida.
Un objeto literal simplemente es: `{ clave: valor, clave: valor }`.

---

## 📁 Archivo 2: `helpers.js`

```
src/utils/helpers.js
```

### ¿Qué hace?

Define **tres funciones auxiliares** que el controlador va a usar.
Ninguna de estas funciones tiene idea de qué es "SaludLogística" ni del negocio;
solo reciben datos, hacen una operación simple, y devuelven un resultado.

---

### Función 1: `buscarIndiceLote`

```js
export function buscarIndiceLote(inv, nombreProducto) {
  for (let i = 0; i < inv.length; i++) {
    if (inv[i].producto === nombreProducto) {
      return i;
    }
  }
  return -1;
}
```

#### ¿Por qué existe esta función?

Necesitamos encontrar un producto en el arreglo `inventario` dado su nombre.
El enunciado **prohíbe usar métodos nativos** como `.find()` o `.findIndex()`,
así que tenemos que hacerlo a mano.

#### ¿Por qué devuelve el ÍNDICE y no el objeto directamente?

Esta es la decisión más importante del proyecto. Mira lo que necesitamos hacer
cuando aprobamos una solicitud:

```js
lote.cantidad = lote.cantidad - solicitud.cantidadRequerida;
lote.estado   = "en tránsito";
```

Estamos **modificando** el lote original. Para eso necesitamos acceder al arreglo
con su posición: `inventario[idx].cantidad = ...`

Si hubiéramos devuelto una copia del objeto (`return inv[i]`), estaríamos modificando
la copia, no el original. El inventario nunca se actualizaría.
Devolver el índice nos da el "mapa" para llegar al dato real.

#### ¿Por qué devuelve `-1` si no encuentra nada?

`-1` es un valor imposible como índice (los índices empiezan en 0),
así que es una señal clara de "no encontré nada". Es la misma convención que usa
`.indexOf()` en JavaScript nativo. En el controlador lo chequeamos así:

```js
if (idx === -1) { // no existe en el inventario → rechazar }
```

#### El `for` manual — ¿por qué no `forEach`?

El enunciado prohíbe todos los métodos nativos de arreglos.
`forEach`, `map`, `find`, `filter`, `reduce` están todos prohibidos.
El único mecanismo permitido es el `for` clásico con índice:

```js
for (let i = 0; i < inv.length; i++) {
  // inv[i] es el elemento en la posición i
}
```

`inv.length` nos da el total de elementos. El `for` empieza en 0 (primer elemento)
y va hasta `length - 1` (último elemento). La condición `i < inv.length` (no `<=`)
es porque si el arreglo tiene 7 elementos, el último índice es 6, no 7.

---

### Función 2: `estaDisponible`

```js
export function estaDisponible(lote) {
  return lote.estado === "disponible";
}
```

Recibe un lote y devuelve `true` o `false` según si su estado es `"disponible"`.

#### ¿Por qué no escribir esto directo en el controlador?

Podríamos haber puesto `if (lote.estado === "disponible")` directamente.
Pero si en el futuro agregan más estados (ej. "reservado"), solo tocamos esta función.
Además, en el controlador queda más legible: `if (!estaDisponible(lote))` dice
exactamente lo que significa en español.

---

### Función 3: `tieneSuficienteStock`

```js
export function tieneSuficienteStock(lote, cantidadRequerida) {
  return lote.cantidad >= cantidadRequerida;
}
```

Compara si el lote tiene igual o más unidades de las que pide el hospital.
Mismo razonamiento: es más legible en el controlador y fácil de cambiar si la
lógica de stock evoluciona.

---

## 📁 Archivo 3: `SolicitudController.js`

```
src/controllers/SolicitudController.js
```

### ¿Qué hace?

Es el **corazón del sistema**. Importa todo lo que necesita y define las 4 funciones
que generan los reportes en consola. No tiene datos propios, los pide prestados.

### El `import`

```js
import { inventario, solicitudes, UMBRAL_CRITICO } from "../model/InventarioModel.js";
import { buscarIndiceLote, estaDisponible, tieneSuficienteStock } from "../utils/helpers.js";
```

`import { nombre }` trae exactamente lo que necesita del otro archivo.
Las llaves `{ }` significan que estamos importando exportaciones **nombradas**
(no una exportación por defecto). La ruta `"../model/..."` significa:
*"sube una carpeta (de controllers a src) y entra a model"*.

---

### Función 1: `procesarSolicitudes()`

Esta es la función más compleja. Recorre cada solicitud y evalúa 4 casos en orden:

```js
for (let i = 0; i < solicitudes.length; i++) {
  const solicitud = solicitudes[i];
  ...
}
```

Igual que en helpers, `for` manual porque `forEach` está prohibido.
`const solicitud = solicitudes[i]` es solo un alias para no escribir
`solicitudes[i]` todo el tiempo — más legible.

#### Los 4 casos (y por qué en ese orden)

**Caso 1 — El producto no existe:**
```js
const idx = buscarIndiceLote(inventario, solicitud.producto);
if (idx === -1) {
  console.log("❌ RECHAZADA...");
  continue; // salta al siguiente ciclo del for
}
```
Primero verificamos que el producto exista. Si no existe, no tiene sentido
seguir chequeando nada más. `continue` le dice al `for`: *"no sigas con este
elemento, pasa al siguiente"*.

**Caso 2 — Existe pero no está disponible:**
```js
const lote = inventario[idx];
if (!estaDisponible(lote)) { ... continue; }
```
Ya sabemos que existe (`idx !== -1`), entonces `inventario[idx]` nos da el objeto.
El `!` invierte el resultado de `estaDisponible`: si NO está disponible, rechaza.

**Caso 3 — Disponible pero stock insuficiente:**
```js
if (!tieneSuficienteStock(lote, solicitud.cantidadRequerida)) { ... continue; }
```
Ya pasó los dos filtros anteriores. Ahora verificamos si hay suficientes unidades.

**Caso 4 — Todo en orden, se aprueba:**
```js
lote.cantidad = lote.cantidad - solicitud.cantidadRequerida;
lote.estado   = "en tránsito";
console.log("✅ APROBADA...");
```
Si llegó hasta aquí sin ningún `continue`, significa que pasó todos los filtros.
Descontamos las unidades y cambiamos el estado.

> **Nota importante:** `lote` no es una copia — es una referencia al objeto
> dentro del arreglo `inventario`. Por eso cuando modificamos `lote.cantidad`,
> estamos modificando el inventario real. Esto es lo que hace poderoso haber
> devuelto el índice en `buscarIndiceLote`.

---

### Función 2: `generarReportePorPrioridad()`

```js
let totalAlta  = 0;
let totalMedia = 0;
let totalBaja  = 0;

for (let i = 0; i < inventario.length; i++) {
  const lote = inventario[i];
  if (lote.prioridad === "alta")       { totalAlta  = totalAlta  + lote.cantidad; }
  else if (lote.prioridad === "media") { totalMedia = totalMedia + lote.cantidad; }
  else if (lote.prioridad === "baja")  { totalBaja  = totalBaja  + lote.cantidad; }
}
```

#### ¿Por qué tres variables contadoras y no un objeto?

Podríamos haber usado `{ alta: 0, media: 0, baja: 0 }` y actualizar por clave.
Pero para eso necesitaríamos `Object.keys()` u otras formas que el enunciado prohíbe.
Tres variables simples cumple el mismo objetivo sin violar ninguna restricción.

#### ¿Por qué `else if` y no tres `if` separados?

Con `else if`, una vez que entra en una rama, no evalúa las otras.
Con tres `if` separados, JavaScript evaluaría las tres condiciones aunque
ya hubiera entrado en la primera. `else if` es más eficiente.

---

### Función 3: `emitirAlertasCriticas()`

```js
let hayAlertas = false;

for (let i = 0; i < inventario.length; i++) {
  if (inventario[i].cantidad < UMBRAL_CRITICO) {
    console.warn(`🚨 ALERTA | ...`);
    hayAlertas = true;
  }
}

if (!hayAlertas) {
  console.log("✅ Sin alertas...");
}
```

#### La variable `hayAlertas`

Necesitamos saber al final si se emitió alguna alerta, para mostrar el mensaje
"sin alertas" en caso contrario. La variable empieza en `false` y se vuelve `true`
en cuanto encuentra el primer producto crítico. Es el patrón clásico de "bandera" o "flag".

#### `console.warn` vs `console.log`

`console.warn` muestra el mensaje en **amarillo** en la consola del navegador,
lo que visualmente diferencia las alertas de los mensajes normales.
Ambos van a la consola, ninguno toca el DOM.

---

### Función 4: `mostrarEstadoFinal()`

```js
console.table(inventario);
```

`console.table` recibe un arreglo de objetos y lo muestra como una tabla
bien formateada en la consola. Es un método de consola válido — el enunciado
solo prohíbe manipular el DOM (el HTML de la página). La consola es libre.

---

## 📁 Archivo 4: `index.html`

```html
<script type="module">
  import { procesarSolicitudes, ... } from "./src/controllers/SolicitudController.js";
  procesarSolicitudes();
  generarReportePorPrioridad();
  emitirAlertasCriticas();
  mostrarEstadoFinal();
</script>
```

### ¿Por qué `type="module"`?

Sin `type="module"`, el navegador no entiende `import` / `export`.
Es la forma de decirle: *"este script usa el sistema de módulos de ES6"*.

### ¿Por qué NO funciona con doble clic en el archivo?

Los módulos ES6 en el navegador requieren un servidor HTTP real por motivos de seguridad.
Si abres el archivo directo (`file:///...`), el navegador bloquea los imports.
Por eso se necesita **Live Server** (VS Code) o cualquier servidor local.

### ¿Por qué las funciones están separadas y no en una sola?

Para que cada función tenga **una sola responsabilidad**. Si algo falla en el reporte
de prioridad, sabes exactamente dónde buscar. Si en el futuro solo quieres usar
una parte del sistema, puedes importar solo esa función.

---

## 🔄 Flujo completo de ejecución

```
index.html carga
    └── importa SolicitudController.js
            └── importa InventarioModel.js  (datos)
            └── importa helpers.js          (herramientas)

Se ejecuta en orden:
    1. procesarSolicitudes()
       └── por cada solicitud:
           → busca el lote en inventario (buscarIndiceLote)
           → verifica disponibilidad    (estaDisponible)
           → verifica stock             (tieneSuficienteStock)
           → aprueba o rechaza → modifica inventario si aprueba

    2. generarReportePorPrioridad()
       └── suma cantidades por prioridad con 3 contadores

    3. emitirAlertasCriticas()
       └── busca productos con cantidad < 50

    4. mostrarEstadoFinal()
       └── console.table del inventario ya actualizado
```

---

## ⚠️ Restricciones y cómo se cumplieron

| Restricción | ¿Cómo se cumplió? |
|---|---|
| Sin DOM | Todo va a `console.log` / `console.warn` / `console.table` |
| Sin métodos de arreglos | Todos los recorridos usan `for (let i = 0; i < arr.length; i++)` |
| Solo objetos literales | Todos los datos son `{ clave: valor }`, sin `class` ni `new` |
| Solo navegador | `index.html` + `type="module"`, no hay Node.js |
| 100% síncrono | No hay `async`, `await`, `fetch`, `Promise` ni `setTimeout` |
| Mínimo 2 archivos JS | `InventarioModel.js`, `helpers.js`, `SolicitudController.js` (3 archivos) |

---

*Guía generada para el ejercicio "Motor Lógico de SaludLogística" — Programación Web*
