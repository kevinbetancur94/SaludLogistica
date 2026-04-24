# 📖 Explicación Ultra Detallada — SaludLogística
### Para alguien que nunca ha visto código antes

> Léela con los archivos abiertos al lado. Cada sección te dice exactamente
> en qué archivo y en qué línea mirar.

---

## 🧠 Antes de empezar: ¿Qué es un programa?

Un programa es una lista de instrucciones escritas en un idioma que la computadora
entiende. Igual que una receta de cocina: vas paso a paso, en orden, y la computadora
hace exactamente lo que le dices — ni más, ni menos.

JavaScript es uno de esos idiomas. El navegador (Chrome, Edge, Firefox) lo entiende
y lo ejecuta.

---

## 📄 `index.html` — El punto de partida

```html
<script type="module">
  import { ... } from "./src/controllers/SolicitudController.js";
  procesarSolicitudes();
  ...
</script>
```

### ¿Qué es HTML?

HTML es el lenguaje que estructura las páginas web. Usa **etiquetas** que se abren
y se cierran:

```html
<etiqueta> contenido </etiqueta>
```

### ¿Qué es `<script>`?

Es la etiqueta que le dice al navegador: *"lo que está aquí adentro no es texto
para mostrar en pantalla — es código JavaScript que debes ejecutar"*.

### ¿Qué significa `type="module"`?

`type="module"` activa una característica de JavaScript llamada **sistema de módulos**.
Sin esta palabra, el navegador ejecuta el JS pero no entiende la instrucción `import`.

Piénsalo así: es como decirle al navegador *"este script habla el dialecto moderno
de JavaScript, donde los archivos se pueden comunicar entre sí"*.

> ⚠️ Por esto tampoco puedes abrir el archivo con doble clic. Los módulos requieren
> un servidor real (Live Server). Si abres con doble clic el navegador bloquea los
> imports por seguridad.

---

## 📦 ¿Qué es `import` y `export`?

Imagina que tienes tres empleados en una oficina:

- **Ana** tiene los datos del inventario
- **Luis** tiene las herramientas para buscar cosas
- **Carlos** hace el trabajo principal

Para que Carlos pueda usar lo que tiene Ana, Ana tiene que **exportar** sus cosas,
y Carlos tiene que **importar** lo que necesita de Ana.

En código eso se ve así:

### En el archivo de Ana (`InventarioModel.js`):
```js
export const inventario = [ ... ];
```
La palabra `export` significa: *"esto puede salir de este archivo y ser usado por otros"*.

### En el archivo de Carlos (`SolicitudController.js`):
```js
import { inventario } from "../model/InventarioModel.js";
```
La palabra `import` significa: *"trae esto desde ese otro archivo"*.

---

## 🔍 Las llaves `{ }` en el `import` — Importación nombrada

```js
import { inventario, solicitudes, UMBRAL_CRITICO } from "../model/InventarioModel.js";
```

Las llaves `{ }` significan que estás pidiendo cosas **por su nombre exacto**.
Es como pedirle a Ana: *"dame específicamente la carpeta que se llama 'inventario'
y la que se llama 'solicitudes'"*.

Si escribieras un nombre diferente al que fue exportado, no funcionaría:

```js
import { listaDeProductos } from "..."; // ❌ no existe con ese nombre
import { inventario }        from "..."; // ✅ ese nombre sí existe
```

Se llama **importación nombrada** porque importas por el nombre exacto.

---

## 📁 ¿Qué significa la ruta `"../model/InventarioModel.js"`?

La ruta le dice al navegador dónde encontrar el archivo. Se lee así:

```
../model/InventarioModel.js
  │      │
  │      └── entra a la carpeta "model" y busca el archivo "InventarioModel.js"
  └── sube una carpeta (sal de "controllers" y vuelve a "src")
```

Es como dar direcciones: *"sal de donde estás, entra a la carpeta model,
y ahí está el archivo"*.

---

## 📋 ¿Qué es `const`?

`const` es una forma de guardar un valor en la memoria con un nombre.
Es como ponerle una etiqueta a una caja:

```js
const UMBRAL_CRITICO = 50;
```

Esto crea una caja llamada `UMBRAL_CRITICO` que contiene el número `50`.
Cada vez que escribas `UMBRAL_CRITICO` en el código, JavaScript lo reemplaza por `50`.

**¿Por qué MAYÚSCULAS?**
Es una convención (un acuerdo entre programadores): cuando algo está en mayúsculas
significa *"este valor nunca va a cambiar, es una constante fija del sistema"*.
No es obligatorio técnicamente, pero cualquier programador que vea MAYÚSCULAS entiende
que ese valor no debe tocarse.

**¿Por qué `const` y no `let`?**

| `const` | `let` |
|---|---|
| El valor no puede reasignarse | El valor puede cambiar |
| `const x = 5; x = 10;` → ❌ error | `let x = 5; x = 10;` → ✅ ok |

Usa `const` cuando sabes que el valor no va a cambiar.
Usa `let` cuando necesitas una variable que sí va a cambiar (como un contador).

---

## 🗂️ ¿Qué es un arreglo `[ ]`?

Un arreglo es una lista ordenada de cosas. Se escribe con corchetes `[ ]` y cada
elemento se separa con una coma:

```js
const frutas = ["manzana", "pera", "uva"];
```

Cada elemento tiene una **posición** llamada índice. El primero siempre es `0`:

```
frutas[0] → "manzana"
frutas[1] → "pera"
frutas[2] → "uva"
```

> ⚠️ Los arreglos empiezan en `0`, no en `1`. Esto confunde a todo el mundo al principio.
> Un arreglo de 3 elementos tiene posiciones 0, 1 y 2. La posición 3 no existe.

**¿Cómo saber cuántos elementos tiene?**
Con `.length`:
```js
frutas.length → 3
```

---

## 📦 ¿Qué es un objeto `{ }`?

Un objeto es una colección de información relacionada, organizada en pares
**clave: valor**:

```js
{ producto: "Bisturís", cantidad: 30, prioridad: "alta", estado: "disponible" }
```

Cada par es una **propiedad** del objeto. Para acceder a una propiedad se usa
el punto `.`:

```js
const lote = { producto: "Bisturís", cantidad: 30 };
lote.producto  → "Bisturís"
lote.cantidad  → 30
```

En el inventario, cada lote ES un objeto. Y el inventario completo es un
arreglo de objetos:

```js
const inventario = [
  { producto: "Mascarillas N95", cantidad: 500, ... },  // posición 0
  { producto: "Guantes de Látex", cantidad: 1200, ... }, // posición 1
  { producto: "Bisturís", cantidad: 30, ... },           // posición 2
  ...
];
```

Para llegar al producto del tercer lote:
```js
inventario[2].producto → "Bisturís"
//         │  └── propiedad del objeto
//         └── posición en el arreglo
```

---

## 🔁 ¿Qué es un `for`?

Un `for` es una instrucción que repite un bloque de código una cantidad específica
de veces. Es como decirle a alguien: *"revisa cada cajón del mueble, del primero
al último"*.

```js
for (let i = 0; i < inventario.length; i++) {
  // lo que esté aquí se repite en cada vuelta
}
```

El `for` tiene tres partes separadas por `;` dentro del paréntesis:

### Parte 1: `let i = 0`
Crea una variable contadora llamada `i` que empieza en `0`.
Se llama `i` por convención (viene de *index* — índice). Podría llamarse `x` o
`contador` y funcionaría igual, pero `i` es lo que todos los programadores esperan ver.

Se usa `let` aquí (no `const`) porque `i` va a cambiar en cada vuelta: 0, 1, 2, 3...

### Parte 2: `i < inventario.length`
La condición que se evalúa **antes de cada vuelta**.
Si la condición es `true` → entra al bloque y ejecuta el código.
Si la condición es `false` → el `for` termina.

`inventario.length` es el total de elementos. Si hay 7 lotes, `length` es `7`.
La condición `i < 7` significa: mientras `i` sea 0, 1, 2, 3, 4, 5 o 6 → sigue.
Cuando `i` llega a `7` → para. Se usa `<` y no `<=` porque la última posición
válida es `6` (no `7`).

### Parte 3: `i++`
Se ejecuta **al final de cada vuelta**. Suma 1 a `i`.
`i++` es la forma corta de escribir `i = i + 1`.

### Visualizando las vueltas:

```
Vuelta 1: i=0 → inventario[0] → "Mascarillas N95"
Vuelta 2: i=1 → inventario[1] → "Guantes de Látex"
Vuelta 3: i=2 → inventario[2] → "Bisturís"
Vuelta 4: i=3 → inventario[3] → "Analgésicos"
Vuelta 5: i=4 → inventario[4] → "Suero Fisiológico"
Vuelta 6: i=5 → inventario[5] → "Jeringas"
Vuelta 7: i=6 → inventario[6] → "Gasas Estériles"
Vuelta 8: i=7 → 7 < 7 es FALSE → el for termina
```

---

## ❓ ¿Qué es un `if`?

`if` significa *"si"*. Le dice al programa: *"si esta condición es verdadera,
ejecuta este bloque; si no, ignóralo"*.

```js
if (condición) {
  // esto solo se ejecuta si la condición es true
}
```

### `if` / `else if` / `else`

```js
if (lote.prioridad === "alta") {
  totalAlta = totalAlta + lote.cantidad;   // entra aquí si es alta
} else if (lote.prioridad === "media") {
  totalMedia = totalMedia + lote.cantidad; // entra aquí si es media
} else if (lote.prioridad === "baja") {
  totalBaja = totalBaja + lote.cantidad;   // entra aquí si es baja
}
```

Solo entra en **uno** de los bloques. En cuanto una condición es verdadera,
las demás se ignoran.

### `===` vs `==`

```js
"alta" === "alta"  → true   (mismo valor, mismo tipo)
"alta" == "alta"   → true   (también funciona pero es menos seguro)
5 == "5"           → true   (el doble igual los considera iguales ⚠️)
5 === "5"          → false  (el triple igual detecta que uno es número y otro texto ✅)
```

Siempre usa `===`. Es la comparación segura.

### El operador `!` (negación)

`!` invierte un valor booleano:
```js
!true  → false
!false → true
```

En el código se usa así:
```js
if (!estaDisponible(lote)) { ... }
```
`estaDisponible(lote)` devuelve `true` o `false`.
`!estaDisponible(lote)` invierte ese resultado.
Se lee: *"si NO está disponible"*.

---

## 🔧 ¿Qué es una función?

Una función es un bloque de código con nombre que puedes reutilizar.
Es como guardar una receta: la defines una vez y la usas cuando quieras.

```js
function saludar(nombre) {
  console.log("Hola " + nombre);
}

saludar("Kev");   // imprime: Hola Kev
saludar("María"); // imprime: Hola María
```

### Partes de una función:

```js
function buscarIndiceLote(inv, nombreProducto) {
//       │                 └── parámetros (los datos que necesita recibir)
//       └── nombre de la función

  // cuerpo — las instrucciones que ejecuta
  return i; // lo que devuelve
}
```

**Parámetros** son las "entradas" de la función — los datos que le pasas para que trabaje.
**`return`** es la "salida" — el resultado que devuelve.

Cuando llamas la función:
```js
const idx = buscarIndiceLote(inventario, "Bisturís");
//    │                       │           │
//    │                       └── estos valores entran como (inv, nombreProducto)
//    └── aquí se guarda lo que la función devuelve con return
```

---

## 🔍 ¿De dónde sale `idx`?

Esta es la variable que más confusión genera. Vamos paso a paso:

**Paso 1** — Se llama la función:
```js
const idx = buscarIndiceLote(inventario, solicitud.producto);
```

**Paso 2** — La función recorre el inventario buscando el producto. Cuando lo
encuentra, ejecuta `return i` donde `i` es la posición donde estaba.

**Paso 3** — Ese número (la posición) viaja de vuelta y se guarda en `idx`.

```
buscarIndiceLote(inventario, "Bisturís")
  → recorre el arreglo...
  → lo encuentra en la posición 2
  → return 2

const idx = 2   ← idx ahora vale 2
```

**Paso 4** — Con `idx` ya puedes llegar al objeto:
```js
const lote = inventario[idx];
// es lo mismo que:
const lote = inventario[2];
// que es:
const lote = { producto: "Bisturís", cantidad: 30, prioridad: "alta", estado: "disponible" }
```

**¿Por qué devolver `-1` si no lo encuentra?**
`-1` es imposible como índice (no existe la posición -1 en un arreglo).
Entonces sirve como señal de "no encontré nada". En el controlador se detecta:
```js
if (idx === -1) {
  // producto no existe → rechazar
}
```

---

## ⏭️ ¿Qué hace `continue`?

`continue` solo se usa dentro de un `for`. Significa: *"no sigas ejecutando
el resto de este ciclo — salta directamente a la siguiente vuelta"*.

```js
for (let i = 0; i < solicitudes.length; i++) {

  if (idx === -1) {
    console.log("❌ Producto no encontrado");
    continue; // ← salta al siguiente i, ignora todo lo que sigue abajo
  }

  // si hubo continue arriba, estas líneas NO se ejecutan para ese i
  const lote = inventario[idx];
  ...
}
```

Sin `continue` tendríamos que meter todo dentro de `else`, creando niveles
y niveles de llaves anidadas que son difíciles de leer.

---

## 🖥️ ¿Para qué sirve `console.log`?

`console` es un objeto que viene incluido en todos los navegadores.
Tiene métodos para imprimir mensajes en la consola de desarrollador (`F12`).

```js
console.log("texto normal");    // mensaje blanco/negro
console.warn("advertencia");    // mensaje en amarillo ⚠️
console.table(arreglo);         // muestra un arreglo como tabla visual
```

No tiene nada que ver con la página web visible. Es como el "cuaderno de notas"
del programador — los usuarios normales nunca abren `F12`, así que no ven nada.

En este proyecto, TODO el output va a consola porque el enunciado prohíbe
tocar el DOM (la página web visible).

### ¿Qué son las comillas invertidas `` ` `` en algunos `console.log`?

```js
console.log(`✅ APROBADA | ${solicitud.hospital} → ${solicitud.cantidadRequerida} unidades`);
```

Las comillas invertidas (`` ` ``) crean un **template literal** — un texto que
puede tener variables adentro usando `${ }`. Es la forma moderna de armar strings:

```js
const nombre = "Kev";
const edad = 20;

// forma antigua (concatenación con +)
console.log("Hola " + nombre + ", tienes " + edad + " años");

// forma moderna (template literal)
console.log(`Hola ${nombre}, tienes ${edad} años`);

// ambas imprimen: Hola Kev, tienes 20 años
```

---

## 🔄 ¿Qué es `return` y cómo funciona?

`return` hace dos cosas al mismo tiempo:
1. **Devuelve** un valor al lugar donde se llamó la función
2. **Termina** la función inmediatamente — ninguna línea después del `return` se ejecuta

```js
function ejemplo() {
  return 42;
  console.log("esto nunca se ejecuta"); // línea muerta — return ya salió
}
```

En `buscarIndiceLote`:
```js
if (inv[i].producto === nombreProducto) {
  return i; // ← encontró el producto, devuelve la posición y termina
}
// si no encontró nada en ninguna vuelta:
return -1; // ← devuelve -1
```

---

## 🧩 ¿Por qué separar en tres archivos JS?

Podrías poner todo en un solo archivo y funcionaría. Pero hacerlo en tres archivos
tiene ventajas reales:

| Un solo archivo | Tres archivos separados |
|---|---|
| Difícil de leer cuando crece | Cada archivo tiene una responsabilidad clara |
| Un error puede romper todo | Un error está aislado en su archivo |
| Difícil de reutilizar partes | `helpers.js` se puede usar en cualquier proyecto |
| Difícil de trabajar en equipo | Cada persona trabaja en su archivo sin pisar al otro |

Además el enunciado lo exige. Pero en proyectos reales siempre se hace así.

---

## 📊 ¿Qué hace `console.table`?

```js
console.table(inventario);
```

Recibe un arreglo de objetos y lo muestra como una tabla visual en la consola.
En vez de ver esto:

```
[{producto: "Mascarillas N95", cantidad: 500...}, {producto: "Guantes"...}]
```

Ves esto:

```
┌─────────────────────────┬──────────┬───────────┬─────────────┐
│ producto                │ cantidad │ prioridad │ estado      │
├─────────────────────────┼──────────┼───────────┼─────────────┤
│ Mascarillas N95         │ 350      │ alta      │ en tránsito │
│ Guantes de Látex        │ 1200     │ media     │ disponible  │
│ Bisturís                │ 30       │ alta      │ disponible  │
└─────────────────────────┴──────────┴───────────┴─────────────┘
```

Mucho más legible, especialmente cuando el inventario tiene muchos productos.

---

## 🏁 Flujo completo de ejecución — todo conectado

```
1. El navegador carga index.html
   └── encuentra <script type="module">
       └── importa las 4 funciones de SolicitudController.js
           └── SolicitudController importa de InventarioModel.js  (los datos)
           └── SolicitudController importa de helpers.js          (las herramientas)

2. Se ejecuta procesarSolicitudes()
   └── for: recorre cada solicitud (4 en total)
       └── vuelta 1: "Bisturís" para Hospital Central (40 unidades)
           ├── buscarIndiceLote → encuentra "Bisturís" en posición 2 → idx = 2
           ├── lote = inventario[2] → { producto: "Bisturís", cantidad: 30, ... }
           ├── estaDisponible(lote) → true ✅
           ├── tieneSuficienteStock(lote, 40) → 30 >= 40 → false ❌
           └── console.log "⚠️ INSUFICIENTE"
       └── vuelta 2: "Mascarillas N95" para Clínica San José (150 unidades)
           ├── buscarIndiceLote → posición 0 → idx = 0
           ├── lote = inventario[0] → { cantidad: 500, estado: "disponible", ... }
           ├── estaDisponible → true ✅
           ├── tieneSuficienteStock(lote, 150) → 500 >= 150 → true ✅
           ├── lote.cantidad = 500 - 150 = 350
           ├── lote.estado = "en tránsito"
           └── console.log "✅ APROBADA"
       └── ... y así con cada solicitud

3. Se ejecuta generarReportePorPrioridad()
   └── for: recorre el inventario ya modificado
       └── suma cantidades por prioridad en 3 contadores
       └── console.log de los 3 totales

4. Se ejecuta emitirAlertasCriticas()
   └── for: busca productos con cantidad < 50
       └── console.warn por cada uno que cumpla

5. Se ejecuta mostrarEstadoFinal()
   └── console.table del inventario completo y actualizado
```

---

## 📌 Glosario rápido

| Término | Qué es |
|---|---|
| `const` | Caja con nombre cuyo contenido no se puede reasignar |
| `let` | Caja con nombre cuyo contenido sí puede cambiar |
| `[ ]` | Arreglo — lista ordenada de elementos |
| `{ }` | Objeto — colección de pares clave:valor |
| `for` | Ciclo que repite código un número determinado de veces |
| `if` | Condición — ejecuta código solo si algo es verdadero |
| `===` | Comparación estricta de valor y tipo |
| `!` | Negación — invierte true a false y viceversa |
| `i++` | Suma 1 a la variable i |
| `.length` | Propiedad que dice cuántos elementos tiene un arreglo |
| `function` | Define un bloque de código reutilizable con nombre |
| `return` | Devuelve un valor y termina la función |
| `continue` | Dentro de un for: salta al siguiente ciclo |
| `export` | Permite que otros archivos usen este dato o función |
| `import` | Trae datos o funciones desde otro archivo |
| `console.log` | Imprime un mensaje en la consola del navegador |
| `console.warn` | Imprime un mensaje de advertencia en amarillo |
| `console.table` | Muestra un arreglo de objetos como tabla visual |
| Template literal | Texto con variables adentro usando backticks y `${ }` |
| `idx` | Abreviación de "index" — la posición de algo en un arreglo |
| `-1` | Señal de "no encontrado" — posición imposible en un arreglo |
| MVC | Patrón de organización: Model (datos), View (pantalla), Controller (lógica) |
| ES6 | Versión moderna de JavaScript (2015) que incluye import/export, const, let, etc. |

---

*Guía de comprensión profunda — SaludLogística | Para estudiantes de primer semestre*
