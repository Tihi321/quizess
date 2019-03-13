<?php
/**
 * Custom header content
 *
 * @package Quizess\Template_Parts\Parts
 * @since 1.0.0
 */

?>
<header class="quizess-header quizess-header--<?php echo esc_attr( $theme ); ?>">
  <div class="quizess-header__overlay js-header-overlay">
  </div>
  <div class="quizess-header__menu-outer">
    <div class="quizess-header__menu js-header-menu" data-theme="<?php echo esc_attr( $theme ); ?>">
    </div>
    <div class="quizess-header__toggle js-menu-toggle">
      <span class="quizess-header__toggle-text">Menu</span>
  </div>
  </div>
</header>
