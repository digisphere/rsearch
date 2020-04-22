import React from 'react';

var escapeChars = { lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' };

function unescapeHTML(str) {//modified from underscore.string and string.js
    return str.replace(/\&([^;]+);/g, function(entity, entityCode) {
        var match;

        if ( entityCode in escapeChars) {
            return escapeChars[entityCode];
        } else if ( match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
            return String.fromCharCode(parseInt(match[1], 16));
        } else if ( match = entityCode.match(/^#(\d+)$/)) {
            return String.fromCharCode(~~match[1]);
        } else {
            return entity;
        }
    });
}

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var title = unescapeHTML(this.props.result.title.rendered);
        var excerpt = this.props.result.excerpt.rendered.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");

        return (
            <li className={itemClass}>
                <a href={this.props.result.link}>
                    <div className="rs-item-thumb">
                        <img src={this.props.result.featured_image_src} />
                    </div>
                    <div className="rs-item-content">
                        <p>{this.props.result.real_date}</p>
                        <h3>{title}</h3>
                        <div className="rs-item-author">
                            <img src={this.props.result.author_image} alt={this.props.result.author_name} />
                            <p>{this.props.result.author_name}</p>
                        </div>
                    </div>
                </a>
            </li>
        )
    }
}