import graphicUrl from '../../images/section-web-hosting.png';
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
			<img
				src={ graphicUrl }
				className="section-graphic"
				alt={ __( 'Hosting illustration', 'wp-plugin-mojo' ) }
			/>
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
							{ __( 'Manage Hosting', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Manage site backups, performance options and billing.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href={
							`https://www.mojomarketplace.com/my-account/home?` +
							`&utm_campaign=` +
							`&utm_content=home_hosting_sites_link` +
							`&utm_term=manage_sites` +
							`&utm_medium=brand_plugin` +
							`&utm_source=wp-admin/admin.php?page=mojo#/home`
						}
						target="_blank"
						icon="desktop"
					>
						{ __( 'Manage Sites', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							<Dashicon icon="email" />{ ' ' }
							{ __( 'Email', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Create new email addresses and manage your inbox.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href={
							`https://www.mojomarketplace.com/manage-it/email-overview.jsp?` +
							`&utm_campaign=` +
							`&utm_content=home_hosting_email_link` +
							`&utm_term=manage_email` +
							`&utm_medium=brand_plugin` +
							`&utm_source=wp-admin/admin.php?page=mojo#/home`
						}
						target="_blank"
						icon="email"
					>
						{ __( 'Manage Email', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							<Dashicon icon="admin-site" />{ ' ' }
							{ __( 'Domains', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Find fresh domains, point them at sites and get found online.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="secondary"
						href={
							`https://www.mojomarketplace.com/domains?` +
							`&utm_campaign=` +
							`&utm_content=home_hosting_domain_link` +
							`&utm_term=find_domain` +
							`&utm_medium=brand_plugin` +
							`&utm_source=wp-admin/admin.php?page=mojo#/home`
						}
						target="_blank"
						icon="admin-site"
					>
						{ __( 'Find a Domain', 'wp-plugin-mojo' ) }
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
