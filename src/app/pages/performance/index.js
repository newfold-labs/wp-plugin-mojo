import AppStore from '../../data/store';
import { Page } from '../../components/page';
import { useState, useEffect, useContext, Fragment } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import classnames from 'classnames';
import { useUpdateEffect } from 'react-use';
import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
import { SectionContainer, SectionHeader, SectionContent, SectionSettings } from '../../components/section';
import { useNotification } from '../../components/notifications/feed';
import { 
    mojoSettingsApiFetch as newfoldSettingsApiFetch, 
    mojoPurgeCacheApiFetch as newfoldPurgeCacheApiFetch
} from '../../util/helpers';

import { default as NewfoldPerformance } from '../../../../vendor/newfold-labs/wp-module-performance/components/performance/';

const PerformancePage = () => {

    // constants to pass to module
    const moduleConstants = {};

    // methods to pass to module
    const moduleMethods = {
        apiFetch,
        classnames,
        useState,
        useEffect,
        useContext,
        NewfoldRuntime,
        useNotification,
        newfoldSettingsApiFetch,
        newfoldPurgeCacheApiFetch,
        useUpdateEffect,
        AppStore,
    };

	const moduleComponents = {
		Page,
        SectionHeader,
		SectionContent,
        SectionSettings,
        SectionContainer,
        Fragment,
	}

	return (
		<Page title="Performance" className={"wppm-app-settings-page"}>
			<SectionContainer className={'wppm-app-settings-container'}>
                <SectionHeader
                    title={__('Performance', 'wp-plugin-mojo')}
                    subTitle={__('This is where you can manage cache settings for your website.', 'wp-plugin-mojo')}
                    className={'wppm-app-settings-header'}
                />
                <NewfoldPerformance
                    constants={moduleConstants}
                    methods={moduleMethods}
                    Components={moduleComponents}
                />
            </SectionContainer>
		</Page>
	);
};

export default PerformancePage;
