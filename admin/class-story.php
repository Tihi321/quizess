<?php
/**
 * Story post type functionality
 *
 * @since 1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Admin;

use Quizess\Includes\Config;

/**
 * [Story description]
 */
class Story {

  /**
   * Register custom post type
   *
   * @since 1.0.0
   */
  public function register_post_type() {
    $args = array(
        'label'               => esc_html( 'Stories', 'quizess' ),
        'public'              => true,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-welcome-learn-more',
        'supports'            => array( 'title', 'editor' ),
        'exclude_from_search' => true,
        'publicly_queryable'  => true,
        'show_in_rest'        => true,
        'can_export'          => true,
        'template' => array(
            array( 'quizess/cpt-author-image-block' ),
            array( 'quizess/cpt-author-portfolio-block' ),
            array( 'quizess/cpt-author-social-block' ),
        ),
        'template_lock' => 'all',
    );
    register_post_type( Config::STORIES_POST_SLUG, $args );
  }

  /**
   * Register custom categories
   *
   * @since 1.2.0
   */
  public function register_categories() {
    $labels = array(
        'name'              => esc_html( 'Topics', 'quizess' ),
        'singular_name'     => esc_html( 'Topic', 'quizess' ),
        'search_items'      => esc_html( 'Search Topics', 'quizess' ),
        'all_items'         => esc_html( 'All Topics', 'quizess' ),
        'parent_item'       => esc_html( 'Parent Topic', 'quizess' ),
        'parent_item_colon' => esc_html( 'Parent Topic', 'quizess' ),
        'edit_item'         => esc_html( 'Edit Topic', 'quizess' ),
        'update_item'       => esc_html( 'Update Topic', 'quizess' ),
        'add_new_item'      => esc_html( 'Add New Topic', 'quizess' ),
        'new_item_name'     => esc_html( 'New Topic Name', 'quizess' ),
    );

    $args = array(
        'labels'              => $labels,
        'hierarchical'        => true,
        'show_ui'             => true,
        'query_vars'          => true,
    );

    register_taxonomy( Config::STORIES_CATEGORY_SLUG, Config::STORIES_POST_SLUG, $args );
  }

}
