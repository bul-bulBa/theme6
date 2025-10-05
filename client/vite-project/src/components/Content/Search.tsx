import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { useForm } from 'react-hook-form'
import { useAppDispatch } from "@/store/storeConfig"
import type {searchFormType} from '../../store/reducers/employeeSlice'
import { getThunk } from "../../store/reducers/employeeSlice"

const Search = () => {
    const dispatch = useAppDispatch()
    const { register, handleSubmit, setValue, watch} = useForm<searchFormType>({ defaultValues: { name: '', salary: 0, increase: false }})

    const [increase, salary] = watch(['increase', 'salary'])
    const submit = (values: searchFormType) => dispatch(getThunk(values))

    return (
        <div className="container flex flex-col gap-4">
            <form onSubmit={handleSubmit(submit)}>
                <Input type="text" {...register('name')} placeholder="Знайти співробітника" />

                <ButtonGroup>
                    <Button variant={!increase && salary === 0 ? 'outline' : 'default'} 
                    onClick={() => {  
                        setValue("salary", 0) 
                        setValue('increase', false)
                        handleSubmit(submit) 
                        }}>Усі співробітники</Button>

                    <Button variant={increase ? "outline" : 'default'}
                    onClick={() => {  
                        setValue("salary", 0) 
                        setValue('increase', true)
                        handleSubmit(submit) 
                        }}>На підвищення</Button>

                    <Button variant={salary ? "outline" : 'default'}
                    onClick={() => {  
                        setValue("salary", 1000) 
                        setValue('increase', false)
                        handleSubmit(submit) 
                    }}>З/П більше 1000$</Button>
                </ButtonGroup>
            </form>
        </div>
    )
}

export default Search