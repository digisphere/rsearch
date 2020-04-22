import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './components/searchForm';

const searchFormElement  = <SearchForm />;
const searchFields = document.getElementsByClassName('search-form');

// If search form exist
if( searchFields.length ) {

    // Render object for each form
    for( let i=0; i < searchFields.length; i++ ) {
        ReactDOM.render(
            searchFormElement,
            searchFields[ i ]
        );
    }
}