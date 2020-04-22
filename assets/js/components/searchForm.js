import React from 'react';
import SearchResults from './searchResults';
import HeadingButtons from './headingButtons';
import SearchInput from './searchInput';

/**
 * Search Form
 *
 * @class SearchForm
 * @since 1.0
 */
export default class SearchForm extends React.Component {

    /**
     * Constructor
     *
     * @param props
     */
    constructor( props ){
        super(props);

        this.state = {
            results:        [],
            loading:        false,
            searched:       false,
            heading_results:[],
            inner_classes: 'inner',
            header_classes: '',
            length: 0,
            input_classes:  'search-form-input',
            cat_classes: 'rs-modal-categories hidden',
            pagednum: 0,
        };

        this.getResults =   this.getResults.bind(this);
        this.clear =        this.clear.bind(this);
    }

    /**
     * Clear input & results
     *
     * @since 1.0
     */
    clear() {
        document.getElementById('rs-search-input').value = '';
        document.getElementById('rs-search-input').focus();

        jQuery('.rs-modal-categories').empty().prepend('<li><a href="#" id="rs-modal-cat-all" class="active">All</a></li>');

        this.setState({
            results:            [],
            cat_results:        [],
            heading_results:    [],
            searched:           false,
            cat_searched:       false,
            header_classes: '',
            inner_classes:       'inner',
            input_classes:       'search-form-input',
            cat_classes: 'rs-modal-categories hidden',
        });
    }

    /**
     * Get Results
     *
     * @param e
     * @since 1.0
     */
    getResults( e ){
        if( this.state.loading )
            return;

        // Get the input value
        const search = e.target.value;

        // Fetch our settings
        let json = fetch(rs_rest.rest_search_settings, {
                headers: {
                    'X-WP-Nonce': rs_rest.nonce
                }
            })
            .then(response => {
                return response.json();
            })
            .then(results => {

                // Set results state
                this.setState({
                    results: results
                });
            });

        // declare the minimum characters to search from
        let minchar = this.state.results.minchar ? this.state.results.minchar - 1 : 2;

        // Search if there's anough characters
        if( search && search.length > minchar ) {
            var getThis = this;

            let results_url  = rs_rest.rest_search_posts.replace( '%s', search );

            this.setState({
                loading: true,
                searched: true,
                inner_classes: 'inner in',
                input_classes: 'search-form-input filled',
            });

            // Fetch results
            let json = fetch( results_url )
                .then(response => { return response.json()})
                .then(results => {
                    this.setState({
                        results: results,
                        loading:false,
                        heading_results: results,
                        header_classes: 'on',
                        input_classes: 'search-form-input filled',
                        length: results.length,
                    });
                });

        } else {
            this.setState({
                results: [],
                searched: false,
                heading_results: [],
                input_classes: 'search-form-input',
                header_classes: '',
            });
        }
    }

    render() {

        return (
            <div className={this.state.input_classes}>
                <SearchInput results={this.getResults} inputLabel="Try something..." clear={this.clear} />

                <div className={this.state.innerClasses}>

                    <header className={this.state.header_classes}>
                        <HeadingButtons results={this.state.heading_results} />
                    </header>
                    <SearchResults searched={this.state.searched} loading={this.state.loading} results={this.state.results}/>

                </div>
            </div>
        )
    }
}