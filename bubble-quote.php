<?php
/**
 * Plugin Name:       Bubble Quote
 * Description:       Enhanced styling for a quote
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Candace Johnson
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cjd-blocks-bubble-quote
 *
 * @package           cjd-blocks-bubble-quote
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function cjd_blocks_bubble_quote_block_init() {
	// automatically load dependencies and version
        $asset_file = include( plugin_dir_path( __FILE__ ) . 'blocks/bubble-tail/build/index.asset.php');

        wp_register_script(
        	'cjd-blocks-bubble-tail',
        	plugins_url( 'blocks/bubble-tail/build/index.js', __FILE__ ),
        	$asset_file['dependencies'],
        	$asset_file['version']
        );

        register_block_type(
        	plugin_dir_path( __FILE__ ) . 'blocks/bubble-tail/',
        	array(
        		'api_version' => 2,
        		'editor_script' => 'cjd-blocks-bubble-tail',
        		'render_callback' => 'render_cjd_blocks_bubble_tail'
        	)
        );

        function render_cjd_blocks_bubble_tail( $block_attributes, $content, $block ) {

        	$style = $block->context['cjd-blocks/tailColor'] != null ?
        		'color: var(--wp--preset--color--' . $block->context['cjd-blocks/tailColor'] . ')' :
                'color: var(--wp--preset--color--white)';

            $class = 'has-' . $block->context['cjd-blocks/tailAlign'] . '-tail';

        	$icon = $block->context['cjd-blocks/tailAlign'] == "center" ?
        		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 7" width="48px" height="48px"><path d="M9.5 0H0C6.7 3 9.5 7 9.5 7S12.3 3 19 0Z"/></svg>' :
        		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.5 12.9" width="48px" height="34px" className="speech-bubble-tail"><path d="M0.5 0c0.4 1.8 0.6 3.6 0.6 5.5 0 2.6-0.4 5.1-1 7.4C8.1 12.2 14.9 7.1 18.5 0H0.5z"/></svg>';

        	return '<div class="bubble-tail ' . $class . '" style="' . $style . '" />' . $icon . '</div>';
        }

	register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/quote/' );
	register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/bubble-quote/' );


}
add_action( 'init', 'cjd_blocks_bubble_quote_block_init' );
