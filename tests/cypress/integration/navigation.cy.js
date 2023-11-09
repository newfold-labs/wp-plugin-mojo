// <reference types="Cypress" />

describe('Navigation', function () {

	before(() => {
		cy.visit(`/wp-admin/admin.php?page=${Cypress.env('pluginId')}#`);
		cy.injectAxe();
	});

	it('Logo Links to home', () => {
		cy.get('.wppm-logo-wrap').click();
		cy.wait(500);
		cy.hash().should('eq', '#/home');
	});
	
	it('Admin Subnav properly highlights', () => {
		cy
			.get('#adminmenu #toplevel_page_mojo')
			.should('have.class', 'wp-has-current-submenu');
		cy
			.get('#adminmenu #toplevel_page_mojo ul.wp-submenu li.current a')
			.should('have.attr', 'href')
			.and('match', /home/);
	});

	// test main nav
	it('Main nav links properly navigates', () => {
		cy
			.get('.wppm-app-navitem-Marketplace').
			should('not.have.class', 'active');
		cy.get('.wppm-app-navitem-Marketplace').click();
		cy.wait(500);
		cy.hash().should('eq', '#/marketplace');
		cy
			.get('.wppm-app-navitem-Marketplace')
			.should('have.class', 'active');
		cy
			.get('#adminmenu #toplevel_page_mojo ul.wp-submenu li.current a')
			.should('have.attr', 'href')
			.and('match', /marketplace/);

		cy.get('.wppm-app-navitem-Performance').click();
		cy.wait(500);
		cy.hash().should('eq', '#/performance');
		cy
			.get('.wppm-app-navitem-Performance')
			.should('have.class', 'active');
		cy
			.get('.wppm-app-navitem-Marketplace')
			.should('not.have.class', 'active');
		cy
			.get('#adminmenu #toplevel_page_mojo ul.wp-submenu li.current a')
			.should('have.attr', 'href')
			.and('match', /performance/);

		cy.get('.wppm-app-navitem-Settings').click();
		cy.wait(500);
		cy.hash().should('eq', '#/settings');
		cy
			.get('#adminmenu #toplevel_page_mojo ul.wp-submenu li.current a')
			.should('have.attr', 'href')
			.and('match', /settings/);
	});
	
	it('Subnav links properly navigates', () => {
		cy
			.get('.wppm-app-navitem-Marketplace')
			.scrollIntoView()
			.should('not.have.class', 'active');
		cy.get('.wppm-app-navitem-Marketplace').click();

		cy.wait(500);
		cy.hash().should('eq', '#/marketplace');
		cy
			.get('.wppm-app-navitem-Marketplace')
			.should('have.class', 'active');
		cy
			.get('#adminmenu #toplevel_page_mojo ul.wp-submenu li.current a')
			.should('have.attr', 'href')
			.and('match', /marketplace/);

			cy.get('.wppm-app-subnavitem-Services').click();
			cy.wait(500);
			cy.hash().should('eq', '#/marketplace/services');
			cy
				.get('.wppm-app-subnavitem-Services')
				.should('have.class', 'active');
			cy
				.get('#adminmenu #toplevel_page_mojo ul.wp-submenu li.current a')
				.should('have.attr', 'href')
				.and('match', /marketplace/);
			cy
				.get('.wppm-app-navitem-Marketplace')
				.should('have.class', 'active');
		

		cy.get('.wppm-app-subnavitem-SEO').click();
		cy.wait(500);
		cy.hash().should('eq', '#/marketplace/seo');
		cy
			.get('.wppm-app-subnavitem-SEO')
			.should('have.class', 'active');
		cy
			.get('.wppm-app-subnavitem-Services')
			.should('not.have.class', 'active');
		cy
			.get('#adminmenu #toplevel_page_mojo ul.wp-submenu li.current a')
			.should('have.attr', 'href')
			.and('match', /marketplace/);
		cy
			.get('.wppm-app-navitem-Marketplace')
			.should('have.class', 'active');
			
		cy.get('.wppm-app-navitem-Performance').click();
			cy.wait(500);
		cy
			.get('.wppm-app-subnavitem-Services')
			.should('not.have.class', 'active');
		cy
			.get('.wppm-app-subnavitem-SEO')
			.should('not.have.class', 'active');
		cy
			.get('.wppm-app-navitem-Marketplace')
			.should('not.have.class', 'active');
	});

	// no mobile nav, but should probably add
	it.skip('Mobile nav links dispaly for mobile', () => {
		cy
			.get('.mobile-toggle')
			.should('not.exist');

		cy.viewport('iphone-x');
		cy
			.get('.mobile-toggle')
			.should('be.visible');
	});

	it.skip('Mobile nav links properly navigates', () => {
		cy.get('.mobile-link-Home').should('not.exist');
		cy.viewport('iphone-x');
		cy.get('.mobile-toggle').click();
		cy.wait(500);
		cy.get('.mobile-link-Home').should('be.visible');
		cy.get('button[aria-label="Close"]').should('be.visible')
		cy.get('button[aria-label="Close"]').click();
		cy.get('.mobile-link-Home').should('not.exist');
	});
});
