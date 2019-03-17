<?php
/**
 * Scores modal
 *
 * @package Quizess\Views\Modal
 * @since 1.0.0
 */

use Quizess\Helpers\General_Helper;

$user_id       = get_current_user_id();
$user_id_check = ( $user_id !== 0 ) ? $user_id : false;

$player_scores = $blocks_helper->get_quiz_scores( $post->ID, $user_id_check );

$correct = General_Helper::get_array_value( 'correct', $player_scores['last'] ) ?: 0;
$total   = General_Helper::get_array_value( 'total', $player_scores['last'] ) ?: 0;

?>

<div class="modal js-modal" id="<?php echo esc_attr( $scores_modal_id ); ?>" style="background-color:<?php echo esc_attr( $bg_color ); ?>;background-image:url('<?php echo esc_attr( $bg_image_url ); ?>');">
  <div class="modal__inner modal__inner--narrow modal__inner--<?php echo esc_attr( $theme ); ?>">
    <div class="modal__top-bar modal__top-bar--<?php echo esc_attr( $theme ); ?>">
      <h1 class="modal__title">
        <?php echo esc_html__( 'High scores', 'quizess' ); ?>
      </h1>
      <button class="btn-close js-modal-trigger-close" data-modal="<?php echo esc_attr( $scores_modal_id ); ?>">
      </button>
    </div>
    <div class="modal__content">
    <?php if ( ! empty( $quiz_scores['players'] ) ) { ?>
      <?php if ( ! empty( $player_scores['last'] ) && ! empty( $correct ) && ! empty( $total ) ) { ?>
        <div class="modal__quiz-accomplishment">
          <div class="quiz-accomplishment">
            <div class="modal__table-title quiz-accomplishment__title">
              <?php echo esc_html__( 'Stats', 'quizess' ); ?>
              <span class="modal__title-helper">
                <?php echo esc_html__( 'Last take on quiz', 'quizess' ); ?>
              </span>
            </div>
            <ul class="quiz-accomplishment__parent">
              <li class="quiz-accomplishment__item quiz-accomplishment__item-title">
              <?php
              $last_score_titles_template = $base_path . 'views/modal/parts/accomplishment-titles.php';

              if ( ! empty( $last_score_titles_template ) ) {
                include $last_score_titles_template;
              }
              ?>
              </li>
              <li class="quiz-accomplishment__item">
              <?php
              $last_score_item_template = $base_path . 'views/modal/parts/accomplishment-item.php';

              if ( ! empty( $last_score_item_template ) ) {
                include $last_score_item_template;
              }
              ?>
              </li>
            </ul>
          </div>
        </div>
      <?php } ?>
        <div class="modal__hall-of-fame">
          <div class="modal__table-title stats__table-title">
            <?php echo esc_html__( 'Hall of fame', 'quizess' ); ?>
          </div>
          <ul class="stats__parent">
            <li class="stats__item stats__item-title">
              <?php
              $score_titles_template = $base_path . 'views/modal/parts/score-titles.php';

              if ( ! empty( $score_titles_template ) ) {
                include $score_titles_template;
              }
              ?>
            </li>
            <li class="stats__item">
              <?php
              foreach ( $quiz_scores['players'] as $index => $player ) {

                $score_item_template = $base_path . 'views/modal/parts/score-item.php';

                if ( ! empty( $score_item_template ) ) {
                  include $score_item_template;
                }
              }
              ?>
            </li>
          </ul>
        </div>
    <?php } ?>
    </div>
  </div>
</div>
