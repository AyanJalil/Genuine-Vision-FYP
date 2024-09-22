import React from 'react'

const Title = () => {
  return (
    <div className='h-fit px-2 py-8 md:px-4 bg-black bg-opacity-60'>

      <div className='space-y-6 py-8 text-center flex flex-col items-center'>
        <p className='text-2xl md:text-3xl font-bold shadow'>Genuine Vision</p>
        <p className='text-xl md:text-2xl font-semibold'>Empowering Your Vision with Authenticity</p>
        <button className='dive-in'>
            <span class="text">Dive-In</span>
        </button>
      </div>

      <div className='flex flex-wrap justify-around gap-8 md:gap-20 py-4 px-2 md:py-12 md:px-12'>
        <div className='flex flex-col justify-center w-96'>
            <p className='text-xl md:text-2xl font-bold'>Why Genuine Vision?</p>
            <span className='text-lg md:text-xl font-semibold text-justify pt-4'>In an age of digital manipulation, our advanced deepfake detection technology helps you stay informed and safe. With industry-leading accuracy, our tool quickly identifies fake videos, giving you the confidence to separate fact from fiction.</span>
        </div>
        <div className='md:flex justify-end'>
            <img className='why-gv side-border-detect shadow-2xl rounded-lg' src="/images/a-deepfake-ai-system-.jpeg" alt="" />
        </div>
      </div>

      <div className='flex flex-wrap justify-around gap-8 md:gap-20 py-4 px-2 md:py-12 md:px-12'>
            <div className='md:flex justify-end'>
                <img className='why-gv side-border-detect shadow-2xl rounded-lg' src="/images/a-cinematic-shot-of-a-person.jpeg" alt="" />
            </div>
            <div className='flex flex-col justify-center w-96'>
                <p className='text-xl md:text-2xl font-bold'>How It Works?</p>
                <span className='text-lg md:text-xl font-semibold text-justify pt-4'>Using state-of-the-art algorithms, our tool analyzes video content frame by frame, detecting even the most subtle signs of manipulation. You’ll receive a comprehensive analysis report within seconds.</span>
            </div>
      </div>

      <div className='flex flex-wrap justify-around gap-8 md:gap-20 py-4 px-2 md:py-12 md:px-12'>
        <div className='flex flex-col justify-center w-96'>
            <p className='text-xl md:text-2xl font-bold'>Data Privacy & Security</p>
            <span className='text-lg md:text-xl font-semibold text-justify pt-4'>We prioritize your privacy and security. All analyses are conducted in a secure environment, and your data is never shared with third parties.</span>
        </div>
        <div className='md:flex justify-end'>
            <img className='why-gv side-border-detect shadow-2xl rounded-lg' src="/images/a-3d-render-of-a-futuristic-.jpeg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Title
