import * as React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

function App() {
  const [markerPosition, setMarkerPosition] = useState({
    longitude: 10.886812419213953,
    latitude: 49.89161083163805
  });

  const handleMarkerDragEnd = event => {
    const { lng, lat } = event.lngLat;

    setMarkerPosition({
      longitude: lng,
      latitude: lat
    });
  };

  const handleMapClick = event => {
    const { lng, lat } = event.lngLat;

    setMarkerPosition({
      longitude: lng,
      latitude: lat
    });
  };

  console.log(markerPosition);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '50vh'
      }}
    >
      <Box>
        <Typography m={6}>Select location: </Typography>
      </Box>
      <Box>
        <Map
          initialViewState={{
            longitude: 10.8867,
            latitude: 49.8915,
            zoom: 14
          }}
          style={{ width: '50vw', height: '50vh' }}
          mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_TOKEN}`}
          onClick={handleMapClick}
        >
          <Marker
            longitude={markerPosition.longitude}
            latitude={markerPosition.latitude}
            anchor="bottom"
            style={{ color: 'tomato' }}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          >
            <LocationOnIcon sx={{ fontSize: 60 }} />
          </Marker>
          <NavigationControl />
        </Map>
        <Box>
          <Typography>{markerPosition.latitude}</Typography>
        </Box>
        <Box>
          <Typography>{markerPosition.longitude}</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default App;
