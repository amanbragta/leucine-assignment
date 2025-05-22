import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import CreateTodo from './components/CreateTodo'
import ListTodos from './components/ListTodos'
import { useEffect } from 'react'
import { supabaseClient } from './store/supbaseSlice'
import { supabase } from './utils/supabaseClient'
import Login from './components/Login'

function App() {
  const selector = useSelector(state=>state.supabase)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(supabaseClient())
  },[])
  if(!selector.client) return <Login/>
  async function logout(){
       const {_error} = await supabase.auth.signOut()
       dispatch(supabaseClient())
  }
  return (
   <div className='mt-16 mx-16 flex flex-col items-center relative'>
    <div className='text-2xl font-semibold mb-8 '>
      <h1>Hello, {selector.client?.user_metadata?.name}</h1>
    </div>
    <button onClick={logout} className='absolute right-0 shadow-md rounded-xl px-4 py-2 bg-white cursor-pointer'>Logout</button>
   <CreateTodo/>
   <ListTodos/>
   
   </div>
  )
}

export default App
