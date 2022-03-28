import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

import ShowDetails from '../components/ShowDetails'
import Modal from '../components/Modal'
import { useState } from 'react'

const Details = () => {
  const [isOpen, setIsOpen] = useState(false)
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
                Signature bridge, Delhi
              </Typography>
            </ShowDetails>
          </Grid>
          <Grid item md={4} xs={5}>
            <ShowDetails ques="check-in and check-out time">
              <Box display="flex">
                <Box width="50%" className="u-truncate">
                  <Typography
                    variant="overline"
                    color="common.dark"
                    className="showDetails__text"
                  >
                    Thu 24 Mar 2022
                  </Typography>
                  <Typography
                    variant="overline"
                    color="common.dark"
                    className="showDetails__text"
                    ml={1}
                  >
                    22:30
                  </Typography>
                </Box>

                <Box width="50%" className="u-truncate">
                  <Typography
                    variant="overline"
                    color="common.dark"
                    className="showDetails__text"
                  >
                    Thu 25 Mar 2022
                  </Typography>
                  <Typography
                    variant="overline"
                    color="common.dark"
                    className="showDetails__text"
                    ml={1}
                  >
                    22:30
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
                Car
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
