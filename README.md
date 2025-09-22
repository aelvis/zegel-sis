# Sistema Zegel (Full Stack)

Esta es una aplicación full-stack para el sistema Zegel. El proyecto incluye:

-   **Backend API**: Construida con Node.js, Express, TypeScript y TypeORM. Maneja la autenticación de usuarios (JWT) y un CRUD completo para productos.
-   **Frontend**: Una aplicación cliente para interactuar con la API.

## 🛠️ Tecnologías Utilizadas

### Backend
-   **Node.js**: Entorno de ejecución de JavaScript.
-   **TypeScript**: Un superconjunto de JavaScript que añade tipado estático.
-   **Express**: Un framework web minimalista para Node.js.
-   **TypeORM**: Un ORM que se integra con Node.js y bases de datos PostgreSQL.
-   **PostgreSQL**: Un sistema de gestión de bases de datos relacionales robusto.
-   **Bcrypt.js**: Una librería para el cifrado de contraseñas.
-   **JSON Web Tokens (JWT)**: Para la autenticación de usuarios y la seguridad de las rutas.
-   **TSX**: Una herramienta para ejecutar archivos de TypeScript directamente.

### Frontend
-   **[Framework de Frontend]**: (React)
-   **[Librerías adicionales]**: (material,recharts)

---

### 📁 Estructura del Proyecto

El proyecto está organizado en dos carpetas principales, `backend/` y `frontend/`.

-   `backend/`: Contiene todo el código de la API del servidor.
    -   `src/`
        -   `config/`: Archivos de configuración (conexión a la base de datos, etc.).
        -   `controllers/`: Maneja las peticiones HTTP y el flujo de la lógica de negocio.
        -   `entities/`: Modelos de TypeORM que representan las tablas de la base de datos.
        -   `middlewares/`: Funciones middleware reutilizables para el manejo de peticiones.
        -   `routes/`: Define los puntos de acceso de la API y los enlaza con los controladores.
        -   `server.ts`: El punto de entrada principal de la aplicación.
-   `frontend/`: Contiene todo el código de la aplicación cliente.


## ⚙️ Primeros Pasos

Sigue estos pasos para configurar el proyecto en tu entorno local.

### Prerrequisitos

-   **Node.js**: Asegúrate de tener Node.js instalado.
-   **PostgreSQL**: Debes tener una instancia de PostgreSQL en funcionamiento.

### Instalación Global

1.  Clona el repositorio.
    ```bash
    git clone https://github.com/tu-usuario/tu-repo.git
    cd tu-repo
    ```

### Configuración del Backend

1.  Navega al directorio del backend.
    ```bash
    cd backend
    ```
2.  Instala las dependencias.
    ```bash
    npm install
    ```
3.  **Configura la Base de Datos:**
    a. Conéctate a tu instancia de PostgreSQL y ejecuta el siguiente script para crear las tablas e insertar datos de ejemplo.

    ```sql
    -- ... (el script SQL se mantiene igual) ...

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
    b. **Credenciales**: Abre `backend/src/config/database.ts` y actualiza las credenciales de la base de datos.

    ```typescript
    // backend/src/config/database.ts
    // ...
    username: "postgres",
    password: "tu_contraseña_de_postgres", // Actualiza con tu contraseña
    database: "tu_base_de_datos",       // Actualiza con el nombre de tu base de datos
    // ...
    ```
4.  **Ejecutar el Backend**: Inicia el servidor de desarrollo.
    ```bash
    npm run dev
    ```
    El servidor estará disponible en `http://localhost:3000`.

### Configuración del Frontend

1.  Abre una nueva terminal y navega al directorio del frontend.
    ```bash
    cd frontend
    ```
2.  Instala las dependencias.
    ```bash
    npm install
    ```
3.  **Configuración de Entorno (Opcional)**: Si tu frontend necesita un archivo de configuración (ej. `.env`) para apuntar a la URL de la API, créalo ahora.
    
    Ejemplo de archivo `.env`:
    ```
    REACT_APP_API_URL=http://localhost:3000/api
    ```
    *(Ajusta la variable y el valor según la configuración de tu proyecto de frontend).*

4.  **Ejecutar el Frontend**: Inicia el servidor de desarrollo del cliente.
    ```bash
    npm start 
    ```
    *(Este comando puede ser `npm run dev` u otro, dependiendo de tu proyecto).*
    
    La aplicación frontend estará disponible generalmente en `http://localhost:5173` o `http://localhost:8080`. Revisa la salida de la consola para la URL exacta.

## 🚀 Puntos de Acceso (Endpoints) de la API

La API del backend está dividida en rutas públicas y rutas protegidas.

### Autenticación (Rutas Públicas)
-   `POST /api/register`: Crea un nuevo usuario.
-   `POST /api/login`: Autentica a un usuario y devuelve un JWT. Este token es necesario para acceder a las rutas protegidas.

### Productos (Rutas Protegidas)
Estas rutas requieren un JWT válido en el encabezado `Authorization`.

**Ejemplo de Encabezado:**
`Authorization: Bearer <tu_token_aqui>`

-   `GET /api/productos`: Recupera todos los productos.
-   `POST /api/productos`: Crea un nuevo producto.
-   `PUT /api/productos/:id`: Actualiza un producto por su ID.
-   `DELETE /api/productos/:id`: Elimina un producto por su ID.

## 🤝 Contribuciones
Siéntete libre de abrir issues o enviar pull requests. Todas las contribuciones son bienvenidas.

## 📄 Licencia
Este proyecto está bajo la Licencia ISC.