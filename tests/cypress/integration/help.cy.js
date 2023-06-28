// <reference types="Cypress" />

describe('Help Page', () => {

	before(() => {
		cy.visit('/wp-admin/admin.php?page=mojo#/help');
	});
	
	it('Is Accessible', () => {
		cy.injectAxe();
		cy.wait(500);
		cy.a11y('.wppm-app-body');
	});

	it('Phone Card Exists', () => {
		cy.get('.card-help-phone').contains('h3', 'Phone')
			.scrollIntoView()
			.should('be.visible');
	});

	it('Blog Card Exists', () => {
		cy.get('.card-help-blog').contains('h3', 'Blog')
			.scrollIntoView()
			.should('be.visible');
	});
	
});
