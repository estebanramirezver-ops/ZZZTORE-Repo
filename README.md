# Tienda Zenless Zone Zero — Arquitectura por Capas

Proyecto educativo para la evidencia de **Arquitectura por Capas en JavaScript** del SENA. Consiste en una API REST sencilla para consultar y registrar productos de una tienda temática de Zenless Zone Zero.

La solución separa el sistema en cuatro capas: **Routes → Controllers → Services → Repositories**,

> Este README describe el proyecto entregable y también deja preparado un reparto sencillo para tres ramas de trabajo.

## Requisitos del taller cubiertos

- `GET /productos` para listar productos.
- `POST /productos` para registrar productos.
- `GET /productos/:id` como consulta adicional.
- Validación de `nombre` obligatorio.
- Validación de `precio` mayor que cero.
- Separación real entre Routes, Controllers, Services y Repositories.
- Manejo básico de errores y respuestas HTTP comprensibles.
- README con instalación, ejecución y estructura.
- `.gitignore` para `node_modules`, `.env` y archivos temporales.
- Código modular y preparado para explicar el recorrido de una petición.
- Historial Git progresivo conservado en el repositorio original.

## Arquitectura

```text
Cliente HTTP
    │
    ▼
Routes
    │  define URL y método
    ▼
Controllers
    │  recibe req/res y construye la respuesta
    ▼
Services
    │  validaciones y reglas de negocio
    ▼
Repositories
       acceso a datos
```

### Responsabilidades

| Capa | Hace | No debería hacer |
|---|---|---|
| Routes | Define endpoints y conecta controladores | Validaciones de negocio o acceso a datos |
| Controllers | Recibe `req/res`, llama al service y responde | Reglas de negocio complejas |
| Services | Valida y aplica reglas de negocio | Depender de Express (`req/res`) |
| Repositories | Consulta y modifica datos | Decidir reglas de negocio |

## Estructura del proyecto

```text
arquitectura-capas/
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── src/
    ├── app.js
    ├── controllers/
    │   ├── producto.controller.js
    │   └── usuario.controller.js
    ├── repositories/
    │   ├── producto.repository.js
    │   └── usuario.repository.js
    ├── routes/
    │   ├── producto.routes.js
    │   └── usuario.routes.js
    └── services/
        ├── producto.service.js
        └── usuario.service.js
```

El módulo `usuarios` se conserva como ejemplo secundario; la evidencia principal del reto es el módulo `productos`.

## Instalación

Requiere Node.js y npm.

```bash
npm install
```

## Ejecución

Desarrollo:

```bash
npm run dev
```

Producción/local:

```bash
npm start
```

El puerto por defecto es `3000`. También puede cambiarse con la variable `PORT`.

```bash
PORT=4000 npm start
```

## Endpoints

### Productos

| Método | Endpoint | Resultado |
|---|---|---|
| GET | `/productos` | Lista todos los productos |
| GET | `/productos/:id` | Consulta un producto por ID |
| POST | `/productos` | Registra un producto |

### Usuarios

| Método | Endpoint | Resultado |
|---|---|---|
| GET | `/usuarios` | Lista usuarios de ejemplo |

### Ruta de estado

| Método | Endpoint | Resultado |
|---|---|---|
| GET | `/` | Confirma que la API está funcionando |

## Ejemplo: GET /productos

```bash
curl http://localhost:3000/productos
```

La respuesta contiene `success`, `data` y `total`.

## Ejemplo: POST /productos

```bash
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Nuevo Agent",
    "categoria": "Agent",
    "subcategoria": "Fuego / Ataque",
    "rareza": "A",
    "precio": 1500,
    "descripcion": "Descripción de ejemplo",
    "imagen": "https://ejemplo.com/imagen.png"
  }'
```

### Validaciones de producto

| Campo | Regla |
|---|---|
| `nombre` | Obligatorio, entre 2 y 100 caracteres |
| `categoria` | Debe ser una categoría válida |
| `subcategoria` | Obligatoria y relacionada con la categoría |
| `rareza` | Debe ser una rareza válida |
| `precio` | Obligatorio, numérico, mayor que 0 y máximo 100000 |
| `descripcion` | Opcional, máximo 500 caracteres |
| `imagen` | Opcional; si se envía debe ser una URL HTTP/HTTPS válida |

## Manejo de errores

La API responde en JSON para los casos principales:

- `400`: datos inválidos, ID inválido o JSON mal formado.
- `404`: producto o ruta no encontrada.
- `500`: error interno no previsto.

Ejemplo de JSON mal formado:

```json
{
  "success": false,
  "error": "JSON inválido",
  "mensaje": "El cuerpo de la petición no contiene un JSON válido"
}
```

Esto evita devolver la página HTML por defecto de Express para ese caso.

## Flujo que debes poder explicar en la sustentación

Para `POST /productos`:

```text
POST /productos
      ↓
producto.routes.js
      ↓
postProducto()
      ↓
producto.service.js
      ↓
validarProducto() + registrarProducto()
      ↓
producto.repository.js
      ↓
crear()
      ↓
Respuesta HTTP 201
```

La regla de diseño es que cada capa haga solamente lo que le corresponde.

## Datos

El repositorio usa un **array en memoria** como almacenamiento de demostración. Por eso, los productos creados durante la ejecución se pierden al reiniciar el servidor. Cambiar a una base de datos real debería afectar principalmente al repository, manteniendo las reglas de negocio en Service.

## Pruebas manuales

```bash
# Lista productos
curl http://localhost:3000/productos

# Consulta existente
curl http://localhost:3000/productos/1

# Producto inexistente -> 404
curl http://localhost:3000/productos/999

# ID inválido -> 400
curl http://localhost:3000/productos/abc

# Producto válido -> 201
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test Agent","categoria":"Agent","subcategoria":"Fuego / Ataque","rareza":"A","precio":1500}'

# Producto inválido -> 400
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"","precio":-100}'

# JSON mal formado -> 400 JSON
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":'
```

## Reparto manual en 3 carpetas / 3 ramas

La estructura está organizada para que el proyecto pueda repartirse sin mezclar responsabilidades.

### Carpeta/Rama 1 — Base y datos

**Responsable sugerido: tú**

```text
.gitignore
package.json
package-lock.json
README.md
src/app.js
src/repositories/
```

Responsabilidad: configuración inicial, almacenamiento y conexión general del servidor.

### Carpeta/Rama 2 — Lógica de negocio

**Responsable sugerido: compañero 1**

```text
src/services/
```

Responsabilidad: validaciones, reglas de negocio y preparación de datos.

### Carpeta/Rama 3 — HTTP

**Responsable sugerido: compañero 2**

```text
src/controllers/
src/routes/
```

Responsabilidad: endpoints, entrada/salida HTTP y códigos de respuesta.

> Importante: en Git las ramas deben construirse a partir de una base común o integrarse en `main`. No conviene convertir las tres ramas en tres proyectos completamente independientes, porque Routes y Controllers dependen de Services y Repositories. Esta división es por **responsabilidad y contribución**, no para duplicar código.

### Nombres de ramas sugeridos

```bash
git checkout -b feature/base-repositorios
git checkout -b feature/productos-services
git checkout -b feature/productos-http
```

Para sustentar el proceso, conserva commits pequeños y descriptivos, por ejemplo:

```text
chore: preparar estructura base
feat: implementar repositorio de productos
feat: agregar validaciones del servicio de productos
feat: conectar controlador y rutas de productos
fix: manejar JSON inválido y rutas inexistentes
docs: actualizar README
```

## Presentación y sustentación

Debes poder responder:

1. ¿Por qué la validación está en Service y no en Controller?
2. ¿Qué capa se comunica con los datos y por qué?
3. ¿Cuál es el recorrido completo de `POST /productos`?
4. ¿Qué problema habría si toda la lógica estuviera en `app.js`?
5. ¿Qué commits muestran el proceso de construcción?
6. Si agregamos una regla de descuento, ¿en qué capa la implementarías?

## Estado final

El proyecto queda enfocado en demostrar la arquitectura solicitada: las rutas definen endpoints, los controladores manejan HTTP, los servicios contienen las reglas y los repositorios encapsulan los datos. La separación física de estas carpetas también facilita repartir el trabajo entre tres ramas sin romper la arquitectura.

## Tecnologías

- JavaScript (ES Modules)
- Node.js
- Express
- nodemon

Proyecto educativo — SENA Desarrollo de Software.

## Frontend

Se agregó una interfaz web para el catálogo de Zenless Zone Zero en `public/`.

- `public/index.html`: estructura del sitio, navegación, hero/banner, filtros, catálogo, modal de detalles y formulario.
- `public/styles.css`: diseño responsive inspirado en la estética de New Eridu.
- `public/app.js`: consume `GET /productos`, permite buscar/filtrar, favoritos, ver detalles y crear productos con `POST /productos`.
- `src/app.js`: ahora sirve el frontend desde `/` y los archivos estáticos de `public/`.

### Ejecutar

```bash
npm install
npm start
```

Luego abre `http://localhost:3000`.

Las imágenes de los seis Agents presentes en el catálogo (Anby, Nicole, Billy, Nekomata, Lycaon y Ellen) usan URLs de artwork oficial encontradas y verificadas a través de un catálogo público que referencia recursos CDN de HoYoverse. El frontend también tiene fallback visual para cualquier producto cuyo recurso externo no esté disponible.
