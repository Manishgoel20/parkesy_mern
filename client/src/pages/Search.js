import { Box, Grid } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import GeoInput from '../components/GeoInput'
import Details from '../layouts/Details'
import { HideBody, ShowBody } from '../utils/HideAppbarFooter'

const Search = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(77.2177)
  const [lat, setLat] = useState(28.6304)
  const [zoom, setZoom] = useState(12)

  useEffect(() => {
    HideBody()
    if (map.current) return
    map.current = new mapboxgl.Map({
      accessToken: process.env.REACT_APP_MB_ACCESS_TOKEN,
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })

    return () => ShowBody()
  }, [])

  return (
    <>
      <Grid container spacing={0}>
        <Grid item md={5} sm={12} xs={12}></Grid>
        <Grid item md={7} sm={12} xs={12}>
          <Box ref={mapContainer} className="mapbox_container"></Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Details />
      </Box>
    </>
  )
}

export default Search
