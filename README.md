# Sistema Zegel API Backend

Esta es una API de backend para el sistema Zegel, construida con Node.js, Express, TypeScript y TypeORM. La API maneja la autenticación de usuarios (login/registro con JWT) y provee un CRUD completo (Crear, Leer, Actualizar, Eliminar) para productos.

## 🛠️ Tecnologías Utilizadas

-   **Node.js**: Entorno de ejecución de JavaScript.
-   **TypeScript**: Un superconjunto de JavaScript que añade tipado estático.
-   **Express**: Un framework web minimalista para Node.js.
-   **TypeORM**: Un ORM que se integra con Node.js y bases de datos PostgreSQL.
-   **PostgreSQL**: Un sistema de gestión de bases de datos relacionales robusto.
-   **Bcrypt.js**: Una librería para el cifrado de contraseñas.
-   **JSON Web Tokens (JWT)**: Para la autenticación de usuarios y la seguridad de las rutas.
-   **TSX**: Una herramienta para ejecutar archivos de TypeScript directamente.

---

## 📁 Estructura del Proyecto

El proyecto está organizado en capas lógicas para asegurar un código limpio, escalable y fácil de mantener, siguiendo los principios de la **Arquitectura Limpia**.
.
└── src/
├── config/           # Archivos de configuración de la base de datos
│   └── database.ts
│
├── controllers/      # Lógica de negocio para manejar peticiones HTTP
│   └── auth.controller.ts
│   └── productos.controller.ts
│
├── entities/         # Modelos de TypeORM que representan las tablas
│   └── Usuario.ts
│   └── Producto.ts
│
├── middlewares/      # Funciones middleware reutilizables (autenticación)
│   └── auth.middleware.ts
│
├── routes/           # Definición de las rutas de la API
│   └── index.ts
│
└── server.ts         # Punto de entrada de la aplicación
---

## ⚙️ Primeros Pasos

Sigue estos pasos para configurar el proyecto en tu entorno local.

### Prerrequisitos

-   **Node.js**: Asegúrate de tener Node.js instalado.
-   **PostgreSQL**: Debes tener una instancia de PostgreSQL en funcionamiento.

### Instalación

1.  Clona el repositorio.
    ```bash
    git clone [https://github.com/tu-usuario/tu-repo.git](https://github.com/tu-usuario/tu-repo.git)
    cd tu-repo
    ```
2.  Instala las dependencias del proyecto.
    ```bash
    npm install
    ```

### Configuración de la Base de Datos

1.  **Crea la base de datos y las tablas:** Conéctate a tu base de datos PostgreSQL y ejecuta el siguiente script para crear las tablas `usuarios` y `productos`, e insertar datos de ejemplo.

    ```sql
    CREATE TABLE usuarios (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    -- La contraseña encriptada para "tu_contraseña_segura"
    INSERT INTO usuarios (email, password) VALUES
    ('usuario1@email.com', '$2a$10$wN35g.wN.i4.mOQ1O.g.G.y8yS35g.wN.i4.mOQ1O.g.G.y8yS35g.wN.i4.mOQ1O.g.G.y8yS35g.wN'),
    ('usuario2@email.com', '$2a$10$wN35g.wN.i4.mOQ1O.g.G.y8yS35g.wN.i4.mOQ1O.g.G.y8yS35g.wN.i4.mOQ1O.g.G.y8yS35g.wN'),
    ('usuario3@email.com', '$2a$10$wN35g.wN.i4.mOQ1O.g.G.y8yS35g.wN.i4.mOQ1O.g.G.y8yS35g.wN.i4.mOQ1O.g.G.y8yS35g.wN'),
    ('usuario4@email.com', '$2a$10$wN35g.wN.i4.mOQ1O.g.G.y8yS35g.wN.i4.mOQ1O.g.G.y8yS35g.wN.i4.mOQ1O.g.G.y8yS35g.wN'),
    ('usuario5@email.com', '$2a$10$wN35g.wN.i4.mOQ1O.g.G.y8yS35g.wN.i4.mOQ1O.g.G.y8yS35g.wN.i4.mOQ1O.g.G.y8yS35g.wN');

    CREATE TABLE productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT,
        cantidad INTEGER NOT NULL
    );

    INSERT INTO productos (nombre, descripcion, cantidad) VALUES
    ('Laptop', 'Laptop de última generación con procesador de alto rendimiento.', 50),
    ('Smartphone', 'Teléfono móvil inteligente con cámara de 108 MP.', 120),
    ('Auriculares', 'Auriculares inalámbricos con cancelación de ruido.', 200),
    ('Teclado Mecánico', 'Teclado para gamers con switches RGB.', 75),
    ('Mouse Ergonómico', 'Mouse diseñado para la comodidad durante largas horas de uso.', 150),
    ('Monitor Curvo', 'Monitor de 27 pulgadas con alta tasa de refresco.', 45),
    ('Webcam Full HD', 'Cámara web de alta definición para videollamadas.', 90),
    ('Disco Duro SSD', 'Unidad de estado sólido de 1TB para almacenamiento rápido.', 180),
    ('Router WiFi 6', 'Router de alta velocidad para redes domésticas.', 60),
    ('Power Bank', 'Batería portátil de 20000 mAh para cargar dispositivos.', 250);
    ```

2.  **Credenciales**: Abre `src/config/database.ts` y actualiza las credenciales de la base de datos según tu configuración local.

    ```typescript
    // src/config/database.ts
    // ...
    username: "postgres",
    password: "tu_contraseña_de_postgres", // Actualiza con tu contraseña
    database: "tu_base_de_datos",       // Actualiza con el nombre de tu base de datos
    // ...
    ```

### Ejecutar el Proyecto

Para iniciar el servidor de desarrollo, ejecuta el siguiente comando. El servidor se reiniciará automáticamente al guardar cambios en los archivos.

```bash
npm run dev
El servidor estará disponible en http://localhost:3000.
🚀 Puntos de Acceso (Endpoints) de la API
La API está dividida en rutas públicas y rutas protegidas.

Autenticación (Rutas Públicas)
POST /api/register: Crea un nuevo usuario.

POST /api/login: Autentica a un usuario y devuelve un JWT. Este token es necesario para acceder a todas las demás rutas protegidas.

Productos (Rutas Protegidas)
Estas rutas requieren un JWT válido en el encabezado Authorization.

Ejemplo de Encabezado:
Authorization: Bearer <tu_token_aqui>

GET /api/productos: Recupera todos los productos.

POST /api/productos: Crea un nuevo producto.

PUT /api/productos/:id: Actualiza un producto por su ID.

DELETE /api/productos/:id: Elimina un producto por su ID.

🤝 Contribuciones
Siéntete libre de abrir issues o enviar pull requests. Todas las contribuciones son bienvenidas.

📄 Licencia
Este proyecto está bajo la Licencia ISC.
