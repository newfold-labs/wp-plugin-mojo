import ActionField from "../../components/action-field";
import { Container } from "@newfold/ui-component-library";

const WebHostingSection = () => {
	return (
		<Container.SettingsField
			title={__('Web Hosting', 'wp-plugin-mojo')}
			description={__('Access & manage your mojo account.', 'wp-plugin-mojo')}
		>
			<div className="nfd-flex nfd-flex-col nfd-gap-5">
				<ActionField
					label={__("Manage MOJO Account", "wp-plugin-mojo")}
					buttonLabel={__("Manage MOJO Account", "wp-plugin-mojo")}
					href={
						`https://www.mojomarketplace.com/login?` +
						`&utm_campaign=` +
						`&utm_content=home_hosting_sites_link` +
						`&utm_term=manage_sites` +
						`&utm_medium=brand_plugin` +
						`&utm_source=wp-admin/admin.php?page=mojo#/home`
					}
					target="_blank"
					className={"wppm-app-home-sites-action"}
				>
					{__("Manage MOJO account products, options and billing.", "wp-plugin-mojo")}
				</ActionField>
			</div>
		</Container.SettingsField>
	);
};

export default WebHostingSection;
