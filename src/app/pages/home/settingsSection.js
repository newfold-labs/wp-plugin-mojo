import ActionField from "../../components/action-field";
import { Container } from "@newfold/ui-component-library";

const SettingsSection = () => {
	return (
		<Container.SettingsField
			title={__('Settings and Performance', 'wp-plugin-mojo')}
			description={__('Customize & fine-tune your site.', 'wp-plugin-mojo')}
		>
			<div className="nfd-flex nfd-flex-col nfd-gap-5">
				<ActionField
					label={__("Manage Settings", "wp-plugin-mojo")}
					buttonLabel={__("Settings", "wp-plugin-mojo")}
					href={window.NewfoldRuntime.linkTracker.addUtmParams("admin.php?page=mojo#/settings")}
					className={"wppm-app-home-settings-action"}
				>
					{__('Manage your site settings. You can ajdust automatic updates, comments, revisions and more.', 'wp-plugin-mojo')}
				</ActionField>

				<ActionField
					label={__("Performance", "wp-plugin-mojo")}
					buttonLabel={__("Performance", "wp-plugin-mojo")}
					href={window.NewfoldRuntime.linkTracker.addUtmParams("admin.php?page=mojo#/performance")}
					className={"wppm-app-home-performance-action"}
				>
					{__('Manage site performance and caching settings as well as clear the site cache.', 'wp-plugin-mojo')}
				</ActionField>

				<ActionField
					label={__("Marketplace", "wp-plugin-mojo")}
					buttonLabel={__("Visit Marketplace", "wp-plugin-mojo")}
					href={window.NewfoldRuntime.linkTracker.addUtmParams("admin.php?page=mojo#/marketplace")}
					className={"wppm-app-home-marketplace-action"}
				>
					{__('Add site services, themes or plugins from the marketplace.', 'wp-plugin-mojo')}
				</ActionField>
			</div>
		</Container.SettingsField >
	);
};

export default SettingsSection;
