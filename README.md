# Full Stack Engineer Assessment

This repository contains a **full-stack application** built as part of the Full Stack Engineer assessment.

It includes:

- A **backend webhook service** that reliably processes payment transactions asynchronously.
- A **frontend analytics dashboard** that visualizes call analytics and allows user-customized data persistence.

Both components are deployed independently and are publicly accessible.

---

## Architecture Overview

```
├── backend/    # FastAPI webhook service (Railway)
├── frontend/   # React + TypeScript analytics UI (Netlify)
└── README.md
```

---

## Backend – Webhook Processing Service

### Problem Statement

The backend service receives transaction webhooks from external payment providers and must:

- Acknowledge requests immediately
- Process transactions asynchronously
- Prevent duplicate processing (idempotency)
- Persist transaction state reliably

---

### Tech Stack

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Railway (deployment)

---

### API Endpoints

#### Health Check

```
GET /
```

Response:
```json
{
  "status": "HEALTHY",
  "current_time": "2024-01-15T10:30:00Z"
}
```

---

#### Receive Transaction Webhook

```
POST /v1/webhooks/transactions
```

- Returns **202 Accepted**
- Responds in under **500ms**
- Processing happens asynchronously in the background

---

#### Get Transaction Status

```
GET /v1/transactions/{transaction_id}
```

Response:
```json
{
  "transaction_id": "txn_abc123def456",
  "status": "PROCESSED",
  "created_at": "2024-01-15T10:30:00Z",
  "processed_at": "2024-01-15T10:30:30Z"
}
```

---

### Key Design Decisions

- **Asynchronous processing** using background tasks to ensure fast webhook acknowledgment
- **Idempotency** enforced using a unique constraint on `transaction_id`
- **Persistent storage** ensures reliability across restarts
- **30-second simulated delay** to mimic external API calls

---

### Backend Deployment

- Platform: **Railway**
- Base directory: `/backend`
- Public URL: https://<your-backend-url>

---

## Frontend – Analytics Dashboard

### Problem Statement

The frontend displays call analytics charts and allows users to:

- Modify chart values
- Save custom values using their email
- Confirm overwriting previously saved values

---

### Tech Stack

- React
- TypeScript
- Recharts
- Supabase
- Netlify (deployment)

---

### Features

- Analytics charts using dummy data
- Editable chart values
- Email-based data persistence
- Overwrite confirmation for existing users
- UI inspired by https://superbryn.com

---

### Frontend Deployment

- Platform: **Netlify**
- Base directory: `/frontend`
- Build command:
  ```
  npm run build
  ```
- Publish directory:
  ```
  dist
  ```
- Public URL: https://<your-frontend-url>

---

## Running Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Testing the Backend Webhook

1. Send a transaction webhook
2. Verify immediate **202 Accepted** response
3. Query transaction status (`PROCESSING`)
4. Wait ~30 seconds
5. Verify status changes to `PROCESSED`
6. Re-send the same webhook to confirm idempotency

---

## Summary

This project demonstrates:

- Production-style webhook handling
- Asynchronous background processing
- Idempotent system design
- Persistent data storage
- Frontend analytics with user-controlled state
- End-to-end full stack ownership