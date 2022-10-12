import { Button } from '@wordpress/components';
import { Heading } from '../../components';
import logoUrl from '../../../../assets/images/New-Logo-Black.png';
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
			style={ { height: '39px' } }
			iconSize={ 39 }
			onMouseUp={ defocus }
			className="logo-mark"
			href="#/home"
		>
			<img src={ logoUrl } width="311" height="42" />
		</Button>
	);
};

const Logo = () => {
	return (
		<div className="wppm-logo-wrap">
			<Mark />
			<Heading level="2" className="screen-reader-text">
				{ __( 'MOJO WordPress Plugin', 'wp-plugin-mojo' ) }
			</Heading>
		</div>
	);
};

export default Logo;
