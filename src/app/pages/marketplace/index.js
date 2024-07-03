import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { Container, Page } from '@newfold/ui-component-library';
import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
import { default as NewfoldMarketplace } from '@modules/wp-module-marketplace/components/';

const MarketplacePage = () => {
	
    // constants to pass to module
	const moduleConstants = {
		'supportsCTB': false,
		'text': {
			title: __('Marketplace', 'wp-plugin-mojo'),
			subTitle: __('Explore our featured collection of tools and services.', 'wp-plugin-mojo'),
			error: __('Oops, there was an error loading the marketplace, please try again later.', 'wp-plugin-mojo'),
			noProducts: __('Sorry, no marketplace items. Please, try again later.', 'wp-plugin-mojo'),
			loadMore: __('Load More', 'wp-plugin-mojo'),
			productPage: {
				error: {
					title: __(
						'Oops! Something Went Wrong',
						'wp-plugin-mojo'
					),
					description: __(
						'An error occurred while loading the content. Please try again later.',
						'wp-plugin-mojo'
					),
				},
			},
		}
	};
    // methods to pass to module
    const moduleMethods = {
        apiFetch,
        classNames,
        useState,
        useEffect,
        useLocation,
		useMatch,
		useNavigate,
        NewfoldRuntime,
    };

	const moduleComponents = {
		SectionHeader,
		SectionContent,
	}

	return (
        <Page className={"wppm-app-marketplace-page"}>
			<Container className={'wppm-app-marketplace-container nfd-overflow-clip'}>

				<NewfoldMarketplace 
					methods={moduleMethods}
					constants={moduleConstants}
					Components={moduleComponents}
				/>

			</Container>
		</Page>
	);
};

export default MarketplacePage;