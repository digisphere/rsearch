<?php
function rs_component() {
    $closealt = get_option('rs_closealt');
    ?>
    <input class="rs-checker" type="checkbox" id="rs-modal" hidden>
    <div class="rs-modal">
        <div class="rs-modal-body">
            <div class="rs-modal-content">
                <form class="search-form"></form>
            </div>
            <div class="rs-modal-footer">
                <label for="rs-modal"><img src="http://rp.codenroll.co/wp-content/plugins/react-search/assets/svg/close.svg" alt="<?php echo $closealt;?>" /></label>
            </div>
        </div>
    </div>
    <?php
}
add_action('wp_footer', 'rs_component');