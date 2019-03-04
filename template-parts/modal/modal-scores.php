<?php
/**
 * Scores modal
 *
 * @package Quizess\Template_Parts\Modal
 * @since 1.0.0
 */

use Quizess\Helpers;

$general_helper = new Helpers\General_Helper();

$user_id = get_current_user_id();
$correct = $general_helper->get_array_value( 'correct', $player_scores[ $user_id ]['last'] );
$total   = $general_helper->get_array_value( 'total', $player_scores[ $user_id ]['last'] );

?>

<div class="modal js-modal" id="<?php echo esc_attr( $scores_modal_id ); ?>" style="background-color:<?php echo esc_attr( $bg_color ); ?>;background-image:url('<?php echo esc_attr( $bg_image_url ); ?>');">
  <div class="modal__inner modal__inner--<?php echo esc_attr( $theme ); ?>">
    <div class="modal__top-bar modal__top-bar--<?php echo esc_attr( $theme ); ?>">
      <button class="btn-close js-modal-trigger-close" data-modal="<?php echo esc_attr( $scores_modal_id ); ?>">
      </button>
    </div>
    <div class="modal__content">
      <h1 class="modal__title">
        <?php echo esc_html__( 'Scores', 'quizess' ); ?>
      </h1>
    <?php if ( ! empty( $player_scores ) ) { ?>
      <?php if ( ! empty( $user_id ) && ! empty( $correct ) && ! empty( $total ) ) { ?>
        <div class="modal_last-score last-score">
          <div class="last-score__title">
            <?php echo esc_html__( 'Last score', 'quizess' ); ?>
          </div>
          <ul class="last-score__parent">
            <li class="last-score__item last-score__item--title">
            <?php
            $last_score_titles_template = $base_path . 'template-parts/modal/parts/last-score-titles.php';

            if ( ! empty( $last_score_titles_template ) ) {
              include $last_score_titles_template;
            }
            ?>
            </li>
            <li class="last-score__item">
            <?php
            $last_score_item_template = $base_path . 'template-parts/modal/parts/last-score-item.php';

            if ( ! empty( $last_score_item_template ) ) {
              include $last_score_item_template;
            }
            ?>
            </li>
          </ul>
        </div>
      <?php } ?>
      <div class="modal__scores scores">
        <ul class="scores__parent">
          <li class="scores__item scores__item--title">
            <?php
            $score_titles_template = $base_path . 'template-parts/modal/parts/score-titles.php';

            if ( ! empty( $score_titles_template ) ) {
              include $score_titles_template;
            }
            ?>
          </li>
          <li class="scores__item">
            <?php
            foreach ( $player_scores as $index => $player ) {

              $score_item_template = $base_path . 'template-parts/modal/parts/score-item.php';

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
