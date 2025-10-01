# IronPath: Your Daily Gym Companion

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rakesh-vr/BigMuscle)

> A sleek and motivating gym application that provides a 7-day workout plan, tracks user progress, and displays performance on a personalized dashboard.

## About The Project

IronPath is a modern, minimalist gym workout training application designed to guide users through a structured 7-day workout plan, track their progress, and monitor calorie expenditure. The application provides a clear, daily schedule focusing on different muscle groups, ensuring a balanced and effective training regimen. Users can log in, view their daily exercises, track completion, and visualize their consistency on a personal dashboard. The core experience is built around motivation, clarity, and simplicity, helping users stay committed to their fitness goals.

## Key Features

*   **Structured 7-Day Workout Plan:** A comprehensive weekly plan targeting different muscle groups each day for balanced training.
*   **Personalized Dashboard:** At-a-glance view of today's workout, weekly progress, and key statistics like workouts completed and calories burned.
*   **Detailed Workout Views:** Clear instructions for each exercise, including sets, reps, and visual guides.
*   **Progress Tracking:** Monitor your consistency and see your workout history to stay motivated.
*   **Sleek, Dark-Themed UI:** A minimalist, visually appealing interface that's easy on the eyes and focuses on your workout.
*   **Responsive Design:** A flawless experience across all devices, from mobile phones to desktops.

## Technology Stack

*   **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [React Router](https://reactrouter.com/)
*   **Backend:** [Cloudflare Workers](https://workers.cloudflare.com/), [Hono](https://hono.dev/)
*   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/)
*   **Data Visualization:** [Recharts](https://recharts.org/)
*   **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   [Bun](https://bun.sh/) installed on your machine.
*   A [Cloudflare account](https://dash.cloudflare.com/sign-up).
*   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/ironpath.git
    cd ironpath
    ```
2.  **Install dependencies:**
    ```sh
    bun install
    ```

## Development

To run the application in development mode, which includes hot-reloading for both the frontend and the backend worker:

```sh
bun dev
```

This will start the Vite development server for the React frontend and a local Wrangler server for the Hono API. The application will be accessible at `http://localhost:3000`.

## Deployment

This project is configured for seamless deployment to Cloudflare Pages.

1.  **Build the project:**
    ```sh
    bun run build
    ```
2.  **Deploy to Cloudflare:**
    ```sh
    bun run deploy
    ```

This command will build the application and deploy it using the Wrangler CLI.

Alternatively, you can deploy directly from your GitHub repository with a single click:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rakesh-vr/BigMuscle)

## Project Structure

The project is organized into three main directories:

*   `src/`: Contains the frontend React application, including pages, components, hooks, and utility functions.
*   `worker/`: Contains the backend Hono application that runs on Cloudflare Workers, including API routes and entity definitions.
*   `shared/`: Contains code shared between the frontend and backend, such as type definitions.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.