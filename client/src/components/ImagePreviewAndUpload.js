import { useState } from 'react'
import { setToast } from '../globalStore/ducks/toast'
import Preview from './Preview'
import Uploader from './Uploader'

const ImagePreviewAndUpload = () => {
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState([])

  // const imagesPreviewUrlsHandler = (result) => {
  //   let imgs = []
  //   // setImagesPreviewUrls([...imagesPreviewUrls, result])
  //   imgs.push(result)
  //   console.log({ imagesPreviewUrls })
  // }

  // const deleteImage = (id) => {
  //   if (imagesPreviewUrls.length > 0) {
  //     const filterImages = imagesPreviewUrls.filter((image) => image.id !== id)
  //     setImagesPreviewUrls(filterImages)
  //   }
  // }

  return (
    <div>
      <Uploader
        imagesPreviewUrls={imagesPreviewUrls}
        setImagesPreviewUrls={setImagesPreviewUrls}
      />
      {/* {imagesPreviewUrls.length > 0 ? (
        <Preview
          imagesPreviewUrls={imagesPreviewUrls}
          deleteImage={deleteImage}
        /> 
      ) : null} */}
    </div>
  )
}

export default ImagePreviewAndUpload
