const help = [
	{
		name: 'ticket',
		title: __( 'Email Us', 'wp-plugin-mojo' ),
		description: __(
			"Log in to your Account Manager to submit a support ticket. Once you open a ticket, we'll respond promptly to get it resolved.",
			'wp-plugin-mojo'
		),
		icon: 'email',
		cta: __( 'Email Us', 'wp-plugin-mojo' ),
		url: 'https://www.mojomarketplace.com/help/current-support-requests.jsp',
	},
	{
		name: 'phone',
		title: __( 'Phone', 'wp-plugin-mojo' ),
		description: __(
			'Speak to our award-winning support team over the phone at 866-923-8821. Our customer service hours are 7:00am - 12:00am ET.',
			'wp-plugin-mojo'
		),
		icon: 'phone',
		cta: __( 'Call Us', 'wp-plugin-mojo' ),
		url: 'tel:8669238821',
	},
	{
		name: 'chat',
		title: __( 'Chat', 'wp-plugin-mojo' ),
		description: __(
			'Chat with our sales and support team for quick, helpful answers to questions about product features, pricing and more. Our chat agents are available 24/7.',
			'wp-plugin-mojo'
		),
		icon: 'format-chat',
		cta: __( 'Live Chat', 'wp-plugin-mojo' ),
		url:
			'https://www.mojomarketplace.com/chat?utm_campaign=&utm_content=help_chat_link&utm_term=live_chat&utm_medium=brand_plugin&utm_source=wp-admin/admin.php?page=mojo#/help',
	},
	{
		name: 'twitter',
		title: __( 'Tweet', 'wp-plugin-mojo' ),
		description: __(
			'Find our team at @mojodotcom for updates on our products and support from our team.',
			'wp-plugin-mojo'
		),
		icon: 'twitter',
		cta: __( 'Tweet Us', 'wp-plugin-mojo' ),
		url: 'https://twitter.com/mojodotcom',
	},
	{
		name: 'kb',
		title: __( 'Knowledge Base', 'wp-plugin-mojo' ),
		description: __(
			'Our experts share their experience and well-organized guides to common questions.',
			'wp-plugin-mojo'
		),
		icon: 'book',
		cta: __( 'Find Answers', 'wp-plugin-mojo' ),
		url:
			'https://www.mojomarketplace.com/knowledge?utm_campaign=&utm_content=help_kb_link&utm_term=find_answers&utm_medium=brand_plugin&utm_source=wp-admin/admin.php?page=mojo#/help',
	},
	{
		name: 'blog',
		title: __( 'Blog', 'wp-plugin-mojo' ),
		description: __(
			'Learn best practices, get insider tips and find the latest news about MOJO.',
			'wp-plugin-mojo'
		),
		icon: 'text-page',
		cta: __( 'Learn Stuff', 'wp-plugin-mojo' ),
		url:
			'https://www.mojomarketplace.com/blog/?utm_campaign=&utm_content=help_blog_link&utm_term=learn_stuff&utm_medium=brand_plugin&utm_source=wp-admin/admin.php?page=mojo#/help',
	},
	{
		name: 'video',
		title: __( 'Video Tutorials', 'wp-plugin-mojo' ),
		description: __(
			'Check out our video library of step-by-step tutorials.',
			'wp-plugin-mojo'
		),
		icon: 'format-video',
		cta: __( 'Watch Now', 'wp-plugin-mojo' ),
		url: 'https://www.youtube.com/c/mojodotcom',
	},
];

export default help;
