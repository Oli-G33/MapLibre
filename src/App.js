import React, { useState } from 'react';
import axios from 'axios';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Typography } from '@mui/material';

function App() {
  const [markerPosition, setMarkerPosition] = useState({
    longitude: 10.886812419213953,
    latitude: 49.89161083163805
  });

  const [address, setAddress] = useState('');

  const handleMarkerDragEnd = event => {
    const { lng, lat } = event.lngLat;

    setMarkerPosition({
      longitude: lng,
      latitude: lat
    });

    // Get postal address when the marker is dragged to a new position
    getPostalAddress(lat, lng);
  };

  const handleMapClick = event => {
    const { lng, lat } = event.lngLat;

    setMarkerPosition({
      longitude: lng,
      latitude: lat
    });

    // Get postal address when the map is clicked to a new position
    getPostalAddress(lat, lng);
  };

  const getPostalAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      );

      // Extract the formatted address from the response
      const address = response.data.features[0].place_name;
      setAddress(address);
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Address not found');
    }
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
      <Box sx={{ border: 1, borderColor: 'grey.500' }}>
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
            style={{ color: 'red' }}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          >
            <LocationOnIcon sx={{ fontSize: 60 }} />
          </Marker>
          <NavigationControl position={'bottom-right'} showCompass={false} />
        </Map>
      </Box>
      <Box m={8}>
        <Box>
          <Typography>Pick-up location: {address}</Typography>
        </Box>
        <Box>
          <Typography>Longitude: {markerPosition.longitude}</Typography>
        </Box>
        <Box>
          <Typography>Latitude: {markerPosition.latitude}</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default App;
