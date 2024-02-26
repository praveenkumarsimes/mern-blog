import { Button, FileInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiChatDeleteFill } from "react-icons/ri";

const SliderImageUploader = () => {
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [File, setFile] = useState("");
  const [sliderImage, setsliderImage] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    const getImage = await convertToBase64main(File)
    compressImage(getImage, 800, 400, (compressedBase64) => {
      // const res = sliderImage.push(compressedBase64)
      
      let count = sliderImage.length + 1;
      if(count > 2){
        alert('2 image only allowed')
        return false;
      } else {
        setsliderImage(prev => {
          // Check if the imageUrl already exists in the array
          const imageUrlExists = prev.some(image => image.imageUrl === compressedBase64);
        
          // If it doesn't exist, add it to the array
          if (!imageUrlExists) {
            return [...prev, { imageUrl: compressedBase64 }];
          }
        
          // If it exists, just return the previous state without adding the new image
          return prev;
        })
      }
      // This is the "compressed" base64 string
    });
  }

  const deletePic=(i)=>{
    setsliderImage(prv=> prv.filter((_,index)=>index !== i))
  }

  const handlePostImage = async (e) => {
    e.preventDefault();
    let sliderImages = sliderImage;
    console.log(sliderImages)
    try {
      const res = await fetch(`/api/post/createSlider/${currentUser?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sliderImages),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  }
  console.log(sliderImage);
  return (
    <div className='flex flex-col gap-5 items-center justify-center border-4  border-teal-100 border-solid p-4'>
      <div class='flex flex-col sm:flex-row w-full sm:w-[70%] justify-between gap-4'>
        <FileInput
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button
          type='button'
          gradientDuoTone='purpleToBlue'
          size='sm'
          outline
          onClick={handleUpdloadImage}
          disabled={imageUploadProgress}
        >
          {imageUploadProgress ? (
            <div className='w-16 h-16'>
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress || 0}%`}
              />
            </div>
          ) : (
            'Upload Image'
          )}
        </Button>

      </div>

      {/* <div class='flex flex-col sm:flex-row w-full sm:w-[70%] justify-between gap-4'>
        <FileInput
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button
          type='button'
          gradientDuoTone='purpleToBlue'
          size='sm'
          outline
          onClick={handleUpdloadImage}
          disabled={imageUploadProgress}
        >
          {imageUploadProgress ? (
            <div className='w-16 h-16'>
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress || 0}%`}
              />
            </div>
          ) : (
            'Upload Image'
          )}
        </Button>
      </div>

      <div class='flex flex-col sm:flex-row w-full sm:w-[70%] justify-between gap-4'>
        <FileInput
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button
          type='button'
          gradientDuoTone='purpleToBlue'
          size='sm'
          outline
          onClick={handleUpdloadImage}
          disabled={imageUploadProgress}
        >
          {imageUploadProgress ? (
            <div className='w-16 h-16'>
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress || 0}%`}
              />
            </div>
          ) : (
            'Upload Image'
          )}
        </Button>
      </div> */}

      <div className='flex flex-wrap justify-around gap-4 items-center'>
        {sliderImage.length > 0 ? (
          sliderImage?.map((slid, i) => (
            <div key={i} className='h-auto relative w-full sm:h-[200px] sm:w-[300px] p-2 backdrop-sepia flex justify-center items-center'>
              {slid?.imageUrl ? <img src={slid?.imageUrl} className='h-[200px] w-[300px]' alt='no image' /> : "Image Preview"}
              <RiChatDeleteFill onClick={()=>deletePic(i)} className='absolute right-2 top-0 cursor-pointer' color='black' size={30}/>
            </div>
          ))
        ) : (
          <>
            <div className='h-auto w-full sm:h-[200px] sm:w-[300px] p-2 backdrop-sepia flex justify-center items-center'>
              {sliderImage.slice(-3)[0] ? <img src={sliderImage.slice(-3)[0].img} className='h-[200px] w-[300px]' alt='no image' /> : "Image Preview"}
            </div>
          </>
        )}
      </div>

      <div>
        <Button
          type='button'
          gradientDuoTone='purpleToBlue'
          size='sm'
          outline
          onClick={handlePostImage}
          disabled={imageUploadProgress}
        >
          {imageUploadProgress ? (
            <div className='w-16 h-16'>
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress || 0}%`}
              />
            </div>
          ) : (
            'Post Image'
          )}
        </Button>
      </div>
    </div>
  )
}

const convertToBase64main = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

function compressImage(base64Str, maxWidth, maxHeight, callback) {
  const img = new Image();
  img.src = base64Str;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.4);
    callback(compressedBase64);
  };
}



export default SliderImageUploader

