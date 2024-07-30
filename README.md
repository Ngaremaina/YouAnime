# YouAnime

This project consists of a React front-end and a FastAPI back-end. Both services are containerized using Docker and can be deployed using Docker Compose.

## Prerequisites

- Docker
- Docker Compose
- Python (for FastAPI)
- Node.js and Yarn or npm (for React)

## Setting Up the Project

### Backend: FastAPI

1. Create and activate a virtual environment:

    ```powershell
    python -m venv env
    .\env\Scripts\activate
    ```

2. Install the required dependencies:

    ```sh
    pip install -r requirements.txt
    ```

3. Run the FastAPI application:

    ```sh
    uvicorn app.main:app 
    ```

### Frontend: React

1. Navigate to the `frontend` directory:

    ```sh
    cd frontend
    ```

2. Install the dependencies:

    ```sh
    yarn install
    # or
    npm install
    ```

3. Start the React application:

    ```sh
    yarn start
    # or
    npm start
    ```

## Running with Docker

1. Ensure Docker and Docker Compose are installed on your system.

2. Navigate to the project root directory.

3. Build and run the Docker containers:

    ```sh
    docker-compose up --build
    ```

The FastAPI backend will be accessible at `http://localhost:8000` and the React frontend at `http://localhost:3000`.

## License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://reactjs.org/)
- [Docker](https://www.docker.com/)
