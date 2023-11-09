
import { Page } from '../../components/page';
import { SectionContainer, SectionHeader, SectionContent } from '../../components/section';
// import BrandSection from './brandSection';
import ComingSoon from '../settings/comingSoon';
import SettingsSection from './settingsSection';
import WebContentSection from './webContentSection';
import WebHostingSection from './webHostingSection';

import { useEffect } from 'react';

const Home = () => {
	return (
	<Page title="Settings" className={"wppm-app-home-page wppm-home"}>
		<SectionContainer className={'wppm-app-home-container'}>
			<SectionHeader
				title={__('Home', 'wp-plugin-mojo')}
				className={'wppm-app-home-header'}
				/>

			{/* <BrandSection /> */}
			<SectionContent separator={true} className={'wppm-app-home-coming-soon'}>
				<ComingSoon />
			</SectionContent>

			<SectionContent separator={true} className={'wppm-app-home-content'}>
				<WebContentSection />
			</SectionContent>

			<SectionContent separator={true} className={'wppm-app-home-settings'}>
				<SettingsSection />
			</SectionContent>

			<SectionContent separator={false} className={'wppm-app-home-hosting'}>
				<WebHostingSection />
			</SectionContent>
		</SectionContainer>
	</Page>
	);
};

export default Home;
