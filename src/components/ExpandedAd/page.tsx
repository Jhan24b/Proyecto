import { useState, useEffect } from "react";
import {APIProvider, useMapsLibrary} from "@vis.gl/react-google-maps";

function page(){
    return(
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Geocoding/>
      </APIProvider>
    );
  }

  function Geocoding(){
    const geoCodingApiLoaded = useMapsLibrary("geocoding");
    const [geocodingService, setGeocodingService] = useState<google.maps.Geocoder>();
    const [geocodingResult, setGeocodingResult] = useState<google.maps.GeocoderResult>();
    return <div>Geocoding</div>
  }