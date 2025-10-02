import {selectAllLengths} from '../store/reducers/employeeSlice'
import { useAppSelector } from '../store/storeConfig'

// type propsType = {
//     allEmpl: number,
//     allIncreaseEmpl: number
// }

const Header = () => {
    const state = useAppSelector(selectAllLengths)

    return (
        <div className="container">
            <h1>Облік співробітників в компаніі ClearDev</h1>
            <h2>Загальна кількість працівників: {state.length}</h2>
            <h2>Премію отримають: {state.increaseLength}</h2>
        </div>
    )
}

export default Header