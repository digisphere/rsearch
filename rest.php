<?php
/**
 * Add params to our JSON file
 * of the REST API.
 */
function rs_add_params_to_json() {
    register_rest_field( 'post', 'featured_image_src', array(
            'get_callback'    => 'get_image_src',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post', 'author_name', array(
            'get_callback'    => 'get_author_display_name',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post', 'author_image', array(
            'get_callback'    => 'get_author_search_image',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post', 'full_categories', array(
            'get_callback'    => 'get_full_categories',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post', 'views', array(
            'get_callback'    => 'get_views',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'post', 'real_date', array(
            'get_callback'    => 'rs_get_realdate',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
add_action( 'rest_api_init', 'rs_add_params_to_json' );


function rs_get_realdate( $object, $field_name, $request ) {
    return get_the_date('M j, Y', $object['id']);
}
function get_image_src( $object, $field_name, $request ) {
    $feat_img_array = wp_get_attachment_image_src($object['featured_media'], 'rs-search', true);
    return $feat_img_array[0];
}
function get_author_display_name( $object, $field_name, $request ) {
    $feat_img_array = get_the_author_meta('display_name', $object['author']);
    return $feat_img_array;
}
function get_author_search_image( $object, $field_name, $request ) {
    $feat_img_array = get_avatar_url($object['author']);
    return $feat_img_array;
}
function get_views( $object, $field_name, $request ) {
    return rand(5, 20000);
}
function get_full_categories( $object, $field_name, $request ) {
    $output = array();

    foreach ($object['categories'] as $category) {
        $cats = $category;
        $output[$cats] = array(
            'name' => get_cat_name($category),
            'url' => get_category_link($category),
            'term_id' => $category,
        );
    }
    return $output;
}

/**
 * Unset params from our json file
 */
function rs_unset_json_params( $data, $post, $request ) {
    $_data = $data->data;
    $params = $request->get_params();

    if ( ! isset( $params['id'] ) ) {
        unset( $_data['content'] );
        unset( $_data['comment_status'] );
        unset( $_data['date_gmt'] );
        unset( $_data['format'] );
        unset( $_data['guid'] );
        unset( $_data['meta'] );
        unset( $_data['modified'] );
        unset( $_data['modified_gmt'] );
        unset( $_data['ping_status'] );
        unset( $_data['sticky'] );
        unset( $_data['tags'] );
        unset( $_data['template'] );
    }

    $data->data = $_data;

    return $data;
}
add_filter( 'rest_prepare_post', 'rs_unset_json_params', 10, 3 );

/**
 * Route Settings
 *
 * Declare our settings over the acwp route
 *
 * @param $data
 * @return array
 * @since 4.0.0
 */
function rs_route_settings( $data ) {
    return array(
        'minchar' => (get_option('rs_minchar') != '') ? intval(get_option('rs_minchar')) : 3,
    );
}

/**
 * Declare our route and it's callback
 *
 * @since 4.0.0
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'reactsearch/v1', '/route', array(
        'methods' => 'GET',
        'callback' => 'rs_route_settings',
    ) );
} );