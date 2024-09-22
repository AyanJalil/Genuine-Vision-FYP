import React from 'react'

const DeepFake_BannerMid = () => {
  return (
    <>
    <div className='h-fit px-2 pt-2 md:pt-6 py-8 md:px-4 bg-black bg-opacity-60'>

    <div className='flex justify-center'>
        <div className="container flex flex-wrap justify-center gap-6">
            <div>
                <img className='h-96 ' src="public/images/deepfake-detector.png" alt="" />
            </div>
            <div className='md:w-2/4 p-2 md:p-4 space-y-4'>
                <p className='font-bold text-white text-3xl'>Deepfakes against individuals.</p>
                <p>Today, Deepfakes are so sophisticated that using our ears and eyes, we cannot differentiate between what’s real and what’s fake.</p>
                <p>Individuals may have lost money to a deepfake scam after receiving messages that mimicked and cloned the videos of their loved ones Using our Deepfake Detector, individuals can analyze videos they receive. Our Deepfake Detector provides a reliable means to filter out AI-generated content, offering probabilities as an initial guide for further investigation. This ensures authenticity in crucial scenarios such as media reporting and legal proceedings.</p>
            </div>
        </div>
    </div>

    <div className='p-6 mt-10 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center  gap-6'>

        <div className='flex gap-4 side-border-detect p-2'>
            <div>
                <label className='flex justify-center rounded-full bg-blue-500 p-2 px-4 font-bold'>1</label>
            </div>
            <div className='space-y-2 p-2 '>
                <p className='font-bold text-purple-600'>No Hidden Cost</p>
                <p>Based on your usage and number of users within your company, we can provide you with the exact pricing model to use our API</p>
            </div>
        </div>
        <div className='flex gap-4 side-border-detect p-2'>
            <div>
                <label className='flex justify-center rounded-full bg-blue-500 p-2 px-4 font-bold'>2</label>
            </div>
            <div className='space-y-2 p-2'>
                <p className='font-bold text-purple-600'>Dedicated Team</p>
                <p>Our engineering team will help you in the integration of our Deepfake Detector API</p>
            </div>
        </div>
        <div className='flex gap-4 side-border-detect p-2'>
            <div>
                <label className='flex justify-center rounded-full bg-blue-500 p-2 px-4 font-bold'>3</label>
            </div>
            <div className='space-y-2 p-2 border-t-1'>
                <p className='font-bold text-purple-600'>Protect Your Company</p>
                <p>Protect your company from the potential deepfake scams in video messages that your employees might receive</p>
            </div>
        </div>

     
    </div>

    </div>
    </>
  )
}

export default DeepFake_BannerMid
