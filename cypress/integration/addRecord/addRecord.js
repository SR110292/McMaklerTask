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

When('User clicks on the plus icon', () => {
    frontPage.clickPlusIcon();

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

And('User should see a new record added in the front page', () => {
    frontPage.validateAddedCount();
})

And('User should not see a new record added in the front page', () => {
    frontPage.validateSameCount();
})

And('User sends the payload in the API POST call and validates the response', (table) => {
    table.hashes().forEach(row => {
        newName = row.name;
        cy.request({
            method: 'POST',
            url: API_URL,
            body: {
                "name": row.name,
                "street": row.street,
                "rooms": row.rooms,
                "price": row.price,
                "status": row.activeStatus
            },
        }).then((res) => {
            expect(res.status).to.eq(parseInt(row.expectedResponseCode));
            expect(res.body.name).to.eq(row.name);
            expect(res.body.street).to.eq(row.street);
            expect(res.body.rooms).to.eq(row.rooms);
            expect(res.body.price).to.eq(row.price);
            expect(res.body.status).to.eq(row.activeStatus);
            cy.visit('/');
        })
    });

})


