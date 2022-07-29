import './home.css'
import Gallery from "react-image-gallery"
import { FileEarmarkPlus, TrashFill, Images } from 'react-bootstrap-icons'
import { useState, ChangeEvent } from 'react'


interface IGalleryImage {
  thumbnail: string,
  original: string
}

export default function Home() {

  const [galleryImages, setGalleryImages] = useState<IGalleryImage[]>([])

  function handleImageInputOnchage(e: ChangeEvent<HTMLInputElement>) {
    if(!e.target.files) return
    const newGalleryImages = Array.from(e.target.files).map(img => {
      return {
        thumbnail: URL.createObjectURL(img),
        original: URL.createObjectURL(img)
      }
    })

    setGalleryImages(galleryImages => galleryImages.concat(newGalleryImages))
    Array.from(e.target.files).map(async img => URL.revokeObjectURL(await img.text()))
  }
  
  return (
    <div className="container" >
      <Gallery items={galleryImages} />

      {
        galleryImages.length < 1 ? (
          <div className="gallery-thumbnail">
            <Images className="images-icon" /> 
            <span>No selected images</span>
          </div> 
        )
        : null
      }

      {
        galleryImages.length > 1 ? (
          <div 
            className="clean-gallery"
            onClick={() => setGalleryImages([])}
          >
            <span>Clean</span>
            <TrashFill className="clean-icon"/>
          </div>
        )
        : null
      }

      <input
        onChange={ e => handleImageInputOnchage(e) }
        hidden
        id="image-input"
        type="file"
        multiple
        accept="image/*"
      />
      <div className="add-image-cont">
        <div 
          className="add-image-icon-wrap"
          onClick={ () => document.getElementById("image-input")?.click() }
        >
          <FileEarmarkPlus 
            className="add-image-icon"
          /> 
        </div>  
      </div>
    </div>
  )
}
