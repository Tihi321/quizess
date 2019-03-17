<?php
/**
 * User player toggle
 *
 * @package Quizess\Views\Admin
 */

use Quizess\Core\Config;

$track_scores = \get_post_meta( $post->ID, Config::TRACK_SCORES_META_KEY, true );
$quiz_locked  = \get_post_meta( $post->ID, Config::QUIZ_LOCKED_META_KEY, true );

$checked             = ( $track_scores === 'on' ) ? 'checked' : '';
$quiz_locked_checked = ( $quiz_locked === 'on' ) ? 'checked' : '';

?>
<div class="qz-panel-group">
  <div class="components-panel__row">
    <label class="components__label" for="track-scores-checkbox-id"><?php esc_html_e( 'Track records', 'quizess' ); ?>
    <span class="components__label-helper">
      <?php esc_html_e( 'Will keep records of scores for logged in players', 'quizess' ); ?>
    </span>
  </label>
    <label class="toggle-switch">
      <input class="toggle-switch__input" name="<?php echo esc_attr( Config::TRACK_SCORES_META_KEY ); ?>" id="track-scores-checkbox-id" type="checkbox" <?php echo esc_attr( $checked ); ?>>
      <span class="toggle-switch__slider"></span>
    </label>
  </div>
</div>
<div class="qz-panel-group">
  <div class="components-panel__row">
    <label class="components__label" for="registered-quiz-checkbox-id"><?php esc_html_e( 'Lock quiz', 'quizess' ); ?>
    <span class="components__label-helper">
      <?php esc_html_e( 'Will lock this quiz for all non players', 'quizess' ); ?>
    </span>
  </label>
    <label class="toggle-switch">
      <input class="toggle-switch__input" name="<?php echo esc_attr( Config::QUIZ_LOCKED_META_KEY ); ?>" id="registered-quiz-checkbox-id" type="checkbox" <?php echo esc_attr( $quiz_locked_checked ); ?>>
      <span class="toggle-switch__slider"></span>
    </label>
  </div>
</div>
