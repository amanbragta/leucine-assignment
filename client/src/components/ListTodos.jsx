import Todos from './Todos'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../utils/supabaseClient'
import Summarise from './Summarise'
import axios from 'axios'

function ListTodos() {
    const {data , isLoading} = useQuery({
        queryKey:['todos'],
        queryFn:async ()=>{
        const {data:{session}} = await supabase.auth.getSession()
          return axios.get(`${import.meta.env.VITE_API_URL}/todos`,{
            headers:{
              Authorization: `Bearer ${session.access_token}`
            }
          })
        }
    })
    if(isLoading) return "Loading..."
  return (
    <div className='mt-8 flex flex-col gap-2 items-center'>
        {data.data && data?.data.map(item=>(
            <Todos key={item.id} data={item}/>
        ))}
        <Summarise/>
    </div>
  )
}

export default ListTodos