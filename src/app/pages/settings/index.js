import { Container, Page } from "@newfold/ui-component-library";
import AutomaticUpdates from './automaticUpdates';
import ComingSoon from './comingSoon';
import CommentSettings from './commentSettings';
import ContentSettings from './contentSettings';
import useContainerBlockIsTarget from 'App/util/hooks/useContainerBlockTarget';

const Settings = () => {
	return (
		<Page title="Settings" className={"wppm-app-settings-page"}>
			<Container className={'wppm-app-settings-container'}>
				<Container.Header
					title={__('Settings', 'wp-plugin-mojo')}
					description={__('This is where you can manage common settings for your website.', 'wp-plugin-mojo')}
					className={'wppm-app-settings-header'}
				/>

				<Container.Block separator={true} className={
					classNames(
						'wppm-app-settings-coming-soon',
						useContainerBlockIsTarget( 'coming-soon-section' ) && 'nfd-animation-blink'
					)}>
					<ComingSoon />
				</Container.Block>

				<Container.Block separator={true} className={'wppm-app-settings-update'}>
					<AutomaticUpdates />
				</Container.Block>

				<Container.Block separator={true} className={'wppm-app-settings-content'}>
					<ContentSettings />
				</Container.Block>

				<Container.Block className={'wppm-app-settings-comments'}>
					<CommentSettings />
				</Container.Block>

			</Container>
		</Page>
	);
};

export default Settings;
