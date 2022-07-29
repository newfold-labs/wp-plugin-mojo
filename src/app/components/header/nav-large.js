import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { topRoutes } from '../../data/routes';

const NavLarge = () => (
	<ul className="wppm-nav-large">
		{ topRoutes.map( ( page ) => (
			<li key={ page.name } className="wppm-nav-large__item">
				<div className="wppm-nav-large__inner">
					<NavLink
						to={ page.name }
						className={ classNames(
							`wppm-nav-large__link`,
							`link-${ page.title }`
						) }
					>
						{ page.title }
					</NavLink>
				</div>
			</li>
		) ) }
	</ul>
);

export default NavLarge;
