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
	 InnerBlocks,
	 RichText,
	 useBlockProps,
	 useInnerBlocksProps
 } from '@wordpress/block-editor';
 import { createBlock } from '@wordpress/blocks';
 import { Platform } from '@wordpress/element';

 const isWebPlatform = Platform.OS === 'web';

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
 export default function Edit( {
	clientId,
	attributes,
	setAttributes,
	isSelected,
	insertBlocksAfter,
} ) {
	const { align, citation } = attributes;

	const isParentofSelectedBlock = useSelect( ( select ) =>
    		select( 'core/block-editor' ).hasSelectedInnerBlock( clientId, true ) );

	const className =
		classnames(
			{
				[`has-text-align-${ align }`] : align,
			}
		);

	const blockProps = useBlockProps( {
		className: className,
	} );

	return (
		<>
            	<RichText
            		identifier="wp-block-cjd-blocks-citation"
            		tagName="cite"
            		style={ { display: 'block' } }
            		value={ citation }
            		onChange={ ( nextCitation ) =>
            			setAttributes( {
            				citation: nextCitation,
            			} )
            		}
            		__unstableMobileNoFocusOnMount
            		aria-label={ __( 'Quote citation text' ) }
            		placeholder={
            			// translators: placeholder text used for the citation
            			__( 'Add citation' )
            		}
            		textAlign={ align }
            		className="wp-block-cjd-blocks-bubble-quote-citation"
            		__unstableOnSplitAtEnd={ () =>
            			insertBlocksAfter( createBlock( 'core/paragraph' ) )
            		}
            		{ ...blockProps }
            	>
            	</RichText>
		</>
	);
}
