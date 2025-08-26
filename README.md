# DoxaCare - AI Healthcare Assistant for Sierra Leone

DoxaCare is an AI-powered healthcare assistant designed to bridge the information gap in Sierra Leone. It provides users with reliable, culturally-sensitive health information, helps them check symptoms, and allows them to find nearby medical clinics. The application supports both English and Krio to ensure wide accessibility.

This project was built using **Firebase Studio**.

## Our Mission

Our mission is to empower individuals in Sierra Leone with accessible knowledge about their health. By leveraging modern AI and a user-friendly interface, DoxaCare aims to foster proactive health management, improve healthcare outcomes, and provide a trusted digital resource for communities.

## Key Features

- **AI Health Check & Chat:** Users can describe symptoms in English or Krio to get instant, AI-driven information on possible conditions, treatments, and prevention methods.
- **Find Clinics:** A searchable directory of hospitals and clinics across Sierra Leone, helping users locate the nearest healthcare facilities.
- **Health Resources & Statistics:** Access to localized health news, reports, and up-to-date health statistics for Sierra Leone, powered by AI.
- **Bilingual Support:** The entire application is available in both English and Krio, ensuring it is accessible to a wide audience.
- **Emergency Information:** Quick access to emergency contact numbers and advice.

## Technology Stack

DoxaCare is built on a modern, scalable, and AI-first technology stack:

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI:** [Google's Gemini via Genkit](https://firebase.google.com/docs/genkit)
- **Deployment:** Configured for [Firebase App Hosting](https://firebase.google.com/docs/hosting)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or higher) and `npm` installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/doxacare-app.git
    cd doxacare-app
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of your project and add any necessary API keys (e.g., for Google AI services).
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result. The main application entry point is `src/app/page.tsx`.
