# Tender Scope

Interview assessment project for **Knut Lab**, built using [Tenders.Guru API](https://tenders.guru/api/). This frontend application displays public tenders in Hungary using modern frontend technologies with a responsive and clean UI.

Live demo: [https://tender-scope.vercel.app](https://tender-scope.vercel.app)

## 🚀 Tech Stack

- [Vite](https://vitejs.dev/)
- [SolidJS](https://www.solidjs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn-Solid](https://shadcn-solid.com/)

## ✨ Features

- Tender list fetched from [tenders.guru](https://tenders.guru/api/hu/tenders)
- View tender details 
- Search and filter support
- Responsive design
- Loading state handling

## 🛠️ Setup Instructions

1. **Clone this repository:**

   ```bash
   git clone https://github.com/zuraLagiNgoding/tender-scope
   cd tender-scope
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Access the app at:**

   ```
   http://localhost:5173
   ```

## 📁 Project Structure (Simplified)

```
src/
├── components/       
│ └── ui/             # Reusable UI components
├── const/            # Const data like options
├── interfaces/       # Data type interfaces
├── libs/             # Utility functions and helpers
├── App.tsx           # App root
└── index.tsx         # Entry point
```