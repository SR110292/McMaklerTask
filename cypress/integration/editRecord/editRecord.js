import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
const frontPage = require('../../functionalLibs/frontPage');
const detailPage = require('../../functionalLibs/detailPage');

let recordID = {};
let API_URL = 'https://admin-advertisement.herokuapp.com/api/advertisements/';
let newName = {};

Given('User opens the URL', () => {
    cy.visit('/');
})

And('User gets the total number of records in the table', () => {
    frontPage.getRowCount();
})

When('User clicks on the random record', () => {
    frontPage.clickRandomRecord();
})

And('User sees the detail page', () => {
    detailPage.validatePageTitle();
})

And('User enters the values in the fields', (table) => {
    table.hashes().forEach(row => {
        newName = row.name;
        detailPage.enterName(row.name);
        detailPage.enterStreet(row.street);
        detailPage.enterRooms(row.rooms);
        detailPage.enterPrice(row.price);
        detailPage.selectStatus(row.activeStatus);
    })
})

And('User clears the values in the mandatory fields', () => {
    detailPage.clearName();
    detailPage.clearPrice();
    detailPage.selectStatus("false")
})

And('User clicks on Save button', () => {
    detailPage.clickSaveButton();
})

And('User clicks on Cancel button', () => {
    detailPage.clickCancelButton();
})

Then('User should see the values in the front page on the same record', (table) => {
    frontPage.validateContents(table);
})

Then('User sees the Save button as disabled', () => {
    detailPage.verifySaveButton();
})

And('User sees the error message {string}', (msg) => {
    detailPage.verifyErrorMsg(msg);
})

When('User clicks on OK button in the confirmation popup', () => {
    detailPage.clickOKButtonInConfirmation();
})

And('User should see the front page', () => {
    frontPage.verifyURL();
})

But('User should not see the new values in the record', (table) => {
    frontPage.noUpdateValidation(table);
})

When('User clicks on the random record to get a recordID for the API request', () => {
    frontPage.clickRandomRecord();
    cy.url().then(fullText => {
        let partialTxt = fullText.replace('https://admin-advertisement.herokuapp.com/advertisement/', '');
        recordID = partialTxt.replace('/edit', '');
    })
    cy.visit('/');
})

And('User sends the payload in the API PUT call and validates the response', (table) => {
    table.hashes().forEach(row => {
        newName = row.name;
        cy.request({
            method: 'PUT',
            url: API_URL + recordID,
            body: {
                "name": row.name,
                "street": row.street,
                "rooms": row.rooms,
                "price": row.price,
                "status": row.activeStatus
            },
        }).then((res) => {
            expect(res.status).to.eq(parseInt(row.expectedResponseCode));
        })
    });

})

Then('User sends the GET call and verifies the values modified in that record', () => {
    cy.get('@selectedCount').then((selectedCount) => {
        cy.request({
            method: 'GET',
            url: API_URL
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body[selectedCount - 1].name).to.eq(newName);
        })
        cy.visit('/');
    })

})

Then('User sends the GET call and verifies the values not modified in that record', () => {
    cy.get('@selectedCount').then((selectedCount) => {
        cy.request({
            method: 'GET',
            url: API_URL
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body[selectedCount - 1].name).to.not.eq(newName);
        })
        cy.visit('/');
    })
})
