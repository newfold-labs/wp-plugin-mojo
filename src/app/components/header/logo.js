import { Button } from '@wordpress/components';
import { Heading } from '../../components';
import { ReactComponent as Brand } from '../../../../assets/svg/web-logo.svg';
import { delay } from 'lodash';

const Mark = () => {
	const defocus = () => {
		const button = document.querySelector( '.logo-mark' );
		delay( () => {
			if ( null !== button ) {
				button.blur();
			}
		}, 500 );
	};
	return (
		<Button
			icon={ <Brand className="wppw-logo" /> }
			style={ { height: '39px' } }
			iconSize={ 39 }
			onMouseUp={ defocus }
			className="logo-mark"
			href="#/home"
		/>
	);
};

const Logo = () => {
	return (
		<div className="wppw-logo-wrap">
			<Mark />
			<Heading level="2" className="screen-reader-text">
				{ __( 'Web.com WordPress Plugin', 'wp-plugin-web' ) }
			</Heading>
		</div>
	);
};

export default Logo;
