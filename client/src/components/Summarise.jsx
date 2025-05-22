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
            <button onClick={handleSummary} className='bg-linear-to-tr from-purple-600 to-blue-500 px-4 py-4 rounded-xl text-white'>{summary? "Summarise again":"Summarise"}</button>
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