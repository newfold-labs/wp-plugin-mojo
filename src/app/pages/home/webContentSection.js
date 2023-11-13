import ActionField from "../../components/action-field";
import { SectionSettings } from "../../components/section";

const WebContentSection = () => {
	return (
		<SectionSettings
			title={__('Website Content', 'wp-plugin-mojo')}
			description={__('Create, manage & sort your story.', 'wp-plugin-mojo')}
		>
			<div className="nfd-flex nfd-flex-col nfd-gap-5">
				<ActionField
					label={__("Blog", "wp-plugin-mojo")}
					buttonLabel={__("New Post", "wp-plugin-mojo")}
					href={window.NewfoldRuntime.admin_url + 'post-new.php'}
					className={"wppm-app-home-blog-action"}
				>
					{__('Write a new blog post.', 'wp-plugin-mojo')}
				</ActionField>

				<ActionField
					label={__("Pages", "wp-plugin-mojo")}
					buttonLabel={__("New Page", "wp-plugin-mojo")}
					href={window.NewfoldRuntime.admin_url + 'post-new.php?post_type=page'}
					className={"wppm-app-home-pages-action"}
				>
					{__('Add fresh pages to your website.', 'wp-plugin-mojo')}
				</ActionField>

				<ActionField
					label={__("Categories", "wp-plugin-mojo")}
					buttonLabel={__("Manage Categories", "wp-plugin-mojo")}
					href={window.NewfoldRuntime.admin_url + 'edit-tags.php?taxonomy=category'}
					className={"wppm-app-home-categories-action"}
				>
					{__('Organize existing content into categories.', 'wp-plugin-mojo')}
				</ActionField>
			</div>
		</SectionSettings >
	);
};

export default WebContentSection;
