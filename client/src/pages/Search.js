import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import Details from '../layouts/Details'
import { HideBody, ShowBody } from '../utils/HideAppbarFooter'
import { useParams } from 'react-router-dom'
import SkeletonList from '../layouts/SkeletonList'
import NearByParkades from '../components/NearByParkades'
import { getNearbyParkades } from '../globalStore/ducks/parkade'

import MarkerImg from '../assets/images/MarkerImg.png'
import Locate from '../assets/images/locate.png'
import ReactMapboxGl, { GeoJSONLayer, Marker } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as turf from '@turf/turf'
import { useTheme } from '@emotion/react'

const Search = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [zoom, setZoom] = useState(10)
  const [dist, setDist] = useState(10)

  const params = useParams()
  const { lat, lng, stTime, enTime, vehicle } = params
  const { nearbyParkades } = useSelector((state) => state.parkadeData)

  const Mapbox = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MB_ACCESS_TOKEN,
  })

  const centerPoint = [lng, lat]
  var options = {
    steps: 50,
    units: 'kilometers',
  }
  var radius = dist
  const firstCircle = turf.circle(centerPoint, radius, options)

  useEffect(() => {
    HideBody()

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

    return () => ShowBody()
  }, [dist])

  const geojsonStyles = {
    lineLayout: {
      'line-join': 'round',
      'line-cap': 'round',
    },

    linePaint: {
      'line-color': '#a91eff',
      'line-width': 1,
      'line-opacity': 1,
    },

    fillPaint: {
      'fill-color': '#a91eff',
      'fill-opacity': 0.2,
    },
  }

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
        <Grid item md={5} sm={12} xs={12} style={{ height: '100%' }}>
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
                  st={stTime}
                  et={enTime}
                />
              ))
            )}
          </Box>
        </Grid>
        <Grid item md={7} sm={12} xs={12}>
          <Mapbox
            style={`mapbox://styles/ayanluap/cl2m8l5p9005k15lbe8cmt7qj`}
            containerStyle={{
              height: '100%',
              width: '100%',
            }}
            zoom={[zoom]}
            center={[lng, lat * 1 - 0.045]}
          >
            <GeoJSONLayer {...geojsonStyles} data={firstCircle} />
            <Marker coordinates={[lng, lat]} anchor="bottom" offset={-6}>
              <img
                src={Locate}
                alt={`markerLocate`}
                className="mb--marker__locate"
              />
            </Marker>
            {nearbyParkades?.map((parkLoc, id) => (
              <Marker
                key={id}
                coordinates={parkLoc.location.coordinates}
                anchor="bottom"
              >
                <img
                  src={MarkerImg}
                  alt={`marker${parkLoc.name}`}
                  className="mb--marker"
                />
              </Marker>
            ))}
          </Mapbox>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Details params={params} />
      </Box>
    </>
  )
}

export default Search
