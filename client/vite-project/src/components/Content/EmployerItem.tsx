import type {empl}  from '../../types/types'
import type {employeeType} from '../../store/reducers/employeeSlice'
import { changeIncreaseThunk, deleteThunk } from '../../store/reducers/employeeSlice'
import { useAppDispatch } from '../../store/storeConfig'
import {Cookie, Trash, BanknoteArrowUp} from "lucide-react" 

const EmployerItem = (props: employeeType) => {
    const dispatch = useAppDispatch()

    return (
        <div className='grid grid-cols-[55%_20%_25%] p-4 border-1 border-black rounded bg-stone-50 text-black w-[500px]'>
            <div className='col-start-1'>{props.name}</div>
            <div className='col-start-2'>{props.salary}$</div>
            <div className='col-start-3 flex gap-2 '>
                <button onClick={() => dispatch(changeIncreaseThunk(props.id))}> <Cookie /> </button>
                <button onClick={() => dispatch(deleteThunk(props.id))}> <Trash /> </button>
                { props.increase && <BanknoteArrowUp /> }
            </div>
        </div>
    )
}

export default EmployerItem