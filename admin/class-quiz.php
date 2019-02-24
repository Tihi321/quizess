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
                'wrapClass' => 'quizess-quiz-section',
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
   * @param string $template_path     Template path variable.
   * @return string Return new or old template path variable
   * @since 1.2.0
   */
  public function quiz_single_template( $template_path ) {
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

  /**
   * Register custom post meta fields for post.
   *
   * @since 1.2.0
   */
  public function register_post_meta() : void {
    register_meta(
      'post',
      Config::SCORES_META_KEY,
      array(
          'show_in_rest' => true,
          'single' => true,
          'type' => 'string',
          'auth_callback' => function() {
            $current_user_id = get_current_user_id();
            $user_can = get_user_meta( $current_user_id, 'user_player_quizess', true );
            return $user_can;
          },
      )
    );
  }

  /**
   * Track scores metabox
   *
   * @return void
   */
  public function track_scores_metabox() : void {
    add_meta_box(
      Config::TRACK_SCORES_META_KEY,
      esc_html__( 'Hall of fame', 'developer-portal' ),
      [ $this, 'track_scores_metabox_view' ],
      Config::QUIZESS_POST_SLUG,
      'side'
    );
  }

  /**
   * View callback for the track scores metabox
   *
   * @param  \WP_Post $post Post object of the current page.
   * @return void
   */
  public function track_scores_metabox_view( \WP_Post $post ) : void {
    $track_scores = \get_post_meta( $post->ID, Config::TRACK_SCORES_META_KEY, true );
    $checked      = ( $track_scores === 'on' ) ? 'checked' : '';
    ?>
    <div class="qz-panel-group">
      <div class="components-panel__row">
        <label for="track-scores-checkbox-id"><?php esc_html_e( 'Track scores', 'developer-portal' ); ?></label>
        <label class="toggle-switch">
          <input class="toggle-switch__input" name="<?php echo esc_attr( Config::TRACK_SCORES_META_KEY ); ?>" id="track-scores-checkbox-id" type="checkbox" <?php echo esc_attr( $checked ); ?>>
          <span class="toggle-switch__slider"></span>
        </label>
      </div>
    </div>
    <?php
    \wp_nonce_field( 'track_scores_action', 'track_scores_nonce' );
  }

  /**
   * Save method for the track scores metabox
   *
   * @param int $post_id Post ID.
   * @return void
   */
  public function track_scores_metabox_save( int $post_id ) : void {

    // Check if nonce is set.
    if ( ! isset( $_POST['track_scores_nonce'] ) || ! \wp_verify_nonce( \sanitize_key( $_POST['track_scores_nonce'] ), 'track_scores_action' ) ) {
      return;
    }

    // Check if user has permissions to save data.
    if ( ! \current_user_can( 'edit_pages', $post_id ) ) {
      return;
    }

    $track_scores = ! empty( $_POST[ Config::TRACK_SCORES_META_KEY ] ) ? \sanitize_text_field( \wp_unslash( $_POST[ Config::TRACK_SCORES_META_KEY ] ) ) : '';

    $rest_output = ( $track_scores_checkbox === 'on' ) ? 'Yes on' : 'no';

    \update_post_meta( $post_id, Config::TRACK_SCORES_META_KEY, $track_scores );
    \update_post_meta( $post_id, Config::SCORES_META_KEY, $rest_output );
  }

}
