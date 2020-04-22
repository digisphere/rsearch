import React from 'react';
import SearchResult from './searchResult';
import NothingFound from './nothingFound';

export default class SearchResults extends React.Component {

    /**
     * Constructor
     *
     * @param props
     * @since 1.0
     */
    constructor(props) {
        super(props);
    }

    render() {
        let results = '';

        if( this.props.loading ) {
            results = <div className="rs-wrap-loading">
                            <img className="rs-loading" src="#" alt="Loading" />
                        </div>;
        }
        else if( this.props.results.length > 0 ) {
            let count = 0;
            const _results = this.props.results.map( result => {
                count++;
                return(<SearchResult key={result.id} result={result} origin_key={count} />);
            });
            results = <ul>{_results}</ul>;
        }
        else if( this.props.searched ) {
            results = <NothingFound />;
        }

        return (
            // data-total={number_of_pages}
            <div className="search-results-output">
                {results}
            </div>
        )
    }
}