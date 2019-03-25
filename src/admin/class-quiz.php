<?php
/**
 * Quiz post type functionality
 *
 * @since 1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Admin;

use Quizess\Core\Config;
use Quizess\Core\Service;
use Quizess\Helpers\Loader;
use Quizess\Helpers\General_Helper;

/**
 * [Quiz description]
 */
class Quiz extends Config implements Service {

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
    $this->add_action( 'add_meta_boxes', $this, 'quiz_options_metaboxes' );
    $this->add_action( 'save_post', $this, 'quiz_options_metabox_save', 10, 3 );
    $this->add_filter( 'template_include', $this, 'quiz_single_template', 10, 4 );
  }

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
            'quizess/section',
            array(
                'wrapClass' => 'quizess-quiz-section',
                'allowedBlocks' => $allowed_blocks,
            ),
        ),
    );

    $labels = array(
        'name'          => esc_html__( 'Quizess', 'quizess' ),
        'singular_name' => esc_html__( 'Quiz', 'quizess' ),
        'all_items'     => esc_html__( 'View Quizzes', 'quizess' ),
        'edit_item'     => esc_html__( 'Edit Quiz', 'quizess' ),
        'update_item'   => esc_html__( 'Update Quiz', 'quizess' ),
        'add_new'       => esc_html__( 'Add New Quiz', 'quizess' ),
    );

    $args = array(
        'labels'              => $labels,
        'menu_icon'           => 'dashicons-welcome-learn-more',
        'supports'            => array( 'title', 'editor' ),
        'public'              => true,
        'exclude_from_search' => true,
        'publicly_queryable'  => true,
        'show_in_rest'        => true,
        'show_ui'             => true,
        'show_in_menu'        => false,
        'can_export'          => true,
        'has_archive'         => false,
        'template'            => $template,
        'template_lock'       => array( 'all' ),
        'taxonomies'          => array( self::QUIZESS_CATEGORY_SLUG ),
    );
    register_post_type( self::QUIZESS_POST_SLUG, $args );
  }

  /**
   * Register custom categories
   *
   * @since 1.0.0
   */
  public function register_categories() {
    $labels = array(
        'name'              => esc_html__( 'Quiz Topics', 'quizess' ),
        'singular_name'     => esc_html__( 'Quiz Topic', 'quizess' ),
        'search_items'      => esc_html__( 'Search Quiz Topics', 'quizess' ),
        'all_items'         => esc_html__( 'All Quiz Topics', 'quizess' ),
        'parent_item'       => esc_html__( 'Parent Quiz Topic', 'quizess' ),
        'parent_item_colon' => esc_html__( 'Parent Quiz Topic', 'quizess' ),
        'edit_item'         => esc_html__( 'Edit Quiz Topic', 'quizess' ),
        'update_item'       => esc_html__( 'Update Quiz Topic', 'quizess' ),
        'add_new_item'      => esc_html__( 'Add New Quiz Topic', 'quizess' ),
        'new_item_name'     => esc_html__( 'New Topic Quiz Name', 'quizess' ),
    );

    $args = array(
        'labels'              => $labels,
        'hierarchical'        => true,
        'show_ui'             => true,
        'show_in_menu'        => false,
        'query_vars'          => true,
        'show_in_rest'        => true,
    );

    register_taxonomy( self::QUIZESS_CATEGORY_SLUG, self::QUIZESS_POST_SLUG, $args );
  }


  /**
   * Register custom template for quiz post type
   *
   * @param string $template_path     Template path variable.
   * @return string Return new or old template path variable
   * @since 1.0.0
   */
  public function quiz_single_template( $template_path ) {
    if ( get_post_type() === self::QUIZESS_POST_SLUG ) {
      if ( is_single() ) {

        $template_path = General_Helper::get_base_path() . 'templates/single-quiz.php';
      }
    }
    return $template_path;
  }

  /**
   * Register quiz metabox fields
   *
   * @return void
   */
  public function quiz_options_metaboxes() : void {
    add_meta_box(
      self::QUIZESS_OPTIONS_META_ID,
      esc_html__( 'Quiz Options', 'quizess' ),
      [ $this, 'track_scores_metabox_view' ],
      self::QUIZESS_POST_SLUG,
      'side'
    );
  }

  /**
   * View callback for the metabox quiz options
   *
   * @param  \WP_Post $post Post object of the current page.
   * @return void
   */
  public function track_scores_metabox_view( \WP_Post $post ) : void {

    $quiz_options_template = General_Helper::get_base_path() . 'views/admin/quiz-meta-options.php';
    if ( ! empty( $quiz_options_template ) ) {
      include $quiz_options_template;
    }

    \wp_nonce_field( 'quiz_options_action', 'quiz_options_nonce' );
  }

  /**
   * Save method for the quiz options metaboxes
   *
   * @param int $post_id Post ID.
   * @return void
   */
  public function quiz_options_metabox_save( int $post_id ) : void {

    // Check if nonce is set.
    if ( ! isset( $_POST['quiz_options_nonce'] ) || ! \wp_verify_nonce( \sanitize_key( $_POST['quiz_options_nonce'] ), 'quiz_options_action' ) ) {
      return;
    }

    // Check if user has permissions to save data.
    if ( ! \current_user_can( 'edit_pages', $post_id ) ) {
      return;
    }

    $track_scores = ! empty( $_POST[ self::TRACK_SCORES_META_KEY ] ) ? \sanitize_text_field( \wp_unslash( $_POST[ self::TRACK_SCORES_META_KEY ] ) ) : '';

    $quiz_locked = ! empty( $_POST[ self::QUIZ_LOCKED_META_KEY ] ) ? \sanitize_text_field( \wp_unslash( $_POST[ self::QUIZ_LOCKED_META_KEY ] ) ) : '';

    \update_post_meta( $post_id, self::TRACK_SCORES_META_KEY, $track_scores );
    \update_post_meta( $post_id, self::QUIZ_LOCKED_META_KEY, $quiz_locked );

  }

}
