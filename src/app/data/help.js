const help = [
	{
		name: 'ticket',
		title: __( 'Support Center', 'wp-plugin-mojo' ),
		description: __(
			"Submit a support ticket. Once you open a ticket, we'll respond promptly to get it resolved.",
			'wp-plugin-mojo'
		),
		icon: 'email',
		cta: __( 'Submit a Request', 'wp-plugin-mojo' ),
		url: 'https://mojosupport.zendesk.com/hc/en-us/requests/new?ticket_form_id=66029',
	},
	{
		name: 'phone',
		title: __( 'Phone', 'wp-plugin-mojo' ),
		description: __(
			'Speak to our support team over the phone at 855-464-5345.',
			'wp-plugin-mojo'
		),
		icon: 'phone',
		cta: __( 'Call Us', 'wp-plugin-mojo' ),
		url: 'tel:855-464-5345',
	},
	{
		name: 'blog',
		title: __( 'Blog', 'wp-plugin-mojo' ),
		description: __(
			'Follow along and take your website to its full potential with WordPress guides and how tos, inspiration, MOJO Marketplace product updates, and more!',
			'wp-plugin-mojo'
		),
		icon: 'text-page',
		cta: __( 'Learn Stuff', 'wp-plugin-mojo' ),
		url:
			'https://blog.mojomarketplace.com/?utm_campaign=&utm_content=help_blog_link&utm_term=learn_stuff&utm_medium=brand_plugin&utm_source=wp-admin/admin.php?page=mojo#/help',
	},
	{
		name: 'support',
		title: __( 'WP Live Support', 'wp-plugin-mojo' ),
		description: __(
			'Our WordPress experts will treat your problem like theirs and teach you how to build, grow, and maintain your websites. Starting at $29/month',
			'wp-plugin-mojo'
		),
		icon: 'format-chat',
		cta: __( 'Sign Up', 'wp-plugin-mojo' ),
		url:
			'https://www.mojomarketplace.com/item/wordpress-support?utm_campaign=&utm_content=help_blog_link&utm_term=learn_stuff&utm_medium=brand_plugin&utm_source=wp-admin/admin.php?page=mojo#/help',
	},
];

export default help;
