<?php
/**
 * Question post type functionality
 *
 * @since 1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Admin;

use Quizess\Core\Service;
use Quizess\Core\Config;
use Quizess\Helpers\Loader;

/**
 * Class Questions
 */
class Questions extends Config implements Service {

  /**
   * Use trait inside class.
   */
  use Loader;

  /**
   * Register all the hooks
   *
   * @since 1.0.0
   */
  public function register() : void {
    $this->add_action( 'init', $this, 'register_post_type' );
    $this->add_action( 'init', $this, 'register_categories' );
    $this->add_filter( 'template_include', $this, 'question_single_template', 10, 4 );
  }

  /**
   * Register custom post type
   *
   * @since 1.0.0
   */
  public function register_post_type() {

    $labels = array(
        'name'          => esc_html__( 'Questions', 'quizess' ),
        'singular_name' => esc_html__( 'Question', 'quizess' ),
        'all_items'     => esc_html__( 'View Questions', 'quizess' ),
        'edit_item'     => esc_html__( 'Edit Question', 'quizess' ),
        'update_item'   => esc_html__( 'Update Question', 'quizess' ),
        'add_new'       => esc_html__( 'Add New Question', 'quizess' ),
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-welcome-learn-more',
        'supports'            => array( 'title', 'editor' ),
        'exclude_from_search' => true,
        'publicly_queryable'  => false,
        'show_in_admin_bar'   => false,
        'show_in_rest'        => true,
        'show_ui'             => true,
        'show_in_menu'        => false,
        'show_in_nav_menus'   => false,
        'can_export'          => true,
        'query_var'           => false,
        'has_archive'         => false,
        'template' => array(
            array(
                'quizess/question-block',
                array(
                    'templateBlock' => true,
                ),
            ),
        ),
        'template_lock'       => array( 'all' ),
    );
    register_post_type( self::QUESTION_POST_SLUG, $args );
  }

  /**
   * Register custom categories
   *
   * @since 1.2.0
   */
  public function register_categories() {
    $labels = array(
        'name'              => esc_html__( 'Question Topics', 'quizess' ),
        'singular_name'     => esc_html__( 'Question Topic', 'quizess' ),
        'search_items'      => esc_html__( 'Search Question Topics', 'quizess' ),
        'all_items'         => esc_html__( 'All Question Topics', 'quizess' ),
        'parent_item'       => esc_html__( 'Parent Question Topic', 'quizess' ),
        'parent_item_colon' => esc_html__( 'Parent Question Topic', 'quizess' ),
        'edit_item'         => esc_html__( 'Edit Question Topic', 'quizess' ),
        'update_item'       => esc_html__( 'Update Question Topic', 'quizess' ),
        'add_new_item'      => esc_html__( 'Add New Question Topic', 'quizess' ),
        'new_item_name'     => esc_html__( 'New Question Topic Name', 'quizess' ),
    );

    $args = array(
        'labels'              => $labels,
        'hierarchical'        => true,
        'show_in_rest'        => true,
        'show_ui'             => true,
        'show_in_menu'        => false,
        'query_vars'          => true,
        'show_in_nav_menus'   => false,
    );

    register_taxonomy( self::QUESTION_CATEGORY_SLUG, self::QUESTION_POST_SLUG, $args );
  }

  /**
   * Redirect question single to homepage.
   *
   * @param string $template_path     Template path variable.
   * @return string Return new or old template path variable
   * @since 1.0.0
   */
  public function question_single_template( $template_path ) {
    if ( get_post_type() === self::QUESTION_POST_SLUG ) {
      wp_safe_redirect( home_url(), 302 );
    }
    return $template_path;
  }

}
