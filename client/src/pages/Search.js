import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import mapboxgl from 'mapbox-gl'

import Details from '../layouts/Details'
import { HideBody, ShowBody } from '../utils/HideAppbarFooter'
import { useParams } from 'react-router-dom'
import SkeletonList from '../layouts/SkeletonList'
import NearByParkades from '../components/NearByParkades'
import { getNearbyParkades } from '../globalStore/ducks/parkade'

const Search = () => {
  const dispatch = useDispatch()
  const mapContainer = useRef(null)
  const [zoom, setZoom] = useState(13)
  const [dist, setDist] = useState(10)

  const params = useParams()
  const { lat, lng, stTime, enTime, vehicle } = params
  const { nearbyParkades } = useSelector((state) => state.parkadeData)

  useEffect(() => {
    HideBody()
    const map = new mapboxgl.Map({
      accessToken: process.env.REACT_APP_MB_ACCESS_TOKEN,
      container: mapContainer.current,
      style: 'mapbox://styles/ayanluap/cl2m8l5p9005k15lbe8cmt7qj',
      center: [lng, lat],
      zoom: zoom,
    })

    dispatch(
      getNearbyParkades({
        lat,
        lng,
        st: moment(new Date(stTime))
          .add(5, 'hours')
          .add(30, 'minutes')
          .toISOString(),
        et: moment(new Date(enTime))
          .add(5, 'hours')
          .add(30, 'minutes')
          .toISOString(),
        vehicle,
        dist,
      })
    )

    let bounds = new mapboxgl.LngLatBounds()
    nearbyParkades?.forEach((parkLoc) => {
      // create marker
      const marker = document.createElement('div')
      marker.className = 'marker'

      // add marker
      new mapboxgl.Marker({ element: marker, anchor: 'bottom' })
        .setLngLat(parkLoc.location.coordinates)
        .addTo(map)
      // add bounds to map
      bounds.extend(parkLoc.location.coordinates)
    })

    console.log(map)

    return () => ShowBody()
  }, [])

  return (
    <>
      <Grid
        container
        spacing={0}
        style={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          style={{
            height: '100%',
          }}
        >
          <Box p={2} pb={25} style={{ height: '100%', overflow: 'auto' }}>
            {nearbyParkades === null ? (
              <SkeletonList lt={4} rt={8} />
            ) : nearbyParkades?.length <= 0 ? (
              <Box align="center">
                <Typography variant="body1">No parkades to show!</Typography>
              </Box>
            ) : (
              nearbyParkades.map((parkade, id) => (
                <NearByParkades
                  key={id}
                  parkade={parkade}
                  vehicle={vehicle}
                  index={id}
                />
              ))
            )}
          </Box>
        </Grid>
        <Grid item md={7} sm={12} xs={12}>
          <Box
            zIndex={-100}
            ref={mapContainer}
            className="mapbox_container"
          ></Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Details params={params} />
      </Box>
    </>
  )
}

export default Search
