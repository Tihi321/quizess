<?php
/**
 * Fired when the plugin is uninstalled.
 *
 * @since   1.0.0
 * @package Quizess
 */

// If uninstall not called from WordPress, then exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

// Delete projects.
$projects = get_posts(
  array(
    'numberposts' => 1000,
    'post_type'   => 'Quizess',
  )
);

foreach ( $projects as $project ) {
  wp_delete_post( $project->ID, true );
}

// Delete transient.
delete_transient( 'Quizess' );

// Delete keys.
get_option( 'dm_keys' );

// Clear any cached data that has been removed.
wp_cache_flush();
