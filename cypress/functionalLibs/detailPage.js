module.exports = {
    validatePageTitle: () => {
        cy.get('div.md-subhead').contains('Advertisement');
    },

    enterName: (text) => {
        cy.get('input[name="name"]').clear().type(text);
    },

    clearName: () => {
        cy.get('input[name="name"]').clear();
    },

    enterStreet: (text) => {
        cy.get('input[name="street"]').clear().type(text);
    },

    enterRooms: (text) => {
        cy.get('input[name="rooms"]').clear().type(text);
    },

    enterPrice: (text) => {
        cy.get('input[name="price"]').clear().type(text);
    },

    clearPrice: () => {
        cy.get('input[name="price"]').clear();
    },

    selectStatus: (text) => {
        cy.get('[name="$ctrl.advertisementForm"]').then((body) => {
            if (body.find('[aria-checked="false"]').length && text == "true") {
                cy.get('[type="checkbox"]').click({ force: true });
            } else if (body.find('[aria-checked="true"]').length && text == "false") {
                cy.get('[type="checkbox"]').click({ force: true });
            }
        })
    },

    clickSaveButton: () => {
        cy.contains('save').click();
    },

    clickCancelButton: () => {
        cy.contains('cancel').click();
    },

    verifySaveButton: () => {
        cy.contains('save').should('be.disabled');
    },

    verifyErrorMsg: (msg) => {
        cy.xpath('//div[@role="alert"]').should('contain', msg);
    },

    clickOKButtonInConfirmation: () => {
        cy.contains('ok').click();
    }
}