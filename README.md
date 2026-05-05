# 🔐 Sistema de Autenticación con JWT + PostgreSQL

API REST de autenticación construida con Node.js y Express. Registro de usuarios, login y rutas protegidas usando JWT, bcrypt y PostgreSQL en Railway.

---

## 🚀 Endpoints

| Método | Ruta | Descripción | Protegida |
|--------|------|-------------|-----------|
| `POST` | `/usuarios/registro` | Crear cuenta nueva | ❌ |
| `POST` | `/usuarios/login` | Iniciar sesión y obtener token | ❌ |
| `GET` | `/usuarios/perfil` | Ver perfil del usuario autenticado | ✅ |

---

## 🛠️ Tecnologías

- **Node.js + Express**
- **jsonwebtoken** — tokens JWT
- **bcrypt** — encriptación de contraseñas
- **pg** — driver para PostgreSQL
- **dotenv** — variables de entorno
- **PostgreSQL en Railway** — base de datos en la nube

---

## 📁 Arquitectura MVC

---

## ⚙️ Instalación

```bash
git clone https://github.com/iguardiaDev/login-jwt.git
cd login-jwt
npm install
```

Crear archivo `.env`:


```bash
node app.js
```

---

## 🗄️ Base de datos

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt (10 salt rounds)
- Tokens JWT con expiración de 1 hora
- Rutas protegidas con middleware de verificación
- Tokens inválidos reciben `401 Unauthorized`
- `DATABASE_URL` en `.env`, nunca en GitHub

---

## 🔄 Flujo

1. **Registro** — bcrypt encripta la contraseña y se guarda en PostgreSQL
2. **Login** — se verifica la contraseña y se genera un token JWT
3. **Perfil** — el middleware valida el token antes de dar acceso

---

## 👨‍💻 Autor

**Daniel Iguardia** — [GitHub](https://github.com/iguardiaDev)
