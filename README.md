# Building Energy Analysis System

A full-stack web application to analyze solar heat gain in buildings and estimate cooling costs for Indian cities.

## Overview

Configure building facades (North, South, East, West, Roof) with dimensions and window-to-wall ratios (WWR). The system calculates solar heat gain using city-specific solar radiation data and estimates total cooling costs.

**Key Features:**
- Building configuration with height, width, WWR for all facades
- City selection (Delhi, Mumbai, Kolkata, Bangalore)
- SHGC (Solar Heat Gain Coefficient) input
- Energy calculation: `Q = A × SHGC × G × Δt`
- Cost estimation with city-specific electricity rates
- Visual dashboard with bar chart showing cost breakdown

## Tech Stack

**Frontend:** React 18, TypeScript, Material UI v5, Recharts, React Query, Vite  
**Backend:** Node.js, Express, TypeScript

## Project Structure

```
frontend/src/
├── api/building.api.ts
├── components/
│   ├── BuildingForm.tsx
│   ├── Dashboard.tsx
│   └── Charts.tsx
├── types/building.ts
└── App.tsx

backend/src/
├── constants/cityData.ts
├── services/calculation.service.ts
├── controllers/building.controller.ts
├── routes/building.routes.ts
└── server.ts
```

## API Endpoint

**POST** `/api/building/analyze`

```json
{
  "city": "Mumbai",
  "shgc": 0.6,
  "facades": {
    "north": { "height": 10, "width": 20, "wwr": 0.4 },
    "south": { "height": 10, "width": 20, "wwr": 0.5 },
    "east":  { "height": 10, "width": 15, "wwr": 0.3 },
    "west":  { "height": 10, "width": 15, "wwr": 0.3 },
    "roof":  { "height": 12, "width": 25, "wwr": 0.2 }
  }
}
```

**Response:**
```json
{
  "city": "Mumbai",
  "shgc": 0.6,
  "totalCost": 1234.56,
  "breakdown": {
    "north": { "windowArea": 80, "btu": 86400, "energy": 6.32, "cost": 56.9 }
  }
}
```

## Running Locally

**Backend:**
```bash
cd backend
npm install
npm run dev  # Runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

## Design Decisions

- **Stateless API**: No database, focused on calculation accuracy
- **React Query**: Clean server state management
- **TypeScript**: Type safety across frontend and backend
- **Card-based UI**: Modern dashboard experience

## Future Enhancements

- Save and compare multiple designs
- PDF export functionality
- Multi-city comparison view
- User authentication