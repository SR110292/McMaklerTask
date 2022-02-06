
module.exports = {

    verifyURL: () => {
        cy.url().should('include', 'admin-advertisement.herokuapp.com/advertisements');
    },

    getRowCount: () => {
        cy.get('tbody tr').then((el) => {
            let count = el.length;
            cy.wrap(count).as(`count`);
        })
    },

    validateAddedCount: () => {
        cy.get('@count').then(count => {
            cy.get('tbody').find('tr').should(`have.length`, count + 1)
        })
    },

    validateSameCount: () => {
        cy.get('@count').then(count => {
            cy.get('tbody').find('tr').should(`have.length`, count)
        })
    },

    clickRandomRecord: () => {
        cy.get('@count').then(count => {
            let selectedCount = Math.floor(Math.random() * count - 1) + 1;
            cy.wrap(selectedCount).as(`selectedCount`);
            cy.get('tbody').find('tr').eq(selectedCount - 1).click();
            cy.wait(2000);
        })
    },

    clickPlusIcon: () => {
        cy.xpath("//*[text()='add_circle_outline']").click();
    },

    validateContents: (table) => {
        table.hashes().forEach(row => {
            cy.get('@selectedCount').then((selectedCount) => {
                cy.get('tbody').find('tr').eq(selectedCount - 1).find('td').contains(row.adName);
                cy.get('tbody').find('tr').eq(selectedCount - 1).find('td').contains(row.street);
                cy.get('tbody').find('tr').eq(selectedCount - 1).find('td').contains(row.rooms);
                cy.get('tbody').find('tr').eq(selectedCount - 1).find('td').contains(row.price);
                cy.get('tbody').find('tr').eq(selectedCount - 1).find('td').contains(row.activeStatus);
            })
        })
    },

    noUpdateValidation: (table) => {
        table.hashes().forEach(row => {
            cy.get('@selectedCount').then((selectedCount) => {
                cy.get('tbody').find('tr').eq(selectedCount - 1).find('td').should('not.have.text', row.adName);
                cy.get('tbody').find('tr').eq(selectedCount - 1).find('td').should('not.have.text', row.street);
            })
        })
    }
}