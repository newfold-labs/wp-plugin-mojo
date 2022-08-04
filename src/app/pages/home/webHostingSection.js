import { Heading } from '../../components';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Dashicon,
} from '@wordpress/components';

const WebHostingSection = () => {
	return (
		<section className="wppm-section wppm-section-home-hosting">

			<Card size="large" className="wppm-section-card">
				<CardHeader>
					<Heading level="3">
						{ __( 'Web Hosting', 'wp-plugin-mojo' ) }
					</Heading>
					<p>
						{ __(
							'Access & manage your MOJO account.',
							'wp-plugin-mojo'
						) }
					</p>
				</CardHeader>
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							<Dashicon icon="desktop" />{ ' ' }
							{ __( 'Manage MOJO Account', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Manage MOJO account products, options and billing.',
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
						{ __( 'Manage Account', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							<Dashicon icon="sos" />{ ' ' }
							{ __( 'Help', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Find how-to articles in our Knowledge Base and speak with our award-winning support team.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="secondary"
						href="#/help"
						icon="sos"
						className="callout-link-help"
					>
						{ __( 'Get Help', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
};

export default WebHostingSection;
