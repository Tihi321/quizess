<?php
/**
 * Question post type functionality
 *
 * @since 1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Admin;

use Quizess\Includes\Config;

/**
 * [Questions description]
 */
class Questions {

  /**
   * Register custom post type
   *
   * @since 1.0.0
   */
  public function register_post_type() {
    $args = array(
        'label'               => esc_html( 'Questions', 'quizess' ),
        'public'              => true,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-welcome-learn-more',
        'supports'            => array( 'title', 'editor' ),
        'exclude_from_search' => true,
        'publicly_queryable'  => true,
        'show_in_rest'        => true,
        'can_export'          => true,
        'template' => array(
            array(
                'quizess/question-block',
                array(
                    'dontUseTitle' => true,
                ),
            ),
        ),
        'template_lock' => 'all',
    );
    register_post_type( Config::QUESTION_POST_SLUG, $args );
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
        'show_in_rest'        => true,
        'show_ui'             => true,
        'query_vars'          => true,
    );

    register_taxonomy( Config::QUESTION_CATEGORY_SLUG, Config::QUESTION_POST_SLUG, $args );
  }

}
