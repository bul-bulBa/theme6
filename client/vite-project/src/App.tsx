import { useEffect } from 'react'
import Header from './components/Header'
import { useAppDispatch,useAppSelector } from './store/storeConfig'
import EmployerList from './components/Content/EmployerList'
import Index from './components/Content/Index'
import Search from './components/Content/Search'
import {getThunk, 
  selectEmployees } from './store/reducers/employeeSlice'

function App() {
  const employees = useAppSelector(selectEmployees)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getThunk({name: '', salary: 0, increase: false}))
  }, [])

  if(employees === null) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div className='bg-stone-300 p-5'>
      <Header />
      <Search />
      <EmployerList employees={employees!} />
      <Index />
    </div>
  )
}

export default App
