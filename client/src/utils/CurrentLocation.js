import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCoordinates } from '../globalStore/ducks/search'

const CurrentLocation = () => {
  const [status, setStatus] = useState(null)
  const dispatch = useDispatch()

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser')
    } else {
      setStatus('Please allow our app to get your location')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null)
          dispatch(
            setCoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          )
        },
        () => {
          setStatus('Unable to retrieve your location')
        },
        { enableHighAccuracy: true }
      )
    }
  }
  return (
    <>
      <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates</h1>
      <p>{status}</p>
    </>
  )
}

export default CurrentLocation
