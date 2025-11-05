# Spotify Klon

Simple Spotify-inspired frontend built with React, Vite, MobX, and the Spotify Web API.

## Prerequisites
- Node.js 18 or newer
- npm 9 or newer
- Spotify Developer account for API credentials

## Installation
1. Clone the repository and open the project folder.
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Create a `.env` file inside `frontend/` and add your Spotify API credentials:
   ```bash
   VITE_SPOTIFY_CLIENT_ID=your_client_id
   VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
   ```

## Development
- Start the Vite dev server:
  ```bash
  npm run dev
  ```
  The app runs at http://localhost:5175 by default.

- Run the linter:
  ```bash
  npm run lint
  ```

## Production
- Build the production bundle:
  ```bash
  npm run build
  ```
- Preview the built bundle locally:
  ```bash
  npm run preview
  ```

## Tech Stack
- React 19 + Vite 7
- MobX 6 for state management
- SCSS for styling
- Spotify Web API (Client Credentials flow)
