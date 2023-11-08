import AppStore from '../../data/store';
import {
	mojoSettingsApiFetch,
	comingSoonAdminbarToggle,
} from '../../util/helpers';
import { useState } from '@wordpress/element';
import { useUpdateEffect } from 'react-use';
import { Alert, ToggleField } from "@newfold/ui-component-library";
import { SectionSettings } from "../../components/section";
import { useNotification } from '../../components/notifications/feed';

const ComingSoon = () => {
	const { store, setStore } = useContext( AppStore );
	const [ comingSoon, setComingSoon ] = useState( store.comingSoon );
	const [ isError, setError ] = useState( false );
	
	let notify = useNotification();

	const getComingSoonNoticeTitle = () => {
		return comingSoon
			? __( 'Coming soon activated.', 'wp-plugin-mojo' )
			: __( 'Coming soon deactivated.', 'wp-plugin-mojo' );
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

	const toggleComingSoon = () => {
		mojoSettingsApiFetch({ comingSoon: !comingSoon }, setError, (response) => {
			setComingSoon(!comingSoon);
		});
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
		setStore({
			...store,
			comingSoon,
		});

		notifySuccess();
		comingSoonAdminbarToggle(comingSoon);
	}, [ comingSoon ] );

	return (
		<SectionSettings
			title={__('Maintenance Mode', 'wp-plugin-mojo')}
			description={__('Still building your site? Need to make a big change?', 'wp-plugin-mojo')}
		>
			<div className="nfd-flex nfd-flex-col nfd-gap-6">
				<ToggleField
					id="coming-soon-toggle"
					label="Coming soon page"
					description={__(
						'Your MOJO Coming Soon page lets you hide your site from visitors while you make the magic happen.',
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
		</SectionSettings>
	);
};

export default ComingSoon;
