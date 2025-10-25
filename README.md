# RAG Chatbot Frontend

## Tech Stack
- Frontend: React + SCSS (as required, for UI and styling).

## Setup
1. Install deps: npm install
2. Set .env with backend URL.
3. Start: npm start

## Flow
Connects to backend via Socket.io for real-time chat (sendMessage emits query, responseChunk appends streaming text). Uses Axios for history fetch/reset. Session ID stored in localStorage for persistence.

## Design Decisions
- Streaming: Appends chunks to bot message for typed-out effect.
- Potential improvements: Add loading spinner during stream, handle socket disconnects.