<?php
/**
 * Plugin Name: React Search
 * Description:
 */

if( ! defined( 'ABSPATH' ) )
    return;

define('RS_DIR', plugin_dir_url( __FILE__ ));

require_once 'admin/panel.php';
require_once 'includes/assets.php';
require_once 'rest.php';
require_once 'front/component.php';