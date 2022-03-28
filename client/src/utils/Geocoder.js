import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const Geocoder = new MapboxGeocoder({
  accessToken: process.env.REACT_APP_MB_ACCESS_TOKEN,
})

export default Geocoder
