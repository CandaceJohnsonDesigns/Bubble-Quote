/**
 * External dependencies
 */
 import classnames from 'classnames';

/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';
  import { useSelect } from '@wordpress/data';
 import {
	 AlignmentControl,
	 BlockControls,
	 RichText,
	 useBlockProps,
	 useInnerBlocksProps,
	 getColorClassName
 } from '@wordpress/block-editor';
 import { createBlock } from '@wordpress/blocks';
 import { Icon } from '@wordpress/components';
 import { Platform } from '@wordpress/element';

 const isWebPlatform = Platform.OS === 'web';

/**
 * Internal dependencies
 */
import './editor.scss';
import icons from './icons.js';

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
	const { align, value, backgroundColor } = attributes;

	const classNames =
    		classnames(
    			{
    				[`has-text-align-${ align }`] : align
    			}
    		);


	const blockProps = useBlockProps( {
    		className: classNames,
    	} );

    const ALLOWED_BLOCKS = [ 'cjd-blocks/bubble-tail', 'core/paragraph' ];

    const TEMPLATE = [
    	[ 'cjd-blocks/bubble-tail', { },
    		'core/paragraph', { content: "I'm an inner paragraph." }
    	]
    ];

    const { children, ...innerBlocksProps } =
    	useInnerBlocksProps( blockProps, {
        	allowedBlocks: ALLOWED_BLOCKS,
        	template: TEMPLATE,
        	templateLock: "all"
        }
    );

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
			<div { ...innerBlocksProps } >
				<RichText
					identifier="value"
					multiline="p"
					value={ value }
					onChange={ ( nextValue ) =>
						setAttributes( {
							value: nextValue,
						} )
					}
					onMerge={ mergeBlocks }
					aria-label={ __( 'Quote text' ) }
					placeholder={
						// translators: placeholder text used for the quote
						__( 'Add quote' )
					}
					onReplace={ onReplace }
					onSplit={ ( piece ) =>
						createBlock( 'cjd-blocks/quote', {
							...attributes,
							value: piece,
						} )
					}
					__unstableOnSplitMiddle={ () =>
						createBlock( 'core/paragraph' )
					}
					textAlign={ align }
				/>
				{ children }
			</div>
		</>
	);
}
