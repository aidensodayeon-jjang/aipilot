# GEMINI Project Analysis: edupilot

## Project Overview

This project, "EduPilot," is a full-stack web application designed for educational management. It consists of two main parts:

*   **`edupilot-frontend`**: A client-side admin dashboard built with **React** and the **Material-UI** component library. It uses **Vite** as its build tool and development server.
*   **`edupilot-backend`**: A REST API server built with **Python** and the **Django** framework, using **Django REST Framework** to expose endpoints. It handles business logic and database interactions.

The two parts are designed to work together, with the React frontend consuming data from the Django backend API.

---

## Backend (`edupilot-backend`)

The backend is a standard Django project.

*   **Technology Stack**:
    *   Programming Language: **Python**
    *   Web Framework: **Django**
    *   API Framework: **Django REST Framework**
    *   Authentication: **JWT** (JSON Web Tokens) via `djangorestframework-simplejwt`
    *   Database: **MySQL**. The settings point to a local database named `edupilot`.
    *   Data Processing: Includes `pandas` and `numpy`, suggesting data analysis or manipulation features.

*   **Setup and Running**:

    1.  **Activate Virtual Environment**: A virtual environment exists at `.venv/`. Commands should be run from within this environment.
        ```bash
        source edupilot-backend/.venv/bin/activate
        ```

    2.  **Install Dependencies**: Install all required Python packages.
        ```bash
        # Make sure the virtual environment is activated
        pip install -r edupilot-backend/requirements.txt
        ```

    3.  **Run Development Server**: This starts the Django API server, typically on `http://127.0.0.1:8000`.
        ```bash
        # Make sure the virtual environment is activated
        python edupilot-backend/manage.py runserver
        ```

*   **Important Files**:
    *   `manage.py`: Django's command-line utility.
    *   `requirements.txt`: Lists all Python dependencies.
    *   `backend/settings/base.py`: Core settings file, including database configuration and installed apps.
    *   `api/`: The main Django app containing models, views (API endpoints), and serializers.

---

## Frontend (`edupilot-frontend`)

The frontend is a modern React application based on the "Minimal" admin template.

*   **Technology Stack**:
    *   Programming Language: **JavaScript (JSX)**
    *   Framework: **React**
    *   UI: **Material-UI (MUI)**
    *   Build Tool: **Vite**
    *   Package Manager: **Yarn**

*   **Setup and Running**:

    1.  **Navigate to Directory**:
        ```bash
        cd edupilot-frontend
        ```

    2.  **Install Dependencies**: Installs all necessary Node.js packages defined in `package.json`.
        ```bash
        yarn install
        ```

    3.  **Run Development Server**: Starts the Vite development server, typically on `http://127.0.0.1:3000` or a similar port.
        ```bash
        yarn dev
        ```

    4.  **Build for Production**: Compiles the application into static files in the `dist/` directory.
        ```bash
        yarn build
        ```

*   **Important Files**:
    *   `package.json`: Defines project scripts and lists all dependencies.
    *   `vite.config.js`: Configuration for the Vite build tool.
    *   `src/main.jsx`: The main entry point for the React application.
    *   `src/app.jsx`: The root React component.
    *   `src/routes`: Contains the application's routing logic.

---

## Development Conventions

*   **API Communication**: The frontend communicates with the backend via REST API calls. `django-cors-headers` is configured on the backend to allow requests from the frontend's development server.
*   **Code Style**: The frontend uses **ESLint** and **Prettier** to enforce a consistent code style. Configuration files (`.eslintrc`, `.prettierrc`) are present in the `edupilot-frontend` directory.
*   **Virtual Environments**: The backend relies on a Python virtual environment located in `edupilot-backend/.venv` to manage its dependencies.
