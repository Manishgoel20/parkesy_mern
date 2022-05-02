import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from '@mui/material'
import { Box } from '@mui/system'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { useEffect, useState } from 'react'
import {
  getAutocomplete,
  getPlaceName,
  setGeoLocation,
} from '../globalStore/ducks/mapbox'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../globalStore/ducks/toast'

const CustomGeocoder = ({ id, label }) => {
  const [text, setText] = useState('')
  const [display, setDisplay] = useState('initial')
  const [locLoading, setLocLoading] = useState(false)

  const dispatch = useDispatch()
  const { autoComplete, place } = useSelector((state) => state.mapbox)

  useEffect(() => {
    getMyLocation()
  }, [])

  useEffect(() => {
    dispatch(getAutocomplete(text))
  }, [text])

  useEffect(() => {
    setText(place)
  }, [place])

  const setTextHandler = (place) => {
    setText(place)
    setDisplay('none')
  }

  const getMyLocation = () => {
    setLocLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const data = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        dispatch(getPlaceName(data))
        setLocLoading(false)
        setDisplay('none')
      },
      (err) => {
        setLocLoading(false)
        dispatch(setToast(true, 'info', err.message))
      },
      {
        enableHighAccuracy: true,
        enableGeolocation: true,
      }
    )
  }

  return (
    <label htmlFor={id}>
      <Box width="100%" className="geocoder">
        <Typography variant="overline" style={{ lineHeight: 0 }}>
          {label}
        </Typography>

        <Box width="100%" display="flex" justifyContent="space-between">
          <Box width="100%" className="geocoder__controller">
            <input
              type="text"
              id={id}
              name={id}
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                setDisplay('initial')
              }}
              placeholder="Search by Address, Place or City"
              className="geocoder__input"
              required
            />
          </Box>

          <Box
            className="geocoder__loc"
            onClick={() => {
              getMyLocation()
              setText(place)
              setDisplay('none')
            }}
          >
            {locLoading ? (
              <CircularProgress
                color="secondary"
                size={20}
                style={{ transform: 'translateY(-60%)' }}
              />
            ) : (
              <MyLocationIcon
                color="tertiary"
                fontSize="small"
                style={{ transform: 'translateY(-40%)' }}
              />
            )}
          </Box>
        </Box>

        {autoComplete?.length > 0 && (
          <Box
            width="100%"
            className="geocoder__autocomplete"
            display={display}
          >
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {autoComplete.map((data, id) => (
                <ListItem disablePadding key={id}>
                  <ListItemButton
                    onClick={() => {
                      setTextHandler(data.place_name)
                      const setData = {
                        place: data.place_name,
                        lat: data.center[1],
                        lng: data.center[0],
                      }
                      dispatch(setGeoLocation(setData))
                    }}
                  >
                    <ListItemText primary={data.place_name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </label>
  )
}

export default CustomGeocoder
