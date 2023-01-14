import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar';
import Record from './components/Record';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">
                <Navbar />
                <Record />
            </div>
        </ThemeProvider>
    );
}
