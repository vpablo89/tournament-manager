# AGENTS.md

## 🧠 Rol del agente

Actúa como un Senior Fullstack Engineer especializado en:

- Next.js + TypeScript
- Node.js + Express
- PostgreSQL
- Arquitectura limpia
- Testing completo (frontend + backend)

Priorizar:

- separación de responsabilidades
- código escalable
- buenas prácticas de testing

---

## 🏗️ Arquitectura general

El sistema está dividido en:

- frontend (Next.js)
- backend (Node API)
- base de datos (PostgreSQL)

Reglas:

- frontend nunca accede directamente a la DB
- toda lógica pasa por la API
- separación estricta entre capas

---

## ⚙️ Frontend (Next.js)

Estructura:

src/
  components/
  pages/ o app/
  hooks/
  services/
  types/

Reglas:

- components → UI pura
- hooks → lógica reutilizable
- services → llamadas a API
- types → tipado global

---

## 🎯 Backend (Node + Express)

Estructura:

src/
  controllers/
  services/
  repositories/
  models/
  routes/
  middlewares/

Reglas:

- controllers → request/response
- services → lógica de negocio
- repositories → acceso a datos
- no mezclar responsabilidades

---

## 🗄️ Base de datos (PostgreSQL)

Entidades principales:

- Tournament
- Player
- Registration

Relaciones:

- Tournament tiene muchos Players (a través de Registration)
- Player puede estar en muchos torneos

---

## 📦 Modelado (backend)

Ejemplo:

Tournament:
- id
- name
- date

Player:
- id
- name

Registration:
- id
- playerId
- tournamentId
- points

---

## 📡 API REST

Endpoints mínimos:

POST /tournaments
GET /tournaments

POST /players
GET /players

POST /registrations
GET /registrations

GET /tournaments/:id/standings
GET /players/ranking

---

## 🧠 Lógica de negocio

El sistema debe permitir:

- crear torneos
- registrar jugadores en torneos
- calcular tabla de posiciones
- calcular ranking global

La lógica de ranking debe estar en services, nunca en controllers.

---

## 🧪 Testing (OBLIGATORIO)

### Backend

- Jest
- Supertest

Cubrir:

- creación de torneo
- inscripción de jugador
- cálculo de ranking

---

### Frontend

- React Testing Library

Cubrir:

- render de componentes
- interacción (clicks, formularios)
- consumo de API (mock)

---

## 🔐 Validación

Backend:

- validar inputs (zod recomendado)

Frontend:

- validar formularios antes de enviar

---

## ⚠️ Manejo de errores

Backend:

- middleware global de errores

Frontend:

- mostrar mensajes claros al usuario

---

## 🧼 Clean Code

- funciones pequeñas
- nombres claros
- evitar lógica duplicada
- no lógica en controllers

---

## 🔁 Flujo de desarrollo

1. definir modelo de datos
2. definir endpoints
3. escribir tests backend
4. implementar lógica
5. conectar frontend
6. escribir tests frontend
7. refactorizar

---

## 🚫 Anti-patrones prohibidos

- lógica en controllers
- acceso directo a DB desde frontend
- usar any en TypeScript
- no escribir tests
- duplicar lógica entre frontend y backend

---

## 📦 Buenas prácticas

- usar variables de entorno
- commits claros:

feat: add tournament creation
fix: handle ranking calculation
test: add ranking tests

---

## 🤖 Uso con Cursor

Prompts recomendados:

- "crea endpoint POST /tournaments siguiendo AGENTS.md"
- "implementa ranking en service"
- "agrega tests con jest y supertest"
- "crea hook para consumir API de torneos"
- "refactoriza frontend siguiendo AGENTS.md"

---

## 🔥 Nivel extra (recomendado)

- paginación
- filtros
- loading states en frontend
- manejo de errores UX
- deploy (Vercel + Render)
