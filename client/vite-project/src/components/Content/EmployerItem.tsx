import type {employeeType} from '../../store/reducers/employeeSlice'
import { changeIncreaseThunk, deleteThunk } from '../../store/reducers/employeeSlice'
import { useAppDispatch, useAppSelector } from '../../store/storeConfig'
import {Cookie, Trash, BanknoteArrowUp} from "lucide-react" 
import { setPage, selectPages } from '../../store/reducers/employeeSlice'
import {selectSearch} from '../../store/reducers/searchSlice'

const EmployerItem = (props: employeeType) => {
    const searchForm = useAppSelector(selectSearch)
    const pages = useAppSelector(selectPages)
    const dispatch = useAppDispatch()

    const deleteEmployee = () => {
        dispatch(setPage(1))
        dispatch(deleteThunk({id: props.id, searchForm: {...searchForm, page: 1}}))
    }

    const chageEmployee = () => {
        const req = {id: props.id, searchForm: {page: pages.currentPage, ...searchForm}}
        dispatch(changeIncreaseThunk(req))
    }

    return (
        <div className='grid grid-cols-[55%_20%_25%] p-4 border-1 border-black rounded bg-stone-50 text-black w-[500px]'>
            <div className='col-start-1'>{props.name}</div>
            <div className='col-start-2'>{props.salary}$</div>
            <div className='col-start-3 flex gap-2 '>
                <button onClick={() => chageEmployee()}> <Cookie /> </button>
                <button onClick={() => deleteEmployee()}> <Trash /> </button>
                { props.increase && <BanknoteArrowUp /> }
            </div>
        </div>
    )
}

export default EmployerItem