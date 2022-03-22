import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const mapboxgl = {
  accessToken:
    'pk.eyJ1IjoiYXlhbmx1YXAiLCJhIjoiY2wwdmNydGV5MHRvdjNibjFpdmZjM3pwMCJ9.k2uGjLU46XOCTL6BRMYdNw',
}

const Geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
})

export default Geocoder
