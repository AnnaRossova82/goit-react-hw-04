import { toast, Toaster } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './SearchBar.module.css';
import { IoSearch } from 'react-icons/io5';

const SearchBar = ({ onSubmit }) => {
  const initialValues = {
    searchTerm: '',
  };


  const handleSubmit = (values, { resetForm }) => {
    if (!values.searchTerm) {
      toast.error('Please enter a search term');
    } else {
      onSubmit(values.searchTerm);
      alert('Searching...'); // Temporary instead of useToasts
      resetForm();
    }
  };

  return (
    <header className={styles.searchBar}>
      <Formik
        initialValues={initialValues}

        onSubmit={handleSubmit}
      >
        <Form>
        <button type="submit"><IoSearch />   Search</button> 
          <Field 
       
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchTerm"
          />
          <ErrorMessage name="searchTerm" component="div" />
      
        </Form>
      </Formik>
      <Toaster position="top-center" reverseOrder={false} /> {/* Доданий компонент Toaster */}
    </header>
  );
};

export default SearchBar;