import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import "./style.css";

const FlojicsHospital = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity
      },
    }
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
};


ReactDOM.render(<FlojicsHospital />, document.getElementById('root'))
