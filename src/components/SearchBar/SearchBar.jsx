import { toast, Toaster } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const SearchBar = ({ onSubmit }) => {
  const initialValues = {
    searchTerm: '',
  };


  const handleSubmit = (values, { resetForm }) => {
    if (!values.searchTerm) {
      toast.error('Please enter a search term');
    } else {
      onSubmit(values.searchTerm);
      alert('Searching...'); // Temporary useToasts
      resetForm();
    }
  };

  return (
    <header>
      <Formik
        initialValues={initialValues}

        onSubmit={handleSubmit}
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
      <Toaster position="top-center" reverseOrder={false} /> {/* Доданий компонент Toaster */}
    </header>
  );
};

export default SearchBar;