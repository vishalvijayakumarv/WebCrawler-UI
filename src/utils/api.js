const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  LIST_CONTAINERS: `${API_BASE_URL}/api/list-containers`,
  LIST_SERVICES: `${API_BASE_URL}/api/list-services`,
  NOTIFICATION: `${API_BASE_URL}/api/notification`,
  SEND_SCRAPER: `${API_BASE_URL}/api/send-scraper`,
  START_CONTAINER: `${API_BASE_URL}/api/start-container`,
  STOP_CONTAINER: `${API_BASE_URL}/api/stop-container`, // Add stop endpoint
  PAUSE_CONTAINER: `${API_BASE_URL}/api/pause-container`, // Add pause endpoint
  LIST_LOG_STREAMS: `${API_BASE_URL}/api/log-streams`,
  STREAM_LOGS: `${API_BASE_URL}/api/live-log`,
};
