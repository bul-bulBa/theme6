// import type {empl}  from '../../App'
// import type { empl } from '../../types/types'
import type {employeeType} from '../../store/reducers/employeeSlice'
import EmployerItem from './EmployerItem'
// import createThunk from '../../store/reducers/employeeSlice'

type propsType = {
    employees: employeeType[]
}

const EmployerList = ({ employees }: propsType) => {

    return (
        <div className='flex flex-col gap-2 p-4'>
            {
                employees.map((i: employeeType) => <EmployerItem
                    key={i.id}
                    {...i}
                />)
            }
        </div>
    )
}

export default EmployerList