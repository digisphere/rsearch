<?php

function rs_menu_pages() {

    add_submenu_page(
        'tools.php',
        'React Search',
        'React Search',
        'manage_options',
        'react-search',
        'rs_panel_page'
    );

    add_action( 'admin_init', 'rs_register_panel_settings' );
}
add_action('admin_menu', 'rs_menu_pages');


function rs_register_panel_settings() {
    //register our settings
    register_setting( 'rs-settings', 'rs_categories_exc' );
    register_setting( 'rs-settings', 'rs_posts_exc' );
    register_setting( 'rs-settings', 'rs_authors_exc' );
    register_setting( 'rs-settings', 'rs_minchar' );
    register_setting( 'rs-settings', 'rs_maxresults' );
    register_setting( 'rs-settings', 'rs_closealt' );
}

function rs_panel_page() {
    ?>
    <div class="wrap">
        <h1>React Search v1</h1>

        <form method="post" action="options.php">
            <?php settings_fields( 'rs-settings' ); ?>
            <?php do_settings_sections( 'rs-settings' ); ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Minimum characters</th>
                    <td><input type="number" min="1" name="rs_minchar" value="<?php echo esc_attr( get_option('rs_minchar') ); ?>" /></td>
                </tr>
                <th scope="row">Maximum results to show</th>
                <td><input type="number" min="1" name="rs_maxresults" value="<?php echo esc_attr( get_option('rs_maxresults') ); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Exclude Posts <small style="display: block;">(separate post id's with comma)</small></th>
                    <td><input type="text" name="rs_posts_exc" value="<?php echo esc_attr( get_option('rs_posts_exc') ); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Exclude Categories <small style="display: block;">(separate categories id's with comma)</small></th>
                    <td><input type="text" name="rs_categories_exc" value="<?php echo esc_attr( get_option('rs_categories_exc') ); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Exclude Authors <small style="display: block;">(separate author id's with comma)</small></th>
                    <td><input type="text" name="rs_authors_exc" value="<?php echo esc_attr( get_option('rs_authors_exc') ); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Close modal ALT text</th>
                    <td><input type="text" name="rs_closealt" value="<?php echo esc_attr( get_option('rs_closealt') ); ?>" /></td>
                </tr>
            </table>

            <?php submit_button(); ?>

        </form>
    </div>
<?php } ?>