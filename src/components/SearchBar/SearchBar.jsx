import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SearchBar = ({ onSearch }) => {
  const initialValues = {
    searchTerm: '',
  };

  const validationSchema = Yup.object({
    searchTerm: Yup.string().required('Please enter a search term'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSearch(values.searchTerm);
    alert('Searching...'); // Замість useToasts
    resetForm();
  };

  return (
    <header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} // Зміна onSearch на onSubmit
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