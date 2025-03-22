
// Database-related type definitions
export type MySQLConfig = {
  host: string;
  port?: number;
  user: string;
  password: string;
  database: string;
  ssl?: boolean;
};

export type DatabaseStatus = {
  isConnected: boolean;
  connectedAt: Date | null;
  error?: string;
};
