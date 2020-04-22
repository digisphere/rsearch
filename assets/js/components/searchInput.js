import React from 'react';

export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <input className="search-input" id="rs-search-input" type="text" onKeyUp={this.props.results} placeholder={this.props.inputLabel} />
                <button type="button" className="modal-clear-input" onClick={this.props.clear}>CLEAR</button>
            </div>
        )
    }
}