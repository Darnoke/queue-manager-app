import { ThemeProvider } from '@mui/material/styles'
import './App.scss'
import AppRouter from './routes/AppRouter'
import theme from './styles/theme.tsx'
import './styles/margins.scss'
import { UserProvider } from './contexts/UserContext.tsx'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
  <ThemeProvider theme={theme}>
    <UserProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </UserProvider>
  </ThemeProvider>
  )
}

export default App
