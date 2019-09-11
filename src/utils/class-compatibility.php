<?php
/**
 * Error Utility class.
 *
 * @since   1.0.0
 * @package Quizess\Admin
 */

namespace Quizess\Utils;

use Eightshift_Libs\Core\Service;

/**
 * Class Compatibility
 *
 * This class handles srtings.
 *
 * @since 1.0.0
 */
class Compatibility implements Service {

  /**
   * Register all the hooks
   *
   * @return void
   *
   * @since 1.0.0
   */
  public function register() {
    add_action( 'allowed_block_types', [ $this, 'gutenberg_validation' ] );
  }

  /**
   * Deactivate if gutenberg not detected, or just return boolean.
   *
   * @return void
   */
  public function gutenberg_validation() : void {

    // checks if gutenberg is activated.
    if ( ! $this->check_compatibility() ) {
      deactivate_plugins( apply_filters( 'qz_get_base_url', 'name' ) );
      add_action( 'admin_notices', [ $this, 'compatibility_notice' ] );
    }

  }


  /**
   * Quizess needs WP 5.0+ or Gutenberg Plugin to work
   */
  private function check_compatibility() {

    if ( ! function_exists( 'is_gutenberg_page' ) ) {
      return false;
    }

    return true;
  }

  /**
   * Cmpatibility notice
   *
   * @return void
   */
  private function compatibility_notice() {
    ?>
    <div class="error notice is-dismissible">
        <p><?php esc_html_e( 'All Gutenberg Blocks requires WordPress 5.0 or Gutenberg plugin to be activated', 'quizess' ); ?></p>
    </div>
    <?php

  }
}
