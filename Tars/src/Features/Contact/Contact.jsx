import React, { useEffect, useState } from 'react';
import './Contact.css';
import tt from '@tomtom-international/web-sdk-maps';
import ttServices from '@tomtom-international/web-sdk-services';
const Contact = () => {
  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState('');
  const API_KEY = 'OrUyfyAxnyNTwvDoHAVhGlxeppyekzsF';
  const routeLayerId = 'route';

  // Hardcoded coordinates with details
  const locations = [
    {
      lng: 83.3423,
      lat: 17.8207,
      name: 'Blood Camp 1',
      mobile: '1234567890',
    },
    {
      lng: 83.3500,
      lat: 17.8300,
      name: 'Blood Camp 2',
      mobile: '0987654321',
    },
    {
      lng: 83.3600,
      lat: 17.8400,
      name: 'Blood Camp 3',
      mobile: '1122334455',
    },
    {
      lng: 83.4500,
      lat: 17.9000,
      name: 'Blood Camp 4',
      mobile: '0987654908',
    },
  ];

  useEffect(() => {
    const initializeMap = () => {
      const center = [83.34229499608134, 17.82072524872425]; // Default center coordinates

      const mapInstance = tt.map({
        key: API_KEY,
        container: 'map',
        center: center,
        zoom: 12,
      });

      setMap(mapInstance);

      // Add hardcoded markers
      addMarkers(mapInstance);
    };

    initializeMap();
  }, []);

  const addMarkers = (mapInstance) => {
    locations.forEach((location) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker'; // Custom marker styling

      const marker = new tt.Marker({ element: markerElement })
        .setLngLat([location.lng, location.lat])
        .addTo(mapInstance);

      const popupContent = document.createElement('div');
      popupContent.innerHTML = `
        <div style="color: blue;">
          <h3>${location.name}</h3>
          <p>Mobile: ${location.mobile}</p>
        </div>
      `;

      const navigateButton = document.createElement('button');
      navigateButton.textContent = 'Navigate';
      navigateButton.className = 'navigate-button';
      navigateButton.onclick = () => createRoute([location.lng, location.lat]);

      popupContent.appendChild(navigateButton);

      const popup = new tt.Popup({ offset: 35 }).setDOMContent(popupContent);

      marker.setPopup(popup);
    });
  };

  const displayRoute = (geoJSON) => {
    if (!map) {
      console.error('Map is not initialized');
      return;
    }

    if (map.getLayer(routeLayerId)) {
      map.removeLayer(routeLayerId);
      map.removeSource(routeLayerId);
    }

    map.addLayer({
      id: routeLayerId,
      type: 'line',
      source: {
        type: 'geojson',
        data: geoJSON,
      },
      paint: {
        'line-color': 'blue',
        'line-width': 4,
      },
    });
  };

  const createRoute = (destination) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = [position.coords.longitude, position.coords.latitude];

          // Add a marker at the user's current location
          const userMarkerElement = document.createElement('div');
          userMarkerElement.className = 'user-location-marker'; // Custom marker styling for user location

          // Remove any existing user marker before adding a new one
          if (map.getLayer('user-location')) {
            map.removeLayer('user-location');
            map.removeSource('user-location');
          }

          const userMarker = new tt.Marker({ element: userMarkerElement })
            .setLngLat(currentLocation)
            .addTo(map);

          const routeOptions = {
            key: API_KEY,
            locations: [currentLocation, destination],
            travelMode: 'car', // Default travel mode
          };

          console.log('Route options:', routeOptions); // Debugging

          ttServices.services
            .calculateRoute(routeOptions)
            .then((routeData) => {
              console.log('Route data:', routeData); // Debugging
              setDistance(`Distance: ${routeData.routes[0].summary.lengthInMeters} meters`);
              const geoJSON = routeData.toGeoJson();
              displayRoute(geoJSON);
            })
            .catch((error) => {
              console.error('Error calculating route:', error);
              alert('An error occurred while creating the route.');
            });
        },
        (error) => {
          alert('Unable to get current location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="contact-container">
      <div className="header">Blood Camps Near You</div>
      <div id="map" className="map"></div>
      <div id="distance">{distance}</div>
    </div>
  );
};

export default Contact;