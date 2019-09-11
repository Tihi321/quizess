<?php
/**
 * Posts custom fields class file
 *
 * @since   1.0.0
 * @package Developer_Portal\Routes\Field
 */

namespace Quizess\Routes\Field;

use Eightshift_Libs\Core\Service;
use Eightshift_Libs\Routes\Callable_Field;
use Eightshift_Libs\Routes\Registrable_Field;

use Quizess\Blocks\Blocks_Utils;

/**
 * Class Pages Fields
 *
 * Class that holds methods for adding additional custom fields to the
 * documentation endpoint.
 */
class Post_Fields implements Service, Callable_Field, Registrable_Field {
  /**
   * Blocks_Utils reference
   *
   * @var object
   *
   * @since 1.0.0
   */
  protected $blocks_utils;

  /**
   * Initialize the class
   *
   * @param Blocks_Utils $blocks_utils Security callbacs.
   *
   * @since 1.0.0
   */
  public function __construct( Blocks_Utils $blocks_utils ) {
    $this->blocks_utils = $blocks_utils;
  }


  /**
   * Register all the hooks
   *
   * @since 1.0.0
   */
  public function register() : void {
    add_action( 'rest_api_init', [ $this, 'register_field' ] );
  }

  /**
   * Create new Rest fields for gutenberg blocks on question posts.
   *
   * @api
   *
   * @since 1.0.0
   */
  public function register_field() {

    register_rest_field(
      'question',
      'blocks',
      [
        'get_callback' => [ $this, 'field_callback' ],
      ]
    );
  }

  /**
   * Get Parsed blocks data.
   *
   * @param object|array $object      Post or custom post type object of the request.
   * @param string       $attr        Rest field/attr string identifier from the second parameter of your register_rest_field() declaration.
   * @param object       $request     Full request payload – as a WP_REST_Request object.
   * @param string       $object_type The object type which the field is registered against. Typically first parameter of your register_rest_field() declaration.
   *
   * @return mixed If response generated an error, WP_Error, if response
   *               is already an instance, WP_HTTP_Response, otherwise
   *               returns a new WP_REST_Response instance.
   *
   * @since 1.0.0
   */
  public function field_callback( $object, string $attr, $request, string $object_type ) {
    return $this->blocks_utils->parse_gutenberg_blocks( $object['content']['raw'] );
  }

}
