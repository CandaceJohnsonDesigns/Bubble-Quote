/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import QuoteEdit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'cjd-blocks/quote', {
	example: {
		attributes: {
			value:
				'<p>' + __( 'I\'m great for testimonials!' ) + '</p>',
		},
	},
	/**
	 * @see ./edit.js
	 */
	edit: QuoteEdit,

	/**
	 * @see ./save.js
	 */
	save
} );
