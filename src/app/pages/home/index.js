import { Page, Container } from "@newfold/ui-component-library";
// import BrandSection from './brandSection';
import ComingSoon from 'App/pages/settings/comingSoon';
import SettingsSection from 'App/pages/home/settingsSection';
import WebContentSection from 'App/pages/home/webContentSection';
import WebHostingSection from 'App/pages/home/webHostingSection';

import { useEffect } from 'react';

const Home = () => {
	return (
	<Page title="Settings" className={"wppm-app-home-page wppm-home"}>
		<Container className={'wppm-app-home-container'}>
			<Container.Header
				title={__('Home', 'wp-plugin-mojo')}
				className={'wppm-app-home-header'}
				/>

			{/* <BrandSection /> */}
			<Container.Block separator={true} className={'wppm-app-home-coming-soon'}>
				<ComingSoon />
			</Container.Block>

			<Container.Block separator={true} className={'wppm-app-home-content'}>
				<WebContentSection />
			</Container.Block>

			<Container.Block separator={true} className={'wppm-app-home-settings'}>
				<SettingsSection />
			</Container.Block>

			<Container.Block separator={false} className={'wppm-app-home-hosting'}>
				<WebHostingSection />
			</Container.Block>
		</Container>
	</Page>
	);
};

export default Home;
