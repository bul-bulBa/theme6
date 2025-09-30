import {Formik, Form, Field, ErrorMessage, useField} from 'formik'
import { createThunk } from '../../store/reducers/employeeSlice'
import { useAppDispatch } from '../../store/storeConfig'
import * as yup from 'yup'
import { Input } from "../ui/input"

type initialValuesType = {name: string, salary: string}

    const MyInput = ({placeholder, name, type}: any) => { // типізувати
        const [field, meta] = useField(name)
        return (
            <div>
                <Input 
                type={type} 
                placeholder={placeholder}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={name}/>

                {meta.touched && meta.error ? (
                    <div className='text-red-200'>{meta.error}</div>
                ) : null}
            </div>
        )
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('name is required'),
        salary: yup.number().min(3, 'Постав людску зарплату').integer('salary must be an integer')
    })

const Index = () => {
    const dispatch = useAppDispatch()
    const initialValues: initialValuesType = {name: '', salary: ''} 

    return (
        <div>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting}) => {
                await dispatch(createThunk(values))
                setSubmitting(false)
            }}>
                {({isSubmitting}) => (
                    <Form className='container'>

                        <MyInput type='text' name='name' placeholder='Його ім`я та Прізвище?'/>

                        <MyInput type='number' name='salary' placeholder='З/П в $'/>

                        <button type='submit' disabled={isSubmitting}>Додати</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Index