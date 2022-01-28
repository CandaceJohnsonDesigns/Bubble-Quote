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
 export default function Edit( {
	context
} ) {

	const tailAlign = context["cjd-blocks/tailAlign"];
	const tailColor = context["cjd-blocks/tailColor"];

	const tailStyle = {
    		color: tailColor ? `var(--wp--preset--color--${ tailColor })`
    		: `var(--wp--preset--color--white)`,
    	};

	const tailClass =
		classnames(
        	'wp-block-cjd-blocks-bubble-quote-tail',
        	{
				[`has-${ tailAlign }-tail`] : tailAlign
            }
    	);

	const BubbleTail = tailAlign == "center" ? () => (
       		<Icon width="48px" height="48px"
            	icon={
                	icons.speech_center
            	}
        	/>
    	) : () => (
        	<Icon width="48px" height="34px"
            	icon={
                	icons.speech_side
            	}
        	 />
    	);

	return (
		<div className={ tailClass } style={ tailStyle }>
			<BubbleTail tailAlign={ tailAlign } />
		</div>
	);
}
