<?php
/**
 * Quiz post type functionality
 *
 * @since 1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Admin;

use Quizess\Includes\Config;

/**
 * [Quiz description]
 */
class Quiz {

  /**
   * Register custom post type
   *
   * @since 1.0.0
   */
  public function register_post_type() {
    $allowed_blocks = array(
        'quizess/question-block',
        'quizess/questions-category-block',
    );

    $template = array(
        array( 'quizess/cpt-quizess-options-block' ),
        array( 'quizess/cpt-quizess-background-options-block' ),
        array(
            'quizess/section-block',
            array(
                'classWrap' => 'post-body-insert-wrap',
                'allowedBlocks' => $allowed_blocks,
            ),
        ),
    );

    $args = array(
        'label'               => esc_html( 'Quizess', 'quizess' ),
        'public'              => true,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-welcome-learn-more',
        'supports'            => array( 'title', 'editor' ),
        'exclude_from_search' => true,
        'publicly_queryable'  => true,
        'show_in_rest'        => true,
        'can_export'          => true,
        'template'            => $template,
        'template_lock'       => 'all',
    );
    register_post_type( Config::QUIZESS_POST_SLUG, $args );
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
        'show_in_rest'        => true,
    );

    register_taxonomy( Config::QUIZESS_CATEGORY_SLUG, Config::QUIZESS_POST_SLUG, $args );
  }


  /**
   * Register custom template for quiz post type
   *
   * @since 1.2.0
   */
  public function quiz_single_template() {
    if ( get_post_type() === Config::QUIZESS_POST_SLUG ) {
      if ( is_single() ) {

        if ( locate_template( array( 'single-quiz.php' ) ) ) {
              $template_path = locate_template( array( 'single-quiz.php' ) );
        } else {
              $template_path = plugin_dir_path( __DIR__ ) . 'templates/single-quiz.php';
        }
      }
    }
    return $template_path;
  }

}
