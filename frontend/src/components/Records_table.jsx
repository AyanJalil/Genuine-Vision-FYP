import React from 'react'

const Records_table = () => {
  return (
    <div className='h-screen px-2 py-8 md:px-4 bg-black bg-opacity-60'>

      <p className='text-2xl font-bold text-center my-4'>Detection Records</p>
      
      <div className="overflow-x-auto p-8 flex justify-center">
        <table class="md:w-3/4 bg-black bg-opacity-70 border-collapse side-border-detect border-2 rounded-md border-slate-400 ...">
          <thead>
            <tr>
              <th class="p-2 border border-slate-300 ..."></th>
              <th class="p-2 border border-slate-300 ...">Date</th>
              <th class="p-2 border border-slate-300 ...">File Name</th>
              <th class="p-2 border border-slate-300 ...">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className=''>
              <td class="w-8 text-center p-4  border border-slate-300 ...">1</td>
              <td class="p-4 text-center border border-slate-300 ...">19-July-2024</td>
              <td class="p-4 text-center border border-slate-300 ...">cn-toons.mp4</td>
              <td class="p-4 text-center border border-slate-300 ...">cn-toons.mp4</td>
            </tr>
            <tr className=''>
              <td class="w-8 text-center p-4  border border-slate-300 ...">2</td>
              <td class="p-4 text-center border border-slate-300 ...">19-July-2024</td>
              <td class="p-4 text-center border border-slate-300 ...">cn-toons.mp4</td>
              <td class="p-4 text-center border border-slate-300 ...">cn-toons.mp4</td>
            </tr>
            <tr className=''>
              <td class="w-8 text-center p-4  border border-slate-300 ...">3</td>
              <td class="p-4 text-center border border-slate-300 ...">19-July-2024</td>
              <td class="p-4 text-center border border-slate-300 ...">cn-toons.mp4</td>
              <td class="p-4 text-center border border-slate-300 ...">cn-toons.mp4</td>
            </tr>
            <tr className=''>
              <td class="w-8 text-center p-4  border border-slate-300 ...">4</td>
              <td class="p-4 text-center border border-slate-300 ...">19-July-2024</td>
              <td class="p-4 text-center border border-slate-300 ...">cn-toons.mp4</td>
              <td class="p-4 text-center border border-slate-300 ...">cn-toons.mp4</td>
            </tr>
            <tr className=''>
              <td class="w-8 text-center p-4  border border-slate-300 ...">5</td>
              <td class="p-4 text-center border border-slate-300 ...">19-July-2024</td>
              <td class="p-4 text-center border border-slate-300 ...">cn-toons.mp4</td>
              <td class="p-4 text-center border border-slate-300 ...">cn-toons.mp4</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Records_table
