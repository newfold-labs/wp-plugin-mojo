import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { Page } from "../../components/page";
import { SectionContainer, SectionHeader, SectionContent } from "../../components/section";
import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
// component sourced from marketplace module
import { default as NewfoldMarketplace } from '../../../../vendor/newfold-labs/wp-module-marketplace/components/marketplace/';

const MarketplacePage = () => {
	
    // constants to pass to module
	const moduleConstants = {
		'supportsCTB': false,
		'text': {
			'title': __('Marketplace', 'wp-plugin-mojo'),
			'subTitle': __('Explore our featured collection of tools and services.', 'wp-plugin-mojo'),
			'error': __('Oops, there was an error loading the marketplace, please try again later.', 'wp-plugin-mojo'),
			'noProducts': __('Sorry, no marketplace items. Please, try again later.', 'wp-plugin-mojo'),
			'loadMore': __('Load More', 'wp-plugin-mojo'),
		}
	};
    // methods to pass to module
    const moduleMethods = {
        apiFetch,
        classnames,
        useState,
        useEffect,
        useLocation,
        NewfoldRuntime,
    };

	const moduleComponents = {
		SectionHeader,
		SectionContent,
	}

	return (
        <Page className={"wppm-app-marketplace-page"}>
			<SectionContainer className={'wppm-app-marketplace-container'}>

				<NewfoldMarketplace 
					methods={moduleMethods}
					constants={moduleConstants}
					Components={moduleComponents}
				/>

			</SectionContainer>
		</Page>
	);
};

export default MarketplacePage;