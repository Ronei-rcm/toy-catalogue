
import React, { useEffect, useState } from 'react';
import { Database, CheckCircle, XCircle } from 'lucide-react';
import { initDatabase } from '@/utils/db';

const DatabaseStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedSince, setConnectedSince] = useState<Date | null>(null);
  
  useEffect(() => {
    // Initialize database and check connection status
    initDatabase();
    
    // Simulate connection status check
    const checkConnection = () => {
      // In real implementation, get actual status from MySQL connection
      setIsConnected(true);
      setConnectedSince(new Date());
    };
    
    // Check immediately and then every 30 seconds
    checkConnection();
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center bg-muted p-2 rounded-md text-sm">
      <Database className="h-4 w-4 mr-2" />
      <div>
        <div className="flex items-center">
          <span className="font-medium mr-2">MySQL:</span> 
          {isConnected ? (
            <span className="flex items-center text-green-600">
              <CheckCircle className="h-3 w-3 mr-1" /> Conectado
            </span>
          ) : (
            <span className="flex items-center text-red-600">
              <XCircle className="h-3 w-3 mr-1" /> Desconectado
            </span>
          )}
        </div>
        {isConnected && connectedSince && (
          <div className="text-xs text-muted-foreground">
            Conectado desde {connectedSince.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseStatus;
