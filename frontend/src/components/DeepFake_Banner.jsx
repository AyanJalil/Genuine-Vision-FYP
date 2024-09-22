import React, { useState } from 'react'

const DeepFake_Banner = () => {

    const [videoName, setVideoName] = useState('');
    const [videoFile , setVideoFile] = useState(null);

    const handleVideoInputChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setVideoName(file.name);
            setVideoFile(file);
        }

    }

    const onVideoSubmit = () => {
      if (videoFile) {
        alert('Video Selected:' + videoFile.name);
        return;
      }else{
        alert('please select a video')
      }
    }

  return (
    <>
    <div className='h-fit px-2 py-8 md:px-4 bg-black bg-opacity-60'>

      <div className='grid grid-cols-1 md:grid-cols-2 md:h-96 gap-10'>

          <div className='flex justify-center flex-col p-4 gap-8'>
              <p className='text-3xl text-center font-bold'>Be Protected Against Deepfakes!</p>
              <p className='text-lg text-center font-semibold'>We offer an AI tool that can identify if an video is a deepfake or not with <label className='text-red-500'>trained model..</label></p>
          </div>

          <div className='border-detect flex flex-col justify-center items-center p-2'>

              <div class="input-div ">
                  <input class="input" id='videoInput' name="file" accept="video/*" type="file" onChange={handleVideoInputChange} />
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
              </div>

              <h1 className='font-bold my-3 text-red-500'>Video Selected: <label className='text-white font-semibold'>{videoName}</label> </h1>

              <button className='dive-in detect'>
                  <span class="text" onClick={onVideoSubmit}>Detect</span>
              </button>

          </div>

      </div>

    </div>
    
    </>
  )
}

export default DeepFake_Banner
