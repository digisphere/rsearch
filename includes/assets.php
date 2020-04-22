<?php
/**
 * Enqueueing the scripts & styling
 */
function rs_assets() {
    // What's the maximum results we want to return within our search?
    $maxResults = (get_option('bk_maxresults') != '') ? intval(get_option('bk_maxresults')) : 40;

    wp_enqueue_script( 'func-js', RS_DIR . 'assets/js/func.js', array( 'jquery' ), '', true );
    wp_enqueue_script( 'react-rest-js', RS_DIR . 'assets/js/public.min.js', array( 'jquery', 'func-js' ), '', true );


    $rest_uri = 'wp/v2/posts?search=%s&per_page=' . $maxResults;
    if( get_option('bk_posts_exc') != '' )
        $rest_uri .= '&exclude=' . get_option('bk_posts_exc');
    if( get_option('bk_categories_exc') != '' )
        $rest_uri .= '&categories_exclude=' . get_option('bk_categories_exc');
    if( get_option('bk_authors_exc') != '' )
        $rest_uri .= '&author_exclude=' . get_option('bk_authors_exc');

    wp_localize_script( 'react-rest-js', 'rs_rest', array(
        // Adding the post search REST URL
        'rest_all_authors' => rest_url( 'wp/v2/users/' ),
        'rest_search_author' => rest_url( 'wp/v2/posts?author=%s&per_page=' . $maxResults ),
        'rest_all_categories' => rest_url( 'wp/v2/categories/' ),
        'rest_search_category' => rest_url( 'wp/v2/posts?cat=%s&per_page=' . $maxResults ),
        'rest_search_posts' => rest_url( $rest_uri ),
        'rest_search_settings' => rest_url( 'bookaway/v1/route/' ),
        'nonce' => wp_create_nonce( 'wp_rest' )
    ));

    wp_register_style( 'search-css', RS_DIR . 'assets/css/main.css');
    wp_enqueue_style( 'search-css' );
}
add_action( 'wp_enqueue_scripts', 'rs_assets' );