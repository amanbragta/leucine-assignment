import React, { useState } from 'react'
import axios from 'axios'
import { supabase } from '../utils/supabaseClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function CreateTodo() {
    const [newTodo, setNewTodo] = useState('')
    const query = useQueryClient()
    const {mutate} = useMutation({
      mutationFn: async(val)=>{
        const {data:{session}} = await supabase.auth.getSession()
        console.log(session)
        return axios.post(`${import.meta.env.VITE_API_URL}/todos`,{todo:val},{
          headers:{
            Authorization: `Bearer ${session.access_token}`
          }
        })
      },
      onMutate:(val)=>{
        query.cancelQueries(['todos'])
        const prevData = query.getQueryData(['todos'])
        const newData = {task:val,id:prevData.data.length}
        query.setQueryData(['todos'],(oldData)=>{
          return {...oldData,data:[newData,...prevData.data]}
        })
        setNewTodo('')
        return prevData
      },
      onError:(_err,_index,context)=>{
        query.setQueriesData(['todos'],context.prevData)
      }

    })

  return (
    <div className='flex items-center gap-4'>
        <div className='w-md'>
        <input type='text' value={newTodo} onChange={e=>setNewTodo(e.target.value)} className='bg-white border-1 border-gray-300 rounded-md px-4 py-2 w-md'/>
        </div>
       
        <div className=''>
        <button onClick={()=>mutate(newTodo)} className='bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-xl'>Add</button>
        </div>
    </div>
  )
}

export default CreateTodo