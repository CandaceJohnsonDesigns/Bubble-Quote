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
	 getColorClassName
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
 export default function Edit( {
	attributes,
	setAttributes,
	mergeBlocks,
	onReplace,
	clientId
} ) {
	const { align, content } = attributes;

	const classNames =
    		classnames(
    			{
    				[`has-text-align-${ align }`] : align
    			}
    		);

	const blockProps = useBlockProps( {
    		className: classNames,
    } );

	const controls = ( { value, onChange, onFocus } ) => (
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
				<RichText
					multiline="p"
					onChange={ ( nextContent ) =>
						setAttributes( {
							content: nextContent
						} )
					}
					value={ content }
					onMerge={ mergeBlocks }
					aria-label={ __( 'Quote text' ) }
					placeholder={
						// translators: placeholder text used for the quote
						__( 'Add quote' )
					}
					onReplace={ onReplace }
					onSplit={ ( value ) =>
						createBlock( 'cjd-blocks/quote', {
							...attributes,
							content: value,
						} )
					}
					__unstableOnSplitMiddle={ () =>
						createBlock( 'core/paragraph' )
					}
					textAlign={ align }
					{ ...blockProps }
				>
					{ controls }
				</RichText>
		</>
	);
}
