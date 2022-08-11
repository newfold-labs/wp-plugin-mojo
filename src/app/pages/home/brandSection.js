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
								'Upgrade to using the official Bluehost plugin and take advantage of integrations with your Bluehost hosting account.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href="wp-admin/plugin-install.php?nfdplugin=bluehost"
						icon="admin-plugins"
					>
						{ __( 'Upgrade', 'wp-plugin-mojo' ) }
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
								'Upgrade to using the official HostGator plugin and take advantage of integrations with your HostGator hosting account.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href="wp-admin/plugin-install.php?nfdplugin=hostgator"
						icon="admin-plugins"
					>
						{ __( 'Upgrade', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
                }
			</Card>
            }
		</section>
	);
};

export default BrandSection;
