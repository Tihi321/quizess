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
use Quizess\Helpers\General_Helper;

/**
 * Class Register
 */
class Rest_Register extends Rest_Routes {

  /**
   * General Helper class
   *
   * @var object General_Helper
   *
   * @since 1.0.0
   */
  protected $general_helper;

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
   * @param Blocks_Helper  $blocks_helper Blocks_Helper dependency.
   * @param General_Helper $general_helper Helper class instance.
   *
   * @since 1.0.0
   */
  public function __construct( Blocks_Helper $blocks_helper, General_Helper $general_helper ) {
    $this->blocks_helper  = $blocks_helper;
    $this->general_helper = $general_helper;

    // Callbacks.
    $this->get_quizess   = new Rest_Callbacks\Get_Quizess( $this->blocks_helper );
    $this->get_dashboard = new Rest_Callbacks\Get_Dashboard_Options();
    $this->post_score    = new Rest_Callbacks\Post_Score( $this->general_helper );
    $this->patch_scores  = new Rest_Callbacks\Patch_Scores();
    $this->patch_options = new Rest_Callbacks\Patch_General_Options( $this->general_helper );

    // Security.
    $this->rest_security = new Rest_Security( $this->general_helper );
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

    register_rest_route(
      static::REST_API_BASE . static::REST_API_VERSION,
      static::QUIZESS_SCORE,
      array(
          'methods'  => 'POST',
          'callback' => [ $this->post_score, static::REST_CALLBACK ],
          'permission_callback' => [ $this->rest_security, self::USER_PERMISION_CHECK ],
      )
    );

    register_rest_route(
      static::REST_API_BASE . static::REST_API_VERSION,
      static::QUIZESS_SCORES,
      array(
          'methods'  => 'PATCH',
          'callback' => [ $this->patch_scores, static::REST_CALLBACK ],
          'permission_callback' => [ $this->rest_security, self::USER_BASIC_AUTHENTIFICATION ],
      )
    );

    register_rest_route(
      static::REST_API_BASE . static::REST_API_VERSION,
      static::QUIZESS_OPTIONS,
      array(
          'methods'  => 'PATCH',
          'callback' => [ $this->patch_options, static::REST_CALLBACK ],
          'permission_callback' => [ $this->rest_security, self::USER_BASIC_AUTHENTIFICATION ],
      )
    );

    register_rest_route(
      static::REST_API_BASE . static::REST_API_VERSION,
      static::QUIZESS_DASHBOARD,
      array(
          array(
              'methods'  => 'GET',
              'callback' => [ $this->get_dashboard, static::REST_CALLBACK ],

          ),
      )
    );

  }

}
