<?php
/**
 * The Blocks_Utils.
 *
 * @since   1.0.0
 * @package Quizess\Blocks
 */

namespace Quizess\Blocks;

use Eightshift_Libs\Core\Service;

use Quizess\Core\Config;

/**
 * Class that holds all the necessary functionality parsing
 * of blocks for plugin
 *
 * @since 1.0.0
 */
final class Blocks_Utils implements Service {

  /**
   * Register all the hooks
   *
   * @since 1.0.0
   */
  public function register() : void {
    add_filter( 'qz_get_quiz_options', [ $this, 'get_quiz_options' ] );
    add_filter( 'qz_get_quiz_scores', [ $this, 'get_quiz_scores' ], 10, 2 );
  }


  /**
   * Parses blocks out of a content string.
   * Usefull for providing atributes from blocks on backend, instead of using client side parser
   *
   * @since 1.0.0
   *
   * @param  string $content Post content.
   * @return array  Array of parsed block objects.
   */
  public function parse_gutenberg_blocks( string $content ) {
    /**
     * Filter to allow plugins to replace the server-side block parser
     *
     * @since 1.0.0
     *
     * @param string $parser_class Name of block parser class
     */
    $parser_class = apply_filters( 'block_parser_class', 'WP_Block_Parser' );
    $parser       = new $parser_class();
    return $parser->parse( $content );
  }

  /**
   * Get Parsed blocks data.
   *
   * @param array $parsed_blocks     Parsed blocks from post.
   * @return array         JSON with Parsed blocks atributes data.
   *
   * @since 1.0.0
   */
  public function get_decoded_quiz_values( $parsed_blocks ) : array {

    $output    = array();
    $questions = array();

    // All block name expected from post.
    $prefix_name = Config::PLUGIN_NAME;
    $block_names = [
      'options'    => $prefix_name . '/cpt-quizess-options-block',
      'bg-options' => $prefix_name . '/cpt-quizess-background-options-block',
      'section'    => $prefix_name . '/section',
      'question'   => $prefix_name . '/question-block',
      'category'   => $prefix_name . '/questions-category-block',
    ];

    foreach ( $parsed_blocks as $index => $quiz_item ) {
      switch ( $quiz_item['blockName'] ) {
        case $block_names['options']:
          $use_timer = $quiz_item['attrs']['useTimer'] ?? '';

          $output['options'] = array(
            'timer'          => ( $use_timer ) ? $quiz_item['attrs']['timer'] ?? '' : null,
            'theme'          => ( isset( $quiz_item['attrs']['theme'] ) ) ? json_decode( $quiz_item['attrs']['theme'] )->value : 'light',
            'welcomeMessage' => $quiz_item['attrs']['welcomeMessage'] ?? '',
            'successMessage' => $quiz_item['attrs']['successMessage'] ?? '',
            'failureMessage' => $quiz_item['attrs']['failureMessage'] ?? '',
            'aboutField'     => $quiz_item['attrs']['aboutField'] ?? '',
          );
              break;
        case $block_names['bg-options']:
          $output['bg-options'] = array(
            'bgColor' => $quiz_item['attrs']['backgroundColor'] ?? '',
            'bgUrl'   => $quiz_item['attrs']['url'] ?? '',
            'bgAlt'   => $quiz_item['attrs']['title'] ?? '',
          );
              break;
        case $block_names['section']:
          $output['questions'] = $quiz_item['innerBlocks'] ?? '';
              break;
        default:
      }
    }

    foreach ( $output['questions'] as $index => $block ) {
      switch ( $block['blockName'] ) {
        case $block_names['question']:
          $questions[ $index ] = [
            'name' => 'question',
            'style' => $this->get_style_data( $block['attrs'] ),
            'data' => $this->get_question_data( $block['attrs'] ),
          ];
              break;
        case $block_names['category']:
          $category = $this->get_decoded_array_value( 'category', $block['attrs'] );
          $selected = $this->get_decoded_array_value( 'posts', $block['attrs'] );

          if ( ! empty( $category ) && ! empty( $selected ) ) {
            $category_name       = $category['label'];
            $questions[ $index ] = [
              'name' => 'category',
              'category' => $category_name,
              'style' => $this->get_style_data( $block['attrs'] ),
              'questions' => $this->get_selected_questions_data( $selected ),
            ];
          }
              break;
        default:
      }
    }

    return array(
      'options' => $output['options'],
      'bgOptions' => $output['bg-options'],
      'blocks' => $questions,
    );
  }

  /**
   * Return blocks options data
   *
   * @param string $content Post content.
   * @since 1.0.0
   */
  public function get_quiz_options( $content ) : array {
    $parsed_blocks = $this->parse_gutenberg_blocks( $content );
    $blocks_data   = $this->get_decoded_quiz_values( $parsed_blocks );
    return array(
      'options' => $blocks_data['options'],
      'bgOptions' => $blocks_data['bgOptions'],
    );
  }

  /**
   * Return blocks scores data
   *
   * @param int  $quiz_id Quid id.
   * @param bool $user_id With second param you can retun only users logged in data.
   * @since 1.0.0
   */
  public function get_quiz_scores( $quiz_id, $user_id = false ) : array {
    $players_data  = [];
    $scores_output = [];

    $scores = \get_post_meta( $quiz_id, Config::SCORES_META_KEY, true );

    if ( $scores ) {

      $players = $scores['players'];

      if ( $user_id ) {

        $player_scores = $this->get_player_scores( $players, $user_id );
        return $player_scores;
      }

      foreach ( $players as $key => $player ) {
        $players_data[] = $player;
      }
      $scores_output['players'] = $players_data;
      $scores_output['stats']   = $scores['stats'];
    }

    return $scores_output;
  }

  /**
   * Return blocks scores data from particular player.
   *
   * @param int  $players_data Quiz players scrores array data.
   * @param bool $user_id users id to retrieve data from array.
   * @since 1.0.0
   */
  public function get_player_scores( $players_data, $user_id ) : array {

    // try to retrieve users data from array, if thee is no data return empty array.
    $player_scores = $players_data[ $user_id ] ?? '';
    return ( ! empty( $player_scores ) ) ? $player_scores : [];

  }

  /**
   * Get selected questions blocks data
   *
   * @param array $blocks_data Blocks_Helper dependency.
   * @since 1.0.0
   */
  private function get_selected_questions_data( $blocks_data ) : array {
    $block_ids     = [];
    $question_data = [];

    foreach ( $blocks_data as $index => $block ) {
      $block_ids[] = $block['value'];
    }

    $args        = array(
      'post_type' => 'question',
      'posts_per_page' => -1,
      'post__in' => $block_ids,
      'order_by' => 'post__in',
    );
    $block_posts = get_posts( $args );

    foreach ( $block_posts as $index => $block_post ) {

      $parsed_data = $this->parse_gutenberg_blocks( $block_post->post_content );

      $question_data[ $index ] = [
        'name' => 'question',
        'data' => $this->get_question_data( $parsed_data[0]['attrs'] ),
      ];
    }

    return $question_data;
  }

  /**
   * Get question data
   *
   * @param array $block_data Blocks_Helper dependency.
   * @since 1.0.0
   */
  private function get_question_data( $block_data ) : array {

    $show_explanation  = $block_data['showExplanation'] ?? '';
    $explanation       = $block_data['explanation'] ?? '';
    $explanation_type  = ( $block_data['explanationType'] ) ? json_decode( $block_data['explanationType'] )->value : null;
    $explanation_media = json_decode( $block_data['explanationMedia'] ?? '{}' );
    $title             = $block_data['title'] ?? '';
    $question          = $block_data['question'] ?? '';
    $answers_array     = $this->get_decoded_array_value( 'answers', $block_data );
    $filtered_array    = array_filter( $answers_array, array( $this, 'filter_empty_answers' ) );

    return array(
      'title'            => ( $title ) ? $title : null,
      'question'         => ( $question ) ? $question : null,
      'answers'          => ( ! empty( $filtered_array ) ) ? $filtered_array : null,
      'explanationText'  => ( $show_explanation ) ? $explanation : null,
      'explanationType'  => ( $show_explanation && $explanation_type !== 'none' ) ? $explanation_type : null,
      'explanationMedia' => ( $show_explanation && $explanation_media->id ) ? $explanation_media : null,
    );
  }

  /**
   * Get style data
   *
   * @param array $block_data Blocks_Helper dependency.
   * @since 1.0.0
   */
  private function get_style_data( $block_data ) : array {

    return array(
      'direction'  => ( $block_data['rows'] ) ? json_decode( $block_data['rows'] )->value : 'row',
      'theme'  => ( isset( $block_data['theme'] ) ) ? json_decode( $block_data['theme'] )->value : 'light',
    );
  }

  /**
   * Get Parsed blocks data.
   *
   * @param string      $key     Post object content.
   * @param string|null $content     Post object content.
   * @return array      JSON with Parsed blocks atributes data.
   *
   * @since 1.0.0
   */
  private function get_decoded_array_value( $key, $content ) : array {
    $content_value = $content[ $key ] ?? '';
    $output        = ( ! empty( $content_value ) ) ? json_decode( $content_value, true ) : array();

    return $output;
  }

  /**
   * Check if answer text value is not empty and return it.
   *
   * @param array $array Questions array to filter.
   * @return bool return true if answer is valid.
   *
   * @since 1.0.0
   */
  private function filter_empty_answers( $array ) {

    return ( $array['text'] !== '' );
  }

}
