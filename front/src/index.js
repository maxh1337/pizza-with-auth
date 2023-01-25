import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {SearchContext} from "./contexts/SearchFieldContext";
import AppProvider from "./providers/AppProvider";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <AppProvider/>
        </QueryClientProvider>
    </BrowserRouter>
);
