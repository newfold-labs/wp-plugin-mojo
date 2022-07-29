import graphicUrl from '../../images/section-web-content.png';
import { Heading } from '../../components';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Dashicon,
} from '@wordpress/components';

const WebContentSection = () => {
	return (
		<section className="wppm-section wppm-section-home-content">
			<img
				src={ graphicUrl }
				className="section-graphic"
				alt={ __( 'Website illustration', 'wp-plugin-mojo' ) }
			/>
			<Card size="large" className="wppm-section-card">
				<CardHeader>
					<Heading level="3">
						{ __( 'Website Content', 'wp-plugin-mojo' ) }
					</Heading>
					<p>
						{ __(
							'Create, manage & sort your story.',
							'wp-plugin-mojo'
						) }
					</p>
				</CardHeader>
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							<Dashicon icon="admin-post" />{ ' ' }
							{ __( 'Blog', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Update your site with news as your story unfolds.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href={ WPPM.admin + 'post-new.php' }
						icon="admin-post"
					>
						{ ' ' }
						{ __( 'New Post', 'wp-plugin-mojo' ) }{ ' ' }
					</Button>
				</CardFooter>
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							<Dashicon icon="welcome-add-page" />{ ' ' }
							{ __( 'Pages', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								"Share who you are, what you're about and how to get in touch.",
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href={ WPPM.admin + 'post-new.php?post_type=page' }
						icon="welcome-add-page"
					>
						{ __( 'New Page', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
				<CardFooter>
					<div className="wppm-cardlist-content">
						<Heading level="4">
							<Dashicon icon="category" />{ ' ' }
							{ __( 'Categories', 'wp-plugin-mojo' ) }
						</Heading>
						<p>
							{ __(
								'Sort your story so visitors can focus on their interests.',
								'wp-plugin-mojo'
							) }
						</p>
					</div>
					<Button
						variant="secondary"
						href={ WPPM.admin + 'edit-tags.php?taxonomy=category' }
						icon="category"
					>
						{ __( 'Manage Categories', 'wp-plugin-mojo' ) }
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
};

export default WebContentSection;
