import { useState } from '@wordpress/element';
import { useUpdateEffect } from 'react-use';
import { Alert, ToggleField } from '@newfold/ui-component-library';
import AppStore from '../../data/store';
import { featureToggle, updateUI } from '../../util/helpers';
import { useNotification } from 'App/components/notifications';

const PerformanceFeatureSettings = () => {
	const { store, setStore } = useContext( AppStore );
	const [ performance, setPerformance ] = useState(
		store.features.performance
	);
	const [ performanceLocked, setPerformanceLocked ] = useState(
		! store.toggleableFeatures.performance
	);
	const [ isError, setError ] = useState( false );
	const notify = useNotification();

	const getPerformanceNoticeTitle = () => {
		return performance
			? __( 'Performance Enabled', 'wp-plugin-mojo' )
			: __( 'Performance Disabled', 'wp-plugin-mojo' );
	};

	const getPerformanceNoticeText = () => {
		return performance
			? __(
					'You need to reload the page to manage Performance.',
					'wp-plugin-mojo'
			  )
			: __( 'Performance will no longer display.', 'wp-plugin-mojo' );
	};

	const togglePerformance = () => {
		featureToggle( 'performance', ( response ) => {
			if ( response.success ) {
				setPerformance( ! performance );
			} else {
				setPerformanceLocked( true );
				setError( true );
				notifyError();
			}
		} );
	};

	const notifySuccess = ( renderTitle, renderDescription ) => {
		notify.push( 'feature-toggle-notice', {
			title: renderTitle(),
			description: renderDescription(),
			variant: 'success',
			autoDismiss: 5000,
		} );
	};

	const notifyError = () => {
		notify.push( 'feature-toggle-notice', {
			title: __( 'Sorry, that is not allowed.', 'wp-plugin-mojo' ),
			description: __(
				'This feature cannot currently be modified.',
				'wp-plugin-mojo'
			),
			variant: 'error',
		} );
	};

	useUpdateEffect( () => {
		setStore( {
			...store,
			performance,
		} );
		notifySuccess( getPerformanceNoticeTitle, getPerformanceNoticeText );
		updateUI( '.wppm-app-navitem-Performance', performance );
	}, [ performance ] );

	return (
		<div className="nfd-flex nfd-flex-col nfd-gap-6">
			<ToggleField
				id="performance-toggle"
				label="Performance"
				description={ __(
					'The performance feature provides improvements to loads faster for visitors including cache settings.',
					'wp-plugin-mojo'
				) }
				disabled={ performanceLocked }
				checked={ performance }
				onChange={ togglePerformance }
			/>

			{ isError && (
				<Alert variant="error">
					{ __(
						'Oops! Something went wrong. Please try again.',
						'wp-plugin-mojo'
					) }
				</Alert>
			) }
		</div>
	);
};

export default PerformanceFeatureSettings;