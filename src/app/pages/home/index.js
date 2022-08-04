import './stylesheet.scss';
import BrandSection from './brandSection';
import ComingSoonSection from './comingSoonSection';
import WebContentSection from './webContentSection';
import WebHostingSection from './webHostingSection';
import SettingsSection from './settingsSection';
import { useEffect } from 'react';

const Home = () => {
	return (
		<div className="wppm-home">
			<BrandSection />
			<ComingSoonSection />
			<WebContentSection />
			<SettingsSection />
			<WebHostingSection />
		</div>
	);
};

export default Home;
