import { MapContainer, TileLayer, Marker, useMapEvents, Circle, useMap, useMapEvent } from 'react-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { useState, useRef, useEffect } from 'react'
import 'leaflet-geosearch/dist/geosearch.css'
import './LocationPicker.css'
import { Icon } from 'leaflet'
import { assets } from '../../assets/assets.js';
import { toast } from 'react-toastify'

const LocationPicker = ({ setAddress, address }) => {
    const [position, setPosition] = useState([44.3183176, 23.7928514]);

    useEffect(() => {
      if (address.lat && address.lng) {
        setPosition([Number(address.lat), Number(address.lng)]);
      }
    }, [address.lat, address.lng]);

    function ChangeView({ center }) {
      const map = useMap();
      useEffect(() => {
        map.setView(center); 
      }, [center, map]);
      return null;
    }
    

    const customIcon = new Icon({
        iconUrl: `${assets.location_pin}`,
        iconSize: [38, 38],
    })

    function LocationMarker() {
        useMapEvents({
          click(e) {
            setPosition([e.latlng.lat, e.latlng.lng])
            reverseGeocode(e.latlng)
          }
        })
        return <Marker position={position} /*icon={customIcon}*/></Marker>
    }

    const reverseGeocode = async ({ lat, lng }) => {
      const res = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${import.meta.env.VITE_LOCATIONIQ_KEY}&lat=${lat}&lon=${lng}&format=json`
      );
      
      const data = await res.json();
      if(!data.address.road && !data.address.residential)
        toast.error('Eroare. Te rugam sa selectezi o alta locatie.');
      setAddress(prev => ({
        ...prev,
        lat: data.lat || "",
        lng: data.lon || "",
        oras: data.address.city || data.address.town || "",
        localitate: data.address.city || data.address.village || "",
        cartier: data.address.suburb || data.address.village || "",
        strada: data.address.road || data.address.residential || "",
        numar: data.address.house_number || "",
        cladire: data.address.apartments || data.address.building || "",
        scara: "",
        apartament: "",
        telefon: prev.telefon,
      }))
  };
  

    return(
      
        <MapContainer center={position} zoom={15} className='location-picker-map'>
            <TileLayer
              attribution='&copy; LocationIQ & OpenStreetMap contributors'
              url={`https://tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${import.meta.env.VITE_LOCATIONIQ_KEY}`}
            />
            <ChangeView center={position} />
            <LocationMarker />
        </MapContainer>
    )
}

export default LocationPicker;