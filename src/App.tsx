import { Component, createSignal } from "solid-js";
import MapGL, { Viewport, Source, Layer } from "solid-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

// Import the Mapbox GL Draw library
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const App: Component<{ mapboxToken: string }> = (props) => {
  const [viewport, setViewport] = createSignal({
    center: [-122.45, 37.78],
    zoom: 11,
  } as Viewport);

  // Explicitly type 'map' variable
  let map: mapboxgl.Map | undefined;

  const enableDrawing = () => {
    // Ensure 'map' is defined before using it
    if (map) {
      // Create a new instance of MapboxDraw
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });

      // Add the draw control to the map
      map.addControl(draw);

      // Listen for draw events (you can customize this based on your needs)
      map.on('draw.create', (event) => {
        // Handle the drawn features, e.g., save them to state or perform other actions
        console.log(event.features);
      });
    }
  };

  const handleMapLoad = (loadedMap: mapboxgl.Map) => {
    // Save the map instance to the 'map' variable for later use
    map = loadedMap;

    // Additional configurations or controls can be added here
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    enableDrawing(); // Enable drawing when the map loads
  };

  return (
    <div>
      <MapGL
        options={{ style: "mb:light", accessToken: props.mapboxToken }}
        viewport={viewport()}
        onViewportChange={(evt: Viewport) => setViewport(evt)}
        onLoad={handleMapLoad}
      >
        <Source
          source={{
            type: "geojson",
            data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
          }}
        >
          <Layer
            style={{
              type: "circle",
              paint: {
                "circle-radius": 8,
                "circle-color": "red",
              },
            }}
          />
        </Source>
      </MapGL>
      <button onClick={enableDrawing} style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
        Enable Drawing
      </button>
    </div>
  );
};

export default App;
