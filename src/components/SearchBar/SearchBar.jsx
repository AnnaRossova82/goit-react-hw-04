import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToasts } from 'react-hot-toast';

const SearchBar = ({ onSearch }) => {
  const { addToast } = useToasts();

  const initialValues = {
    searchTerm: '',
  };

  const validationSchema = Yup.object({
    searchTerm: Yup.string().required('Please enter a search term'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSearch(values.searchTerm);
    addToast('Searching...', {
      icon: '🔍',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
    resetForm();
  };

  return (
    <header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSearch={handleSubmit}
      >
        <Form>
          <Field
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchTerm"
          />
          <ErrorMessage name="searchTerm" component="div" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;