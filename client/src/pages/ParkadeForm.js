import { Button, Step, StepLabel, Stepper } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'

import { createParkade } from '../globalStore/ducks/parkade'
import ParkDetailsForm from '../layouts/ParkDetailsForm'
import ParkLoc from '../layouts/ParkLoc'
import ParkSlotDetails from '../layouts/ParkSlotDetails'
import ImagePreviewAndUpload from '../components/ImagePreviewAndUpload'

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

const ParkadeForm = () => {
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

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const opt = ['Details', 'Location', 'Features']

  const handlePrev = () => {
    setStep((step) => step - 1)
  }

  // Handling form
  const formik1 = useFormik({
    initialValues: {
      parkName: '',
      parkDesc: '',
    },
    validationSchema: validationSchema1,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setName(values.parkName)
      setDescription(values.parkDesc)
      setStep((step) => step + 1)
    },
  })

  const formik2 = useFormik({
    // enableReinitialize: true,
    initialValues: {
      parkAdd: '',
      parkLat: '',
      parkLng: '',
      parkWeeks: [true, true, true, true, true, false, false],
      parkTimings: ['05:00', '23:00'],
    },
    validationSchema: validationSchema2,
    onSubmit: (values, { resetForm, setSubmitting }) => {
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
      bikeSlots: 5,
      bikeSlotsMP: 20,
      bikeSlotsEP: 10,
      bikeSlotsNP: 15,
      carSlots: 10,
      carSlotsMP: 30,
      carSlotsEP: 20,
      carSlotsNP: 25,
      busSlots: 0,
      busSlotsMP: 40,
      busSlotsEP: 30,
      busSlotsNP: 35,
      is24hr: true,
      flexibleEntry: false,
      isCctv: false,
    },
    validationSchema: validationSchema3,
    onSubmit: (values, { resetForm, setSubmitting }) => {
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

      dispatch(createParkade(data, resetForm, setSubmitting, navigate))
    },
  })

  return (
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
            <Box mt={2}>
              <ImagePreviewAndUpload />
            </Box>

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
                <Button variant="contained" onClick={() => handlePrev()}>
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
                  variant="contained"
                  type="submit"
                >
                  Send for Approval
                </LoadingButton>
              </Box>
            </Box>
          </form>
        )}
      </Box>
    </>
  )
}

export default ParkadeForm
