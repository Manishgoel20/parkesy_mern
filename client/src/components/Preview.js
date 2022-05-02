import { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { IconButton } from '@mui/material'

const Preview = ({ imagesPreviewUrls, deleteImage }) => {
  const [previewImages, setPreviewImages] = useState([])
  const [dragId, setDragId] = useState('')

  useEffect(() => {
    setPreviewImages([...previewImages, imagesPreviewUrls])
    console.log({ previewImages })
  }, [deleteImage, imagesPreviewUrls])

  const getDerivedStateFromProps = () => {
    if (imagesPreviewUrls !== previewImages) {
      return {
        previewImages: imagesPreviewUrls,
      }
    }
    return null
  }

  const handleOver = (ev) => {
    ev.preventDefault()
  }

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id)
  }

  const moveItem = (from, to) => {
    const f = previewImages.splice(from, 1)[0]
    previewImages.splice(to, 0, f)
    return previewImages
  }

  const handleDrop = (ev) => {
    ev.preventDefault()
    const dragImage = previewImages.find((image) => image.id === dragId)
    const dropImage = previewImages.find(
      (image) => image.id === ev.currentTarget.id
    )
    const arr = moveItem(dragImage.id - 1, dropImage.id - 1)
    setPreviewImages(arr)
  }

  const renderPreview = () => {
    if (previewImages.length > 0) {
      previewImages.map((items, index) => (items.id = index + 1))
    }

    return (
      <>
        {previewImages.length > 0 &&
          previewImages.map((element, index) => {
            return (
              <div
                className="gallery"
                key={index}
                id={element.id}
                draggable
                onDragOver={(e) => handleOver(e)}
                onDragStart={(e) => handleDrag(e)}
                onDrop={(e) => handleDrop(e)}
              >
                <img
                  src={element.file}
                  alt={element.name}
                  width="600"
                  height="400"
                />

                <div className="desc">
                  <div className="image-order">
                    <IconButton onClick={() => deleteImage(element.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            )
          })}
      </>
    )
  }

  return <div className="wrapper">{renderPreview()}</div>
}

export default Preview
