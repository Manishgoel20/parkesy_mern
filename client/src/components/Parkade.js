import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTheme } from '@emotion/react'

import ImagePlace from '../assets/images/imgPlace1.jpg'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingButton from '@mui/lab/LoadingButton'
import { deleteParkade } from '../globalStore/ducks/parkade'

const Parkade = ({ parkade, setActions, badge, approvedBtn }) => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [delLoader, setDelLoader] = useState(false)
  const [open, setOpen] = useState(false)
  const [approve, setApprove] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const deleteHandler = (id) => {
    setDelLoader(true)
    dispatch(deleteParkade(id, setDelLoader))
    handleClose()
  }

  return (
    <Box m={1} mb={2} className="card">
      <Grid container spacing={2} width="100%" height="100%">
        <Grid item md={2} xs={4} width="100%" height="100%">
          <img
            className="card__img"
            src={parkade.images.length > 0 ? parkade.images[0] : ImagePlace}
            alt={`parkade${parkade.name}`}
          />
        </Grid>
        <Grid
          item
          md={10}
          xs={8}
          container
          direction="column"
          justifyContent="space-between"
        >
          <Box width="100%">
            <Typography
              variant="h6"
              color={theme.palette.common.dark}
              className="u-truncate"
            >
              {parkade.name}
            </Typography>
            <Typography
              variant="body1"
              color={theme.palette.common.dark}
              className="u-truncate"
            >
              {parkade.description}
            </Typography>

            <Box mt={1} display="flex">
              <Rating
                color="secondary"
                text="Ratings"
                value={parkade.ratingsAvg}
              />
              <Box mx={1}>
                <Divider orientation="vertical" />
              </Box>
              <Box display="flex" alignItems="baseline">
                <Typography variant="body1">
                  {parkade.ratingsQuantity}
                </Typography>
                <Typography variant="subtitle2">&nbsp;Reviews</Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box mt={1}>
              <Tooltip title="24/7 Facility" placement="top">
                <TimelapseIcon
                  style={{ marginRight: 10 }}
                  color={parkade.features.is24hr ? 'secondary' : 'disabled'}
                />
              </Tooltip>
              <Tooltip title="CCTV" placement="top">
                <PhotoCameraFrontIcon
                  style={{ marginRight: 10 }}
                  color={parkade.features.isCctv ? 'secondary' : 'disabled'}
                />
              </Tooltip>
              <Tooltip title="Flexible Entry" placement="top">
                <TransferWithinAStationIcon
                  style={{ marginRight: 10 }}
                  color={
                    parkade.features.flexibleEntry ? 'secondary' : 'disabled'
                  }
                />
              </Tooltip>
            </Box>

            <Box display="flex" alignItems="center">
              {approvedBtn && (
                <Box mt={1}>
                  <FormControlLabel
                    control={
                      <Switch
                        color="secondary"
                        checked={parkade.approved}
                        // onChange={aprroveHandleChange}
                        name="approve"
                      />
                    }
                    label="Approve"
                  />
                </Box>
              )}

              {badge && (
                <Box mt={1}>
                  <Chip
                    color={parkade.approved ? 'success' : 'error'}
                    variant="outlined"
                    size="small"
                    label={parkade.approved ? 'Approved' : 'Requested'}
                  ></Chip>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {setActions && (
        <>
          <Box display="flex" className="card__actions">
            <Box mr={1}>
              <Link to={`/user/my-parkades/${parkade._id}/edit`}>
                <IconButton color="secondary">
                  <EditIcon />
                </IconButton>
              </Link>
            </Box>
            <IconButton color="error" onClick={() => setOpen(true)}>
              <DeleteIcon />
            </IconButton>
          </Box>

          <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
            <DialogTitle>Delete Parkade</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete Parkade{' '}
                <strong>{parkade.name}</strong>?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="common" onClick={handleClose}>
                Close
              </Button>

              <LoadingButton
                loading={delLoader}
                variant="contained"
                color="error"
                onClick={() => {
                  deleteHandler(parkade._id)
                }}
              >
                Delete
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  )
}

export default Parkade
