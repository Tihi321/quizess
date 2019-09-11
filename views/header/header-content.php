<?php
/**
 * Custom header content
 *
 * @package Quizess\Views\Parts
 * @since 1.0.0
 */

$base_path = apply_filters( 'qz_get_base_url', 'path' );

?>
<header class="quizess-header quizess-header--<?php echo esc_attr( $theme ); ?> js-header">
  <div class="quizess-header__overlay js-header-overlay">
  </div>
  <div class="quizess-header__menu-outer">
    <div class="quizess-header__menu js-header-menu" data-theme="<?php echo esc_attr( $theme ); ?>">
    </div>
    <div class="quizess-header__toggle js-menu-toggle">
      <span class="quizess-header__toggle-icon">
      <?php
      $menu_icon = $base_path . 'views/svg/menu-icon.php';

      if ( ! empty( $menu_icon ) ) {
        include $menu_icon;
      }
      ?>
      </span>
  </div>
  </div>
</header>
