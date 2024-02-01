/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

// Replace 'your_mapbox_token_here' with your actual Mapbox token
const mapboxToken = 'pk.eyJ1Ijoic2FubnkwOGJhbm55IiwiYSI6ImNsczI3OWlpODBmM2oycG1lZ2xrNHBhNncifQ.3PJzLcbmy1kF8nvgo-eKbg';

// Render the app with the Mapbox token
render(() => <App mapboxToken={mapboxToken} />, root!);

