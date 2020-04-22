/**
 * Sort By Data-Views
 *
 * @param a
 * @param b
 *
 * @returns {number}
 */
function sortli_Views(a, b){
    return (jQuery(b).data('views')) < (jQuery(a).data('views')) ? 1 : -1;
}
function sortli_Original(a, b){
    return (jQuery(b).data('original')) < (jQuery(a).data('original')) ? 1 : -1;
}

/**
 * @returns SVG Arrow (string)
 */
function bk_getArrow() {
    return '<svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.37054L1.39309 0L8 6.5L1.39309 13L0 11.6295L5.21383 6.5L0 1.37054Z" fill="#FFAA00"/>\n' +
    '</svg>';
}

function cat_go_to_page(page_num) {
    var theList     = jQuery('.search-results-output > ul');
    var controls    = jQuery('.search-results-output > .controls');
    var prev        = jQuery('.search-results-output > .controls > .prev');
    var next        = jQuery('.search-results-output > .controls > .next');
    var total       = parseInt( jQuery('.search-results-output').data('total') ) - 1;
    var start_from = page_num * 4;
    var end_on = start_from + 4;

    if(page_num != 0 && prev.length === 0)
        controls.prepend('<a class="prev" onclick="previous()">'+bk_getArrow()+'</a>');
    else if(page_num === 0 && prev.length != 0)
        prev.remove();

    if(page_num === total)
        next.remove();
    else if(page_num != total && next.length === 0)
        controls.append('<a class="next" onclick="next()">'+bk_getArrow()+'</a>');

    theList.children('li:not(.ignore-cat)').removeClass('in').addClass('out').slice(start_from, end_on).removeClass('out').addClass('in');

    jQuery('.page[longdesc=' + page_num + ']').addClass('active').siblings('.active').removeClass('active');
    jQuery('#current_page').val(page_num);
}

/**
 * Pagination: Go Previous
 */
function cat_previous() {
    var controls    = jQuery('.search-results-output > .controls');
    var prev        = jQuery('.search-results-output > .controls > .prev');
    var next        = jQuery('.search-results-output > .controls > .next');
    var new_page    = parseInt(jQuery('#current_page').val(), 0) - 1;
    var total = parseInt( jQuery('.search-results-output').data('total') ) - 1;

    if(new_page != 0 && prev.length === 0)
        controls.prepend('<a class="prev" onclick="previous()">'+bk_getArrow()+'</a>');
    else if(new_page === 0 && prev.length != 0)
        prev.remove();

    if(new_page === total)
        next.remove();
    else if(new_page != total && next.length == 0)
        controls.append('<a class="next" onclick="next()">'+bk_getArrow()+'</a>');

    if (jQuery('.active').prev('.page').length == true) {
        cat_go_to_page(new_page);
    }

}

/**
 * Pagination: Go Next
 */
function cat_next() {
    var controls    = jQuery('.search-results-output > .controls');
    var prev        = jQuery('.search-results-output > .controls > .prev');
    var next        = jQuery('.search-results-output > .controls > .next');
    var new_page    = parseInt(jQuery('#current_page').val(), 0) + 1;
    var total = parseInt( jQuery('.search-results-output').data('total') ) - 1;

    if(new_page != 0 && prev.length === 0)
        prev.prepend('<a class="prev" onclick="previous()">'+bk_getArrow()+'</a>');
    else if(new_page === 0 && prev.length != 0)
        prev.remove();

    if(new_page === total)
        next.remove();
    else if(new_page != total && next.length == 0)
        controls.append('<a class="next" onclick="next()">'+bk_getArrow()+'</a>');

    if (jQuery('.active').next('.page').length == true) {
        cat_go_to_page(new_page);
    }
}

jQuery(document).ready(function($){
    $('#bk-modal-recent').click(function () {
        $(this).addClass('active');
        $('#bk-modal-popular').removeClass('active');
        jQuery('.search-results-output > ul > li').sort(sortli_Original).appendTo('.search-results-output > ul');
    });
    $('#bk-modal-popular').click(function () {
        $(this).addClass('active');
        $('#bk-modal-recent').removeClass('active');
        jQuery('.search-results-output > ul > li').sort(sortli_Views).appendTo('.search-results-output > ul');
    });

    /**
     * Detect change on search input
     */
    $(".search-input").on("input", function(){

        jQuery('.search-form-input .inner').removeClass('in');

        if( $(this).val() != '' )
            $(this).parent('.search-form-input').addClass('filled');
        else
            $(this).parent('.search-form-input').removeClass('filled');

        if( $(this).val().length < 2 )
            jQuery('.bk-modal-categories').empty();
    });

    let checker = $('.bk-checker');

    checker.change(function () {
        if( $(this).is(':checked') )
            $('.search-input').focus();
    });

});