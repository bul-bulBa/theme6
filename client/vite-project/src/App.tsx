import { useState, useEffect } from 'react'
import Header from './components/Header'
import type {empl} from './types/types'
import { useAppDispatch,useAppSelector } from './store/storeConfig'
import EmployerList from './components/Content/EmployerList'
import {getThunk, 
  selectEmployees } from './store/reducers/employeeSlice'

function App() {
  const employees = useAppSelector(selectEmployees)
  const dispatch = useAppDispatch()
  // const [employees, setEmployees] = useState<empl[]>([
  //   {
  //     id: 1,
  //     name: 'Yarik',
  //     salary: 2000,
  //     increase: false
  //   },
  //   {
  //     id: 2,
  //     name: 'Yarik2',
  //     salary: 1000,
  //     increase: true
  //   },
  //   {
  //     id: 3,
  //     name: 'Yarik3',
  //     salary: 4000,
  //     increase: false
  //   },
  //   {
  //     id: 4,
  //     name: 'Yarik4',
  //     salary: 300,
  //     increase: true
  //   },
  // ])

  // const increaseEmpl = employees.filter((i: empl) => i.increase)

  useEffect(() => {
    dispatch(getThunk())
  }, [])

  if(employees === null) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div className='bg-stone-300 p-5'>
      <Header allEmpl={5} allIncreaseEmpl={3} />
      <EmployerList employees={employees!} />
    </div>
  )
}

export default App
