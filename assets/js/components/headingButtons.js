import React from 'react';

export default class HeadingButtons extends React.Component {
    constructor(props) {
        super(props);
    }

    sortBy() {
        jQuery('#rs-modal-recent').addClass('active');
        jQuery('#rs-modal-popular').removeClass('active');

        jQuery('.search-results-output > ul > li').sort(sortli_Views).appendTo('.search-results-output > ul');
    }

    render() {

        return (
            <div className={"rs-heading-wrap " + (this.props.results.length > 0 ? 'show' : 'hidden')}>
                <button type="button" id="rs-modal-popular" className="active">Most Popular</button>
                <button type="button" id="rs-modal-recent">Recent</button>
            </div>
        )
    }
}