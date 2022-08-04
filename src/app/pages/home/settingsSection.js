import { Heading } from '../../components';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Dashicon,
} from '@wordpress/components';
import { Icon, settings, store } from '@wordpress/icons';

const SettingsSection = () => {
	return (
		<section className="wppm-section wppm-section-home-settings">
			<Card size="large" className="wppm-section-card">
				<CardHeader>
					<Heading level="3">
						{ __( 'Settings and Performance', 'wp-plugin-mojo' ) }
					</Heading>
					<p>
						{ __(
							'Customize & fine-tune your site.',
							'wp-plugin-mojo'
						) }
					</p>
				</CardHeader>
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							<Icon icon={ settings } />{ ' ' }
							{ __( 'Manage Settings', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Adjust auto-updates, comments, backed-up revisions & more.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href="#/settings"
						icon={ settings }
						className="callout-link-settings"
					>
						{ __( 'Settings', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							<Dashicon icon="performance" />{ ' ' }
							{ __( 'Performance', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Strike the balance between fresh updates and fastest delivery.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href="#/performance"
						icon={ <Dashicon icon="performance" /> }
						className="callout-link-performance"
					>
						{ __( 'Performance', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							<Icon icon={ store } />{ ' ' }
							{ __( 'Marketplace', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Add site services, themes or plugins from our marketplace.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href="#/marketplace"
						icon={ store }
						className="callout-link-marketplace"
					>
						{ __( 'Visit Marketplace', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
};

export default SettingsSection;
