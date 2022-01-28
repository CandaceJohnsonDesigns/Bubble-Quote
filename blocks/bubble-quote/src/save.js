/**
 * External dependencies
 */
 import classnames from 'classnames';

 /**
  * Internal dependencies
  */
 import { BlockQuote } from './blockquote';

 /**
  * WordPress dependencies
  */
 import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

 export default function save( { attributes } ) {
	 const { align } = attributes;

	 const className = classnames( {
		 [ `has-text-align-${ align }` ]: align,
	 } );

	 const innerBlocksProps = useInnerBlocksProps.save( useBlockProps.save( { className: className, } ) );

	 return (
		 <BlockQuote { ...innerBlocksProps } />
	 );
 }
