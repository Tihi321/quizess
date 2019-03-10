<?php
/**
 * Register all Rest_Routes.
 *
 * @since   1.0.0
 * @package Quizess\Rest_Register
 */

namespace Quizess\Rest;

use Quizess\Core\Service;
use Quizess\Helpers\Loader;
use Quizess\Rest\Rest_Callbacks;
use Quizess\Rest\Rest_Fields;
use Quizess\Helpers\Blocks_Helper;
use Quizess\Helpers\General_Helper;

/**
 * Class Register
 */
class Rest_Register extends Rest_Routes implements Service {

  /**
   * Use trait inside class.
   */
  use Loader;

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
   * @since 1.0.0
   */
  public function __construct() {
    $this->blocks_helper = new Blocks_Helper();

    // Callbacks.
    $this->get_quizess   = new Rest_Callbacks\Get_Quizess( $this->blocks_helper );
    $this->get_dashboard = new Rest_Callbacks\Get_Dashboard_Options();
    $this->post_scores   = new Rest_Callbacks\Post_Scores();
    $this->patch_scores  = new Rest_Callbacks\Patch_Scores();
    $this->patch_options = new Rest_Callbacks\Patch_General_Options();

    // Security.
    $this->rest_security = new Rest_Security();
  }

  /**
   * Register all the hooks
   *
   * @since 1.0.0
   */
  public function register() : void {

    // Register New Fields For block atributes on posts.
    $this->add_action( 'rest_api_init', $this, 'register_fields' );

    // Register Rest routes.
    $this->add_action( 'rest_api_init', $this, 'register_routes' );
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
      static::QUIZESS_SCORES,
      array(
          array(
              'methods'  => 'POST',
              'callback' => [ $this->post_scores, static::REST_CALLBACK ],
              'permission_callback' => [ $this->rest_security, self::USER_PERMISION_CHECK ],
          ),
          array(
              'methods'  => 'PATCH',
              'callback' => [ $this->patch_scores, static::REST_CALLBACK ],
              'permission_callback' => [ $this->rest_security, self::USER_PERMISION_CHECK ],
          ),
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
