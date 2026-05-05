# 🔐 Sistema de Autenticación con JWT

API REST de autenticación construida con Node.js y Express. Implementa registro de usuarios, login y rutas protegidas usando JSON Web Tokens (JWT) y encriptación de contraseñas con bcrypt.

---

## 🚀 Endpoints

| Método | Ruta | Descripción | Protegida |
|--------|------|-------------|-----------|
| `POST` | `/api/usuarios/registro` | Crear cuenta nueva | ❌ |
| `POST` | `/api/usuarios/login` | Iniciar sesión y obtener token | ❌ |
| `GET` | `/api/usuarios/perfil` | Ver perfil del usuario autenticado | ✅ |

---

## 🛠️ Tecnologías

- **Node.js** — entorno de ejecución
- **Express** — framework para el servidor
- **jsonwebtoken** — generación y verificación de tokens JWT
- **bcrypt** — encriptación de contraseñas
- **Postman** — testing de endpoints

---

## 📁 Arquitectura MVC

```
login-jwt/
├── app.js                      # Punto de entrada del servidor
├── routes/
│   └── auth.js                 # Definición de rutas
├── controllers/
│   └── auth.js                 # Lógica de negocio
├── models/
│   └── usuarios.js             # Datos en memoria
└── middleware/
    └── verificarToken.js       # Validación de JWT
```

---

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/iguardiaDev/login-jwt.git

# Entrar a la carpeta
cd login-jwt

# Instalar dependencias
npm install

# Iniciar el servidor
node app.js
```

El servidor corre en `http://localhost:3000`

---

## 📬 Uso con Postman

### 1 — Registro
```
POST http://localhost:3000/api/usuarios/registro
```
```json
{
    "nombre": "Daniel",
    "email": "daniel@gmail.com",
    "password": "miPassword123"
}
```

**Respuesta:**
```json
{
    "mensaje": "Usuario registrado correctamente",
    "usuario": {
        "id": 1,
        "nombre": "Daniel",
        "email": "daniel@gmail.com"
    }
}
```

---

### 2 — Login
```
POST http://localhost:3000/api/usuarios/login
```
```json
{
    "email": "daniel@gmail.com",
    "password": "miPassword123"
}
```

**Respuesta:**
```json
{
    "mensaje": "Login exitoso",
    "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

### 3 — Perfil (ruta protegida)
```
GET http://localhost:3000/api/usuarios/perfil
```

**Header requerido:**
```
authorization: eyJhbGciOiJIUzI1NiJ9...
```

**Respuesta:**
```json
{
    "mensaje": "Bienvenido a tu perfil",
    "usuario": {
        "id": 1,
        "email": "daniel@gmail.com"
    }
}
```

---

## 🔒 Seguridad

- Las contraseñas nunca se guardan en texto plano — se encriptan con **bcrypt** usando 10 salt rounds
- Los tokens JWT expiran en **1 hora**
- Las rutas protegidas verifican el token antes de ejecutar cualquier lógica
- Tokens inválidos o expirados reciben respuesta `401 Unauthorized`

---

## 📖 Flujo de autenticación

```
1. Usuario se registra → contraseña se encripta con bcrypt
2. Usuario hace login → servidor verifica credenciales
3. Login exitoso → servidor genera token JWT firmado
4. Usuario manda token en cada petición protegida
5. Middleware verifica el token antes de dar acceso
```

---

## 👨‍💻 Autor

**Daniel Iguardia** — [iguardiadev.github.io](https://iguardiadev.github.io)
