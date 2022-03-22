import { useEffect, useState } from 'react'
import Geocoder from '../utils/Geocoder'
import MyLocationIcon from '@mui/icons-material/MyLocation'

const GeoInput = () => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    Geocoder.addTo('.geocoder_container')
  }, [])

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser')
    } else {
      setStatus('Please allow our app to get your location')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null)
          setLat(position.coords.latitude)
          setLng(position.coords.longitude)
        },
        () => {
          setStatus('Unable to retrieve your location')
        },
        { enableHighAccuracy: true }
      )
    }
  }

  return (
    <div className="geocoder_container">
      <MyLocationIcon onClick={getLocation} fontSize="small" />
    </div>
  )
}

export default GeoInput
