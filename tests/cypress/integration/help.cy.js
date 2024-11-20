// <reference types="Cypress" />

describe('Help Page', { testIsolation: true }, () => {
	const appClass = '.' + Cypress.env( 'appId' );

	beforeEach(() => {
		cy.wpLogin();
		cy.visit( `/wp-admin/admin.php?page=${ Cypress.env( 'pluginId' ) }#/help` );
	});
	
	it('Is Accessible', () => {
		cy.injectAxe();
		cy.wait(500);
		cy.a11y( appClass + '-app-body');
	});

	it('Each Card Exists', () => {
		cy.get('.card-help-phone').contains('h3', 'Phone')
			.scrollIntoView()
			.should('be.visible');
	
		cy.get('.card-help-blog').contains('h3', 'Blog')
			.scrollIntoView()
			.should('be.visible');
	});
	
});
