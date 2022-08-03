
import { FormProvider } from '../../context/formProvider';
import { Table } from '../components';

export const TablePage = () => {
  return (
    <FormProvider>
      <section className='w-11 m-auto'>
          <h1 className=' text-center'>
              Table App
          </h1>
          
          <hr />
          <Table />
      </ section>
    </FormProvider>
  )
}
