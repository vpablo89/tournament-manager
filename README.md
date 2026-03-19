# Tournament Manager

Gestor de torneos de padel con arquitectura fullstack:

- `frontend/`: Next.js + TypeScript
- `backend/`: Node.js + Express + TypeScript
- `db`: PostgreSQL

## Funcionalidades

- Crear torneo
- Inscribir jugadores
- Ver tabla de posiciones por torneo
- Ver ranking global de jugadores

## Endpoints backend

- `POST /tournaments`
- `GET /tournaments`
- `POST /players`
- `GET /players`
- `POST /registrations`
- `GET /registrations`
- `GET /tournaments/:id/standings`
- `GET /players/ranking`

## Correr con Docker (recomendado)

Desde la raiz:

```bash
docker compose up --build
```

Aplicaciones:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## Correr local sin Docker

1. Instalar dependencias en la raiz:

```bash
npm install
```

2. Crear variables:
- `backend/.env` usando `backend/.env.example`
- `frontend/.env.local` usando `frontend/.env.example`

3. Correr backend:

```bash
npm run dev:backend
```

4. Correr frontend:

```bash
npm run dev:frontend
```

## Tests

Backend (Jest + Supertest):

```bash
npm run test:backend
```

Frontend (React Testing Library):

```bash
npm run test:frontend
```

