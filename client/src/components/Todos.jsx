import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import axios from 'axios'

function Todos({data}) {
    const [edit,setEdit] = useState(false)
    const [value,setValue] = useState(data.task)
    const query = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: async(val)=>{
            const {data:{session}} = await supabase.auth.getSession()
            console.log(session)
            return axios.patch(`${import.meta.env.VITE_API_URL}/todos/${data.id}`,{todo:val},{
            headers:{
                Authorization: `Bearer ${session.access_token}`
            }
        })
        },
        onMutate:(val)=>{
            query.cancelQueries(['todos'])
            const prevData = query.getQueryData(['todos'])
            const newTodo = {id:data.id, task:val}
            const prevTodos = prevData.data.filter(todo=>todo.id!=data.id)
            query.setQueryData(['todos'],(oldData)=>{
                return {...oldData, data:[...prevTodos,newTodo]}
            })
            console.log(query.getQueryData(['todos']))
            setEdit(false)
            return prevData
        },
        onError: (err,index,context)=>{
            query.setQueryData(['todos'],context.prevData)
        }
    })

    const {mutate:deleteMutate} = useMutation({
        mutationFn: async()=>{
            const {data:{session}} = await supabase.auth.getSession()
            console.log(session)
            return axios.delete(`${import.meta.env.VITE_API_URL}/todos/${data.id}`,{
            headers:{
                Authorization: `Bearer ${session.access_token}`
            }
        })
        },
        onMutate:()=>{
            query.cancelQueries(['todos'])
            const prevData = query.getQueryData(['todos'])
            const newData = prevData.data.filter(todo=>todo.id!=data.id)
            query.setQueryData(['todos'],(oldData)=>{
                return {...oldData,data:newData}
            })
            return prevData
        },
        onError:(err,index,context)=>{
            query.setQueryData(['todos'],context.prevData)
        }
    })

    function updateTodo(){
        mutate(value)
    }
    function deleteTodo(){
        deleteMutate()
    }
  return (
    <div className='bg-white rounded-md flex justify-between items-center p-4 shadow-lg w-md gap-2'>
        <div className='w-full'>
            {edit ? (
                <input type='text' className='border-1 border-gray-300 rounded-md px-4 py-2 w-full' value={value} onChange={e=>setValue(e.target.value)}/>
            ):<span className='w-full'>{data.task}</span>}

        </div>
        <div className='flex gap-2'>
            <div>
                {!edit ?  <button onClick={()=>setEdit(!edit)} className='shadow-md px-4 py-2 rounded-md cursor-pointer'>
                    Edit
                </button>:
                 <button onClick={()=>updateTodo()} className='shadow-md px-4 py-2 rounded-md cursor-pointer'>
                 Done
             </button>}
               
            </div>
            <div>
                <button onClick={deleteTodo} className='shadow-md text-red-500 px-4 py-2 rounded-md cursor-pointer'>
                    Delete
                </button>
            </div>
        </div>
    </div>
  )
}

export default Todos