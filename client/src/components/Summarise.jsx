import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Summarise() {
  const [summary,setSummary] = useState('')
  const query = useQueryClient()
  const todos = query.getQueryData(['todos'])
  const {mutate,data, isPending} = useMutation({
    mutationFn:(list)=>{
      return axios.post(`${import.meta.env.VITE_API_URL}/summarize`,{items:list})
    },
    onSuccess:(data)=>{
      setSummary(data.data.summary)
    }
  })
  function handleSummary(){
    const items = todos.data.map(todos=>todos.task)
    mutate(items)
  }
  if(!todos?.data.length) return
  return (
    <div className='mt-8 flex flex-col items-center'>
        <div>
            <button onClick={handleSummary} className='bg-linear-to-tr from-purple-600 flex gap-2 cursor-pointer to-blue-500 px-4 py-4 rounded-xl text-white'>{summary? "Summarise again":"Summarise"}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>

            </button>
            
        </div>
       
        {isPending ? <span className='mt-8 bg-white rounded-md p-4'>Loading...</span>:
         <div className='flex flex-col items-center mt-8 gap-4'>
            {summary && (
               <div className='w-xl bg-white rounded-md p-4'>
               {summary}
               </div>
            )}
             </div>
        }
        </div>
   
  )
}

export default Summarise