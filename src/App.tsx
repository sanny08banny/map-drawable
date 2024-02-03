import { Component, createSignal } from "solid-js";
import MapGL, { Viewport, Source, Layer, Draw } from "solid-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

// Import the Mapbox GL Draw library
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

const App: Component<{ mapboxToken: string }> = (props) => {
  const [viewport, setViewport] = createSignal({
    center: [-122.45, 37.78],
    zoom: 13,
  } as Viewport);
  const [mouseCoords, setMouseCoords] = createSignal({lat: 0, lng: 0});
  const [drawnFeature, setDrawnFeature] = createSignal<string | null>(null);


  // Explicitly type 'map' variable
  let map: mapboxgl.Map | undefined;

  const enableDrawing = () => {
    
  };

  return (
    <div>
      <MapGL
        options={{ style: "mb:sat_street", accessToken: props.mapboxToken }}
        viewport={viewport()}
        onViewportChange={(evt: Viewport) => setViewport(evt)}
        onMouseMove={(evt: any) => setMouseCoords(evt.lngLat)}>
           <Draw
  lib={MapboxDraw}
  options={{
    controls: {
      combine_features: false,
      uncombine_features: false,
    }
  }}
  onCreate={(event) => {
    // Assuming you want to display the type of the drawn feature
    const featureType = event.features[0]?.geometry?.type || null;
    setDrawnFeature(featureType);
    console.log(event);
  }}
/>

    </MapGL>
      <button onClick={enableDrawing} style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
        Enable Drawing
      </button>
      <button style='font-variant:tabular-nums'>
        Lat: {mouseCoords().lat.toFixed(4)} Lng: {mouseCoords().lng}
      </button>
    </div>
  );
};

export default App;
