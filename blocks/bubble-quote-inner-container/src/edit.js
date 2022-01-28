/**
 * External dependencies
 */
 import classnames from 'classnames';

/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';
 import {
	 useBlockProps,
	 useInnerBlocksProps,
 } from '@wordpress/block-editor';
 import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
 export default function QuoteEdit( {
	attributes,
	setAttributes,
	mergeBlocks,
	onReplace,
	clientId
} ) {
	const { backgroundColor } = attributes;

    const ALLOWED_BLOCKS = [ 'cjd-blocks/bubble-quote-tail', 'cjd-blocks/bubble-quote-quote' ];

    const TEMPLATE = [
    	[ 'cjd-blocks/bubble-quote-quote', { } ],
    	[ 'cjd-blocks/bubble-quote-tail', { } ]
    ];

	const blockProps = useBlockProps();

    const innerBlocksProps =
    	useInnerBlocksProps( blockProps, {
        	allowedBlocks: ALLOWED_BLOCKS,
        	template: TEMPLATE,
        	templateLock: "all"
        }
    );

	return (
		<>
			<div { ...innerBlocksProps } />
		</>
	);
}
