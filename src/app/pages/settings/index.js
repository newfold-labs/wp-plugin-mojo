import AutomaticUpdates from './automaticUpdates';
import ComingSoon from './comingSoon';
import CommentSettings from './commentSettings';
import ContentSettings from './contentSettings';
import { Page } from '../../components/page';
import { SectionContainer, SectionHeader, SectionContent } from '../../components/section';

const Settings = () => {
	return (
		<Page title="Settings" className={"wppm-app-settings-page"}>
			<SectionContainer className={'wppm-app-settings-container'}>
				<SectionHeader
					title={__('Settings', 'wp-plugin-mojo')}
					subTitle={__('This is where you can manage common settings for your website.', 'wp-plugin-mojo')}
					className={'wppm-app-settings-header'}
				/>

				<SectionContent separator={true} className={'wppm-app-settings-coming-soon'}>
					<ComingSoon />
				</SectionContent>

				<SectionContent separator={true} className={'wppm-app-settings-update'}>
					<AutomaticUpdates />
				</SectionContent>

				<SectionContent separator={true} className={'wppm-app-settings-content'}>
					<ContentSettings />
				</SectionContent>

				<SectionContent className={'wppm-app-settings-comments'}>
					<CommentSettings />
				</SectionContent>

			</SectionContainer>
		</Page>
	);
};

export default Settings;
