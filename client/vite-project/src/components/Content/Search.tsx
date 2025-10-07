import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { useForm, Controller } from 'react-hook-form'
import { AutoComplete } from 'antd'
import { useAppDispatch, useAppSelector } from "@/store/storeConfig"
import type {searchFormType} from '../../store/reducers/employeeSlice'
import { getThunk } from "../../store/reducers/employeeSlice"
import { setState, selectAutoCoplete, autoCompleteThunk } from '../../store/reducers/searchSlice'

type funcType = (arg: string) => void

function debounce(func: funcType, delay: number) {
    let timeout: number // Variable to hold the timer ID

    return function(arg: string) { // Returns a new function (the debounced version)

        clearTimeout(timeout); // Clear any existing timer

        timeout = setTimeout(() => {
            func(arg); // Execute the original function after the delay
        }, delay);
    };
}

const Search = () => {
    const dispatch = useAppDispatch()
    const options = useAppSelector(selectAutoCoplete)
    const { control, handleSubmit, setValue, watch} = useForm<any>({ defaultValues: { name: '', salary: 0, increase: false }})

     const searchFunction = debounce((value: string) => {
        dispatch(autoCompleteThunk(value))
    }, 300)

    const [increase, salary] = watch(['increase', 'salary'])
    const submit = (values: any) => {
        const req: searchFormType = {...values, page: 1}
        dispatch(setState(values))
        dispatch(getThunk(req))
    }
    console.log(options)
    return (
        <div className="container">
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        
                <div className="flex gap-2">
                    <Controller
                    name="name"
                    control={control}
                    render={({ field }) => {
                        {console.log(field)}
                        return (
                      <AutoComplete
                        {...field}
                        style={{ width: 300 }}
                        options={options}
                        placeholder="Знайти співробітника"
                        filterOption={(inputValue, option) =>
                          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        onChange={(value) => {
                            field.onChange(value)
                            if(value.length >= 3) searchFunction(value) }}
                        value={field.value}
                      />
                    )}}
                    />

                    <Button variant='outline' onClick={() => handleSubmit(submit)}>Шукати</Button>
                </div>

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