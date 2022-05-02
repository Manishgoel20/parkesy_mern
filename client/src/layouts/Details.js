import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

import ShowDetails from '../components/ShowDetails'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlaceName } from '../globalStore/ducks/mapbox'

const Details = ({ params }) => {
  const {
    stTime: startDateTime,
    enTime: endDateTime,
    vehicle,
    lat,
    lng,
  } = params
  const { place } = useSelector((state) => state.mapbox)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlaceName({ lat, lng }))
  }, [lat, lng])

  const handleModalOpen = () => {
    setIsOpen(true)
  }
  const handleModalClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Box m={1} p={1} className="details">
        <Grid container spacing={1} onClick={handleModalOpen}>
          <Grid item md={6} xs={5}>
            <ShowDetails ques="parking location">
              <Typography
                variant="overline"
                color="common.dark"
                className="showDetails__text"
              >
                {place}
              </Typography>
            </ShowDetails>
          </Grid>
          <Grid item md={4} xs={5} width="95%" className="u-truncate">
            <ShowDetails ques="check-in and check-out time">
              <Box display="flex">
                <Box width="50%" className="u-truncate">
                  <Typography
                    variant="overline"
                    color="common.dark"
                    className="showDetails__text"
                  >
                    {new Date(startDateTime).toDateString()}
                  </Typography>
                  <Typography
                    variant="overline"
                    color="common.dark"
                    className="showDetails__text"
                    ml={1}
                  >
                    {`${
                      new Date(startDateTime).getHours() < 10
                        ? '0' + new Date(startDateTime).getHours()
                        : new Date(startDateTime).getHours()
                    }:${
                      new Date(startDateTime).getMinutes() < 10
                        ? '0' + new Date(startDateTime).getMinutes()
                        : new Date(startDateTime).getMinutes()
                    }`}
                  </Typography>
                </Box>

                <Box width="50%" className="u-truncate">
                  <Typography
                    variant="overline"
                    color="common.dark"
                    className="showDetails__text"
                  >
                    {new Date(endDateTime).toDateString()}
                  </Typography>
                  <Typography
                    variant="overline"
                    color="common.dark"
                    className="showDetails__text"
                    ml={1}
                  >
                    {`${
                      new Date(endDateTime).getHours() < 10
                        ? '0' + new Date(endDateTime).getHours()
                        : new Date(endDateTime).getHours()
                    }:${
                      new Date(endDateTime).getMinutes() < 10
                        ? '0' + new Date(endDateTime).getMinutes()
                        : new Date(endDateTime).getMinutes()
                    }`}
                  </Typography>
                </Box>
              </Box>
            </ShowDetails>
          </Grid>
          <Grid item md={2} xs={2}>
            <ShowDetails ques="Vehicle">
              <Typography
                variant="overline"
                color="common.dark"
                className="showDetails__text"
              >
                {vehicle}
              </Typography>
            </ShowDetails>
          </Grid>
        </Grid>
      </Box>

      <Modal isOpen={isOpen} handleClose={handleModalClose}>
        Hello ji
      </Modal>
    </>
  )
}

export default Details
