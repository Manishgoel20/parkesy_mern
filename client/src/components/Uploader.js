import { useDispatch } from 'react-redux'
import { setToast } from '../globalStore/ducks/toast'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

const Uploader = ({ imagesPreviewUrls, setImagesPreviewUrls }) => {
  const dispatch = useDispatch()

  const filesSelectedHandler = (e) => {
    if (checkMimeType(e)) {
      const files = Array.from(e.target.files)
      files.forEach((file, index) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const result = {
            file: reader.result,
            size: file.size,
            name: file.name,
            id: index + 1,
          }
          setImagesPreviewUrls([...imagesPreviewUrls, result])
          console.log({ result, id: result.id })
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const checkMimeType = (event) => {
    const { files } = event.target
    let err = ''
    const types = ['image/png', 'image/jpeg', 'image/jpg']
    for (let x = 0; x < files.length; x += 1) {
      if (types.every((type) => files[x].type !== type)) {
        err += `${files[x].type} is not a supported format`
      }
    }

    if (err !== '') {
      event.target.value = null
      dispatch(setToast(true, 'error', err))
      return false
    }
    return true
  }

  return (
    <>
      <Box className="picture">
        <input
          type="file"
          name="file"
          id="file"
          className="picture__input"
          onChange={filesSelectedHandler}
          accept="image/png, image/jpeg, image/jpg"
          multiple
        />
        <Box className="picture__info">
          <Box className="picture__icon">
            <AddPhotoAlternateOutlinedIcon
              color="secondary"
              style={{ fontSize: '8rem' }}
            />
          </Box>
          <Typography variant="h6" className="picture__text" align="center">
            Drag your images here or click in this area.
          </Typography>
          <Typography variant="body2" align="center" color="grey">
            (You can add atmost 3 Images)
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default Uploader
