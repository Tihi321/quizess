<?php
/**
 * Register all Rest_Routes.
 *
 * @since   1.0.0
 * @package Quizess\Rest_Routes
 */

namespace Quizess\Rest;

use Quizess\Rest\Rest_Callbacks;
use Quizess\Rest\Rest_Fields;
use Quizess\Helpers\Blocks_Helper;

/**
 * Class Register
 */
class Rest_Register extends Rest_Routes {
  /**
   * Blocks_Helper reference
   *
   * @var object
   *
   * @since 1.0.0
   */
  protected $blocks_helper;

  /**
   * Initialize the class
   *
   * @param Blocks_Helper $blocks_helper Blocks_Helper dependency.
   * @since 1.0.0
   */
  public function __construct( Blocks_Helper $blocks_helper ) {
    $this->blocks_helper = $blocks_helper;

    // Callbacks.
    $this->get_quizess = new Rest_Callbacks\Get_Quizess( $this->blocks_helper );
  }


  /**
   * A callback function that handles REST fields
   *
   * @api
   *
   * @since 1.0.0
   */
  public function register_fields() : void {
    ( new Rest_Fields\Post_Fields( $this->blocks_helper ) )->register_block_fields();
  }

  /**
   * A callback function that handles REST routes
   *
   * @api
   *
   * @since 1.0.0
   */
  public function register_routes() : void {
    register_rest_route(
      static::REST_API_BASE . static::REST_API_VERSION,
      static::QUIZESS_POSTS,
      array(
          'methods'             => 'GET',
          'callback'            => [ $this->get_quizess, static::REST_CALLBACK ],
          'args' => array(
              'id' => array(
                  'validate_callback' => function( $param, $request, $key ) {
                    return is_numeric( $param );
                  },
                  'required' => true,
              ),
          ),
      )
    );
  }

}
