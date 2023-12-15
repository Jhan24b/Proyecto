import google from 'google.maps';

function geocodeLatLng(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    return geocoder
      .geocode({ location: { lat, lng } })
      .then((response) => {
        if (response.results[0]) {
          return response.results[0].formatted_address;
        } else {
          return null;
        }
      })
      .catch((e) => {
        console.error("Geocoder failed due to:", e);
        return null;
      });
  }

export default geocodeLatLng;