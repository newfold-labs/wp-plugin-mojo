import AppStore from '../../data/store';
import {
	mojoSettingsApiFetch,
	comingSoonAdminbarToggle,
} from '../../util/helpers';
import { useState } from '@wordpress/element';
import { useUpdateEffect } from 'react-use';
import { Alert, Container, ToggleField } from "@newfold/ui-component-library";
import { useNotification } from 'App/components/notifications';

const ComingSoon = () => {
	const { store, setStore } = useContext(AppStore);
	const [comingSoon, setComingSoon] = useState(store.comingSoon);
	const [isError, setError] = useState(false);

	let notify = useNotification();

	const getComingSoonNoticeTitle = () => {
		return comingSoon
			? __('Coming soon activated', 'wp-plugin-mojo')
			: __('Coming soon deactivated', 'wp-plugin-mojo');
	};

	const getComingSoonNoticeText = () => {
		return comingSoon
			? __(
				'Coming soon page is active. Site requires login.',
				'wp-plugin-mojo'
			)
			: __(
				'Coming soon page is not active. Site is live to visitors.',
				'wp-plugin-mojo'
			);
	};
	
	const getComingSoonSectionTitle = () => {
		const getStatus = () => {
			return comingSoon ? (
				<span className="nfd-text-[#e10001] coming-soon-status">
					{ __( 'Not Live', 'wp-plugin-mojo' ) }
				</span>
			) : (
				<span className="nfd-text-[#008112] coming-soon-status">
					{ __( 'Live', 'wp-plugin-mojo' ) }
				</span>
			);
		};

		return (
			<span>
				{ __('Site Status', 'wp-plugin-mojo')}: {getStatus() }
			</span>
		)
	};

	const toggleComingSoon = () => {
		mojoSettingsApiFetch({ comingSoon: !comingSoon }, setError, (response) => {
			setComingSoon(!comingSoon);
		});
	};

	const getComingSoonSectionDescription = () => {
		return comingSoon
			? __(
					'Turn off your "Coming Soon" page when you are ready to launch your website.',
					'wp-plugin-mojo'
			  )
			: __(
					'Turn on your "Coming Soon" page when you need to make major changes to your website.',
					'wp-plugin-mojo'
			  );
	};

	const notifySuccess = () => {
		notify.push("coming-soon-toggle-notice", {
			title: getComingSoonNoticeTitle(),
			description: (
				<span>
					{getComingSoonNoticeText()}
				</span>
			),
			variant: "success",
			autoDismiss: 5000,
		});
	};

	useUpdateEffect( () => {
		setComingSoon( store.comingSoon );
	}, [ store.comingSoon ] );

	useUpdateEffect(() => {
		setStore({
			...store,
			comingSoon,
		});

		notifySuccess();
		comingSoonAdminbarToggle(comingSoon);
	}, [comingSoon]);

	return (
		<Container.SettingsField
			title={ getComingSoonSectionTitle() }
			description={ getComingSoonSectionDescription() }
		>
			<div className="nfd-flex nfd-flex-col nfd-gap-6">
				<ToggleField
					id="coming-soon-toggle"
					label={__('Coming soon page', 'wp-plugin-mojo')}
					description={__(
						'Your Coming Soon page lets you hide your site from visitors while you make the magic happen.',
						'wp-plugin-mojo'
					)}
					checked={comingSoon}
					onChange={() => {
						toggleComingSoon();
					}}
				/>

				{comingSoon &&
					<Alert variant="info">
						{__('Your website is currently displaying a "Coming Soon" page.', 'wp-plugin-mojo')}
					</Alert>
				}

				{isError &&
					<Alert variant="error">
						{__('Oops! Something went wrong. Please try again.', 'wp-plugin-mojo')}
					</Alert>
				}
			</div>
		</Container.SettingsField>
	);
}

export default ComingSoon;