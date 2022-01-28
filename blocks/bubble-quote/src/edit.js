/**
 * External dependencies
 */
 import classnames from 'classnames';

/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';
 import { useSelect, dispatch } from '@wordpress/data';
 import {
	 AlignmentControl,
	 BlockControls,
	 InnerBlocks,
	 RichText,
	 useBlockProps,
	 useInnerBlocksProps
 } from '@wordpress/block-editor';
 import { BlockQuotation } from '@wordpress/components';
 import { createBlock } from '@wordpress/blocks';
 import { Platform } from '@wordpress/element';

 const isWebPlatform = Platform.OS === 'web';

/**
 * Internal dependencies
 */
import './editor.scss';
import { BlockQuote } from './blockquote';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
 export default function BubbleQuoteEdit( {
	clientId,
	attributes,
	setAttributes,
	isSelected,
	insertBlocksAfter,
} ) {
	const { align } = attributes;

	const ALLOWED_BLOCKS = [ 'cjd-blocks/bubble-quote-inner-container', 'cjd-blocks/bubble-quote-citation' ];

	const TEMPLATE = [
		[ 'cjd-blocks/bubble-quote-inner-container', { } ],
		[ 'cjd-blocks/bubble-quote-citation', {} ]
	];

	const className =
		classnames(
			{
				[`has-text-align-${ align }`] : align,
			}
		);

	const blockProps = useBlockProps( {
		className: className,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
        templateLock: "all"
	} );

	const controls = (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ align }
					onChange={ ( nextAlign ) => {
                    	setAttributes( { align: nextAlign } );
                    } }
				/>
			</BlockControls>
		</>
	);

	return (
		<>
			{ controls }
			<BlockQuote { ...innerBlocksProps } />
		</>
	);
}
