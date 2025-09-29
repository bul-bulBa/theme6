import {Formik, Form, Field, ErrorMessage} from 'formik'
import { createThunk } from '../../store/reducers/employeeSlice'
import { useAppDispatch } from '../../store/storeConfig'

type initialValuesType = {name: string, salary: string}

const Index = () => {
    const dispatch = useAppDispatch()
    const initialValues: initialValuesType = {name: '', salary: ''} 

    return (
        <div>
            <Formik
            initialValues={initialValues}
            validate={values => {
                let errors: Record<string, string> = {}
                Object.entries(values).forEach(([key, value]) => {
                    if(!value) errors[key] = `${key} is required`
                })
                return errors
            }}
            onSubmit={async (values, {setSubmitting}) => {
                await dispatch(createThunk(values))
                setSubmitting(false)
            }}>
                {({isSubmitting}) => (
                    <Form className='container'>

                        <Field type='string' name='name' placeholder='Ім`я та прізвище' />
                        <ErrorMessage name='name' component='div' className='text-red-200' />

                        <Field type='number' name='salary' placeholder='З/П в $' />
                        <ErrorMessage name='salary' component='div' className='text-red-200' />

                        <button type='submit' disabled={isSubmitting}>Додати</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Index