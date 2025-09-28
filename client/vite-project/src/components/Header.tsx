
type propsType = {
    allEmpl: number,
    allIncreaseEmpl: number
}

const Header = ({allEmpl, allIncreaseEmpl}: propsType) => {

    return (
        <div className="header">
            <h1>Облік співробітників в компаніі ClearDev</h1>
            <h2>Загальна кількість працівників: {allEmpl}</h2>
            <h2>Премію отримають: {allIncreaseEmpl}</h2>
        </div>
    )
}

export default Header