import './stylesheet.scss';

import Logo from './logo';
import NavLarge from './nav-large';
import NavMobile from './nav-mobile';
import NavUtility from './nav-utility';
import { useViewportMatch } from '@wordpress/compose';

const Header = () => {
	const isLargeViewport = useViewportMatch( 'medium' );
	return (
		<Fragment>
			<header className="wppm-header">
				<div className="wppm-header-inner">
					<Logo />
					{ ( isLargeViewport && <NavUtility /> ) || <NavMobile /> }
				</div>
			</header>
			{ isLargeViewport && (
				<nav className="wppm-nav">
					<NavLarge />
				</nav>
			) }
		</Fragment>
	);
};

export default Header;
