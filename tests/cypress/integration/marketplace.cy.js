// <reference types="Cypress" />

describe('Marketplace Page', function () {

	before(() => {
		cy.intercept({
			method: 'GET',
			url: /newfold-marketplace(\/|%2F)v1(\/|%2F)marketplace/
		}, {
			fixture: 'products'
		}).as('products');
		cy.visit('/wp-admin/admin.php?page=mojo#/marketplace');
		cy.wait('@products')
	});
	
	it('Exists', () => {
		cy.contains('button', 'Featured');
	});
	
	it('Is Accessible', () => {
		cy.injectAxe();
		cy.wait(1000);
		cy.a11y('.wppm-app-body');
	});

	it('Product grid has 2 items', () => {
		cy.get('.marketplace-item').should('have.length', 2);
	});

	it('First product card renders correctly', () => {
		cy.get('#marketplace-item-a1ff70f1-9670-4e25-a0e1-a068d3e43a45').as('card');

		cy.get('@card')
			.findByRole('link', {name: 'Learn More'})
			.scrollIntoView()
			.should('be.visible')
			.should('have.attr', 'href')
			.and('include', 'https://yoast.com/wordpress/plugins/seo/');

		cy.get('@card').first().within(() => {
			cy.get('.components-card__header')
				.contains('Yoast Premium')
				.should('be.visible');
			cy.get('.components-card__media').should('be.visible');
			cy.get('.components-card__header .price')
				.contains('$99.00')
				.should('be.visible');
		});
	});

	it('Second product card render correctly', () => {
		cy.get('#marketplace-item-2a1dadb5-f58d-4ae4-a26b-27efb09136eb').as('card');

		cy.get('@card')
			.findByRole('link', {name: 'Buy Now'})
			.scrollIntoView()
			.should('be.visible')
			.should('have.attr', 'href')
			.and('include', 'https://www.mojomarketplace.com/cart?item_id=5377b431-d8a8-431b-a711-50c10a141528');

		cy.get('@card').first().within(() => {
			cy.get('.components-card__header')
				.contains('Highend')
				.should('be.visible');
			cy.get('.components-card__media').should('be.visible');
			cy.get('.components-card__header .price')
				.contains('$59.00')
				.should('be.visible');
		});
	});
	
	it('CTA links have target=_blank', () => {
		cy.get('#marketplace-item-a1ff70f1-9670-4e25-a0e1-a068d3e43a45').as('card');

		cy.get('@card')
			.findByRole('link', {name: 'Learn More'})
			.scrollIntoView()
			.should('have.attr', 'target')
			.and('include', '_blank');
	});

	it('Category Tab Filters properly', () => {
		
		cy.get('.newfold-marketplace-tab-services').click();
		cy.get('.marketplace-item').should('have.length', 10);
		cy.get('#marketplace-item-521e79e6-cc93-46eb-842b-472da626e683 h2')
			.scrollIntoView()
			.should('be.visible')
			.should('have.text', 'WP Live');
		
		cy.get('.newfold-marketplace-tab-seo').click();
		cy.get('.marketplace-item').should('have.length', 5);
		cy.get('#marketplace-item-a1ff70f1-9670-4e25-a0e1-a068d3e43a45 h2')
			.scrollIntoView()
			.should('be.visible')
			.should('have.text', 'Yoast Premium');
	});

	it('Category tabs update path', () => {
		cy.get('.newfold-marketplace-tab-services').click();
		cy.location().should((loc) => {
			expect(loc.hash).to.eq('#/marketplace/services')
		});
	});

	it.skip('Load more button loads more products', () => {

		cy.get('.newfold-marketplace-tab-services').click();
		cy.wait(300);

		cy.get('.marketplace-item').should('have.length', 12);
		cy.contains('button', 'Load More');
		cy.get('.marketplace-list button')
			.scrollIntoView()
			.click();
		cy.wait(300);

		cy.get('.marketplace-item').should('have.length', 23);
	});

	// CTB Not supported yet
	it.skip('Product CTB cards render correctly', () => {
		cy.get('.marketplace-item-ec14a614-8672-4094-8310-cb0b1eb0f176').as('card');

		cy.get('@card')
			.findByRole('button', {name: 'Buy Now'})
			.scrollIntoView()
			.should('be.visible')
			.should('have.attr', 'data-action')
			.and('include', 'load-nfd-ctb');

		cy.get('@card').first().within(() => {
			cy.get('.components-card__header').should('be.visible');
			cy.get('.components-card__media').should('be.visible');
		});
	});

});
