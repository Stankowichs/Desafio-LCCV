# PipeAPI Dashboard

Este projeto possui duas partes:

- `backend`: API local em FastAPI.
- `frontend`: interface em Next.js.

## Como Rodar o Backend

Entre na pasta do backend:

```powershell
cd backend
```

Crie o ambiente virtual Python:

```powershell
python -m venv venv
```

Ative o ambiente virtual:

```powershell
.\venv\Scripts\Activate.ps1
```

Instale as dependencias:

```powershell
pip install -r requirements.txt
```

Rode o servidor FastAPI com Uvicorn:

```powershell
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

O backend ficara disponivel em:

```text
http://127.0.0.1:8000
```

## Como Rodar o Frontend

Abra outro terminal e volte para a pasta raiz do projeto. Depois entre na pasta do frontend:

```powershell
cd frontend
```

Instale as dependencias do Node:

```powershell
npm install
```

Rode o servidor de desenvolvimento:

```powershell
npm run dev
```

O frontend ficara disponivel em:

```text
http://localhost:3000
```

## Ordem Recomendada

1. Rode primeiro o backend em `http://127.0.0.1:8000`.
2. Depois rode o frontend em `http://localhost:3000`.
3. Acesse o frontend pelo navegador e execute as simulacoes pela sidebar.
