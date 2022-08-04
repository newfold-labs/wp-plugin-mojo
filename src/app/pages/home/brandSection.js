import { Heading } from '../../components';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Dashicon,
} from '@wordpress/components';

const BrandSection = () => {
    // Let's provide a path for users to upgrade to the appropriate brand plugin

	return (
        <section className="wppm-section wppm-section-home-hosting">
            { ( window.WPPM.brand === 'bluehost' || window.WPPM.brand === 'hostgator' ) && 
			<Card size="large" className="wppm-section-card">
				<CardHeader>
					<Heading level="3">
						{ __( 'Upgrade Available', 'wp-plugin-mojo' ) }
					</Heading>
					<p>
						{ __(
							'Get the latest features.',
							'wp-plugin-mojo'
						) }
					</p>
				</CardHeader>
                { ( window.WPPM.brand === 'bluehost' ) && 
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							{ __( 'Bluehost Plugin', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Upgrade to using the official Bluehost plugin to take advantage of integrations your Bluehost hosting account.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href={
							`https://www.mojomarketplace.com/login?` +
							`&utm_campaign=` +
							`&utm_content=home_hosting_sites_link` +
							`&utm_term=manage_sites` +
							`&utm_medium=brand_plugin` +
							`&utm_source=wp-admin/admin.php?page=mojo#/home`
						}
						target="_blank"
						icon="desktop"
					>
						{ __( 'Install Bluehost Plugin', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
                }
                { ( window.WPPM.brand === 'hostgator' ) && 
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							{ __( 'HostGator Plugin', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Upgrade to using the official HostGator plugin to take advantage of integrations your HostGator hosting account.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href={
							`https://www.mojomarketplace.com/login?` +
							`&utm_campaign=` +
							`&utm_content=home_hosting_sites_link` +
							`&utm_term=manage_sites` +
							`&utm_medium=brand_plugin` +
							`&utm_source=wp-admin/admin.php?page=mojo#/home`
						}
						target="_blank"
						icon="desktop"
					>
						{ __( 'Install HostGator Plugin', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
                }
			</Card>
            }
		</section>
	);
};

export default BrandSection;
