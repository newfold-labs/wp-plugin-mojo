import { Container, Page } from '@newfold/ui-component-library';
// import HelpCenterSettings from 'App/pages/settings/helpCenterSettings';
// import WonderBlocksSettings from 'App/pages/settings/wonderBlocksSettings';
// import StagingFeatureSettings from 'App/pages/settings/stagingFeatureSettings';
import PerformanceFeatureSettings from 'App/pages/settings/performanceFeatureSettings';

const Admin = () => {
	return (
		<Page title="Admin" className={ 'wppm-app-settings-page' }>
			<Container className={ 'wppm-app-settings-container' }>
				<Container.Header
					title={ __( 'Admin', 'wp-plugin-mojo' ) }
					description={ __(
						'Secret page to manage admin features and settings.',
						'wp-plugin-mojo'
					) }
					className={ 'wppm-app-settings-header' }
				/>

				<Container.Block
					separator={ true }
					id={ 'help-center' }
					className={ 'wppm-app-admin' }
				>
					<Container.SettingsField
						title="Features"
						description="Toggle features – not settings."
					>
						<PerformanceFeatureSettings />
					</Container.SettingsField>
				</Container.Block>
			</Container>
		</Page>
	);
};

export default Admin;