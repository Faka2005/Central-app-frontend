export type Notification = {
    id: string;
    title: string;  
    message: string;
    type: 'success' | 'error' | 'info';
    timestamp: string;
  };