import './stylesheet.scss';
import ComingSoonSection from './comingSoonSection';
import WebContentSection from './mojoContentSection';
import WebHostingSection from './webHostingSection';
import SettingsSection from './settingsSection';
import { useEffect } from 'react';

const Home = () => {
	return (
		<div className="wppm-home">
			<ComingSoonSection />
			<WebContentSection />
			<SettingsSection />
			<WebHostingSection />
		</div>
	);
};

export default Home;
