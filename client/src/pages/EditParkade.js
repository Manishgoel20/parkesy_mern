import { useEffect, useState } from 'react'
import { Button, Step, StepLabel, Stepper } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ParkDetailsForm from '../layouts/ParkDetailsForm'
import ParkLoc from '../layouts/ParkLoc'
import ParkSlotDetails from '../layouts/ParkSlotDetails'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  getSingleParkade,
  resetParkade,
  updateParkade,
} from '../globalStore/ducks/parkade'
import SkeletonForm from '../layouts/SkeletonForm'

const validationSchema1 = yup.object({
  parkName: yup
    .string()
    .min(10, 'Parkade Name must between 10-40 letters')
    .max(40, 'Parkade Name must between 10-40 letters')
    .required('Parkade Name Required'),
  parkDesc: yup
    .string()
    .min(20, 'Parkade Description must atleast 20 letters')
    .required('Parkade Description Required'),
})

const validationSchema2 = yup.object({
  parkAdd: yup
    .string()
    .min(5, 'Parkade Name must between 5-80 letters')
    .max(80, 'Parkade Name must between 5-80 letters')
    .required('Parkade Address Required'),
  parkLat: yup
    .number()
    .min(-90, 'Not a valid Latitude')
    .max(90, 'Not a valid Latitude')
    .required('Parkade Latitude Required'),
  parkLng: yup
    .number()
    .min(-180, 'Not a valid Longitude')
    .max(180, 'Not a valid Longitude')
    .required('Parkade Longitude Required'),
  parkWeeks: yup.array().of(yup.boolean()).required('Parkade Weeks Required'),
  parkTimings: yup.array().of(yup.string()).required('Timings are Required'),
})
const validationSchema3 = yup.object({
  bikeSlots: yup
    .number()
    .min(5, 'Min bike slots should be 5')
    .required('Required'),
  bikeSlotsMP: yup.number().required('Required'),
  bikeSlotsEP: yup.number().required('Required'),
  bikeSlotsNP: yup.number().required('Required'),
  carSlots: yup
    .number()
    .min(5, 'Min car slots should be 10')
    .required('Required'),
  carSlotsMP: yup.number().required('Required'),
  carSlotsEP: yup.number().required('Required'),
  carSlotsNP: yup.number().required('Required'),
  busSlots: yup.number(),
  busSlotsMP: yup.number(),
  busSlotsEP: yup.number(),
  busSlotsNP: yup.number(),
})

const EditParkade = () => {
  const params = useParams()
  const { parkadeId } = params
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { parkade } = useSelector((state) => state.parkadeData)
  const { userInfo } = useSelector((state) => state.userAuth)

  useEffect(() => {
    dispatch(resetParkade())
    dispatch(getSingleParkade(parkadeId))
  }, [parkadeId])

  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState({})
  const [openingWeeks, setOpeningWeeks] = useState([])
  const [timings, setTimings] = useState([])
  const [vehicleSlots, setVehicleSlots] = useState({})
  const [pricing, setPricing] = useState({})
  const [features, setFeatures] = useState({})
  const [images, setImages] = useState([])

  const opt = ['Details', 'Location', 'Features']

  const handlePrev = () => {
    setStep((step) => step - 1)
  }

  // Handling form
  const formik1 = useFormik({
    enableReinitialize: true,
    initialValues: {
      parkName: parkade ? parkade.name : '',
      parkDesc: parkade ? parkade.description : '',
    },
    validationSchema: validationSchema1,
    onSubmit: (values, { setSubmitting }) => {
      setName(values.parkName)
      setDescription(values.parkDesc)
      setStep((step) => step + 1)
    },
  })

  const formik2 = useFormik({
    enableReinitialize: true,
    initialValues: {
      parkAdd: parkade ? parkade.location.address : '',
      parkLat:
        parkade && parkade.location.coordinates
          ? parkade.location.coordinates[1]
          : '',
      parkLng:
        parkade && parkade.location.coordinates
          ? parkade.location.coordinates[0]
          : '',
      parkWeeks: parkade
        ? parkade.openingWeeks
        : [true, true, true, true, true, false, false],
      parkTimings:
        parkade && parkade.timings ? parkade.timings : ['05:00', '23:00'],
    },
    validationSchema: validationSchema2,
    onSubmit: (values, { setSubmitting }) => {
      setStep((step) => step + 1)
      const loc = {
        type: 'Point',
        coordinates: [values.parkLng, values.parkLat],
        address: values.parkAdd,
      }
      setLocation(loc)

      setOpeningWeeks(values.parkWeeks)
      setTimings(values.parkTimings)
    },
  })

  const formik3 = useFormik({
    enableReinitialize: true,
    initialValues: {
      bikeSlots: parkade ? parkade.vehicleSlots.bike : 5,
      carSlots: parkade ? parkade.vehicleSlots.car : 10,
      busSlots: parkade ? parkade.vehicleSlots.bus : 0,
      bikeSlotsMP:
        parkade && parkade.pricing.bike[0] ? parkade.pricing.bike[0] : 20,
      bikeSlotsEP:
        parkade && parkade.pricing.bike[1] ? parkade.pricing.bike[1] : 10,
      bikeSlotsNP:
        parkade && parkade.pricing.bike[2] ? parkade.pricing.bike[2] : 15,
      carSlotsMP:
        parkade && parkade.pricing.car[0] ? parkade.pricing.car[0] : 30,
      carSlotsEP:
        parkade && parkade.pricing.car[1] ? parkade.pricing.car[1] : 20,
      carSlotsNP:
        parkade && parkade.pricing.car[2] ? parkade.pricing.car[2] : 25,
      busSlotsMP:
        parkade && parkade.pricing.bus[0] ? parkade.pricing.bus[0] : 40,
      busSlotsEP:
        parkade && parkade.pricing.bus[1] ? parkade.pricing.bus[1] : 30,
      busSlotsNP:
        parkade && parkade.pricing.bus[2] ? parkade.pricing.bus[2] : 35,
      is24hr: parkade ? parkade.features.is24hr : true,
      flexibleEntry: parkade ? parkade.features.flexibleEntry : false,
      isCctv: parkade ? parkade.features.isCctv : false,
    },
    validationSchema: validationSchema3,
    onSubmit: (values, { setSubmitting }) => {
      // dispatch(resetParkade())

      const slotData = {
        bike: values.bikeSlots,
        car: values.carSlots,
        bus: values.busSlots,
      }
      const priceData = {
        bike: [values.bikeSlotsMP, values.bikeSlotsEP, values.bikeSlotsNP],
        car: [values.carSlotsMP, values.carSlotsEP, values.carSlotsNP],
        bus: [values.busSlotsMP, values.busSlotsEP, values.busSlotsNP],
      }
      const featureData = {
        is24hr: values.is24hr,
        flexibleEntry: values.flexibleEntry,
        isCctv: values.isCctv,
      }
      setVehicleSlots(slotData)
      setPricing(priceData)
      setFeatures(featureData)

      const data = {
        name,
        description,
        location,
        vehicleSlots: slotData,
        pricing: priceData,
        openingWeeks,
        timings,
        features: featureData,
        images,
      }

      // console.log(data)

      dispatch(
        updateParkade(parkadeId, userInfo._id, data, setSubmitting, navigate)
      )
    },
  })

  return (
    <>
      {parkade ? (
        <>
          <Box text="center">
            <Stepper activeStep={step} alternativeLabel>
              {opt.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box>
            {step === 0 && (
              <form onSubmit={formik1.handleSubmit}>
                <ParkDetailsForm formik={formik1} />

                <Box mt={2} display="flex" justifyContent="space-between">
                  <Box></Box>

                  <Box>
                    <Button type="submit" variant="contained" color="secondary">
                      next
                    </Button>
                  </Box>
                </Box>
              </form>
            )}

            {step === 1 && (
              <form onSubmit={formik2.handleSubmit}>
                <ParkLoc formik={formik2} />

                <Box mt={2} display="flex" justifyContent="space-between">
                  <Box>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => handlePrev()}
                    >
                      Back
                    </Button>
                  </Box>

                  <Box>
                    <Button type="submit" variant="contained" color="secondary">
                      next
                    </Button>
                  </Box>
                </Box>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={formik3.handleSubmit}>
                <ParkSlotDetails formik={formik3} />

                <Box mt={2} display="flex" justifyContent="space-between">
                  <Box>
                    <Button variant="contained" onClick={() => handlePrev()}>
                      Back
                    </Button>
                  </Box>

                  <Box>
                    <LoadingButton
                      loading={formik3.isSubmitting}
                      color="secondary"
                      type="submit"
                      variant="contained"
                    >
                      Update
                    </LoadingButton>
                  </Box>
                </Box>
              </form>
            )}
          </Box>
        </>
      ) : (
        <SkeletonForm />
      )}
    </>
  )
}

export default EditParkade
