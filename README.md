# WebCrawler-UI

This is a React-based web application for managing and monitoring web scraping jobs. The application provides a dashboard to view the status of various containers, services, and notifications.

## Features

- **Dashboard**: View the status of running, completed, and exited containers.
- **Services**: Monitor the status and details of various services like PostgreSQL, Elasticsearch, and Redis.
- **Send Scraper**: Send URLs to the scraper for processing.
- **Notifications**: View and manage notifications.
- **Theme Toggle**: Switch between light and dark themes.

## Project Structure

```
/WebCrawler-UI
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── Dashboard.js
│   │   ├── Services.js
│   │   ├── SendScraper.js
│   │   ├── Notifications.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/WebCrawler-UI.git
    ```
2. Navigate to the project directory:
    ```sh
    cd WebCrawler-UI
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
