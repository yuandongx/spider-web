import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { CacheProvider } from '@emotion/react';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';
import createEmotionCache from './createCache';
import ResponsiveAppBar from './component/Header';
import ThemeSwitch from './component/ThemeSwitch';
// @ts-ignore
import type { Route } from './+types/root';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const cache = createEmotionCache();

// 定义light和dark模式的主题配置
const lightTheme = createTheme({
  colorSchemes: {
    light: true,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});
export default function App() {
  const { setColorScheme, mode: systemMode } = useColorScheme();
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  
  // 初始化时应用系统主题
  useEffect(() => {
    if (systemMode) {
      // @ts-ignore
      setMode(systemMode);
    }
  }, [systemMode]);
  
  const handleThemeSwitch = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    setColorScheme(newMode);
  };
  // 根据当前模式选择主题
  const currentTheme = mode === 'dark' ? darkTheme : lightTheme;
  
  if (typeof window !== 'undefined') {
    return (
      <ThemeProvider theme={currentTheme}>
        <CacheProvider value={cache}>
          <CssBaseline />
          <ResponsiveAppBar>
            <ThemeSwitch onChange={handleThemeSwitch} />
          </ResponsiveAppBar>
          <Outlet />
        </CacheProvider>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <ResponsiveAppBar>
        <ThemeSwitch onChange={handleThemeSwitch} />
      </ResponsiveAppBar>
      <Outlet />
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Box component="main" sx={{ pt: 8, p: 2, maxWidth: 'lg', mx: 'auto' }}>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <Box component="pre" sx={{ width: '100%', p: 2, overflowX: 'auto' }}>
          <code>{stack}</code>
        </Box>
      )}
    </Box>
  );
}
