Feature: Adding a new record

    Feature Description This feature is required to add a new record.
    Background:
        Given User opens the URL
        And User gets the total number of records in the table

    Scenario: UI - Adding a new record by entering valid values in all the fields
        When User clicks on the plus icon
        And User sees the detail page
        And User enters the values in the fields
            | name       | street    | rooms | price | activeStatus |
            | newRecords | newStreet | 11    | 7     | true         |
        And User clicks on Save button
        And User should see the front page
        Then User should see a new record added in the front page


    Scenario: UI - Adding a new record by entering invalid value in name field
        When User clicks on the plus icon
        And User sees the detail page
        And User enters the values in the fields
            | name | street  | rooms | price | activeStatus |
            | ;;;; | Street2 | 3     | 5     | false        |
        Then User sees the Save button as disabled
        And User sees the error message "Alphabets and numerals only"

    Scenario: UI - Adding a new record by entering negative value in rooms field
        When User clicks on the plus icon
        And User sees the detail page
        And User enters the values in the fields
            | name    | street    | rooms | price | activeStatus |
            | addroom | addStreet | -9    | 5     | true         |
        Then User sees the Save button as disabled

    Scenario: UI - Adding a new record by entering invalid value in price field
        When User clicks on the plus icon
        And User sees the detail page
        And User enters the values in the fields
            | name     | street    | rooms | price        | activeStatus |
            | addprice | addStreet | 9     | pricetesting | true         |
        Then User sees the Save button as disabled
        And User sees the error message "Invalid price(Valid currency in euros: 12,12)"

    Scenario: UI - Saving a new record without adding the mandatory fields
        When User clicks on the plus icon
        And User sees the detail page
        And User enters the values in the fields
            | name            | street    | rooms | price | activeStatus |
            | mandatoryfields | addStreet | 9     | 12    | false        |
        And User clears the values in the mandatory fields
        Then User sees the Save button as disabled
        And User sees the error message "This is required"

    Scenario: UI - Cancelling the entered values
        When User clicks on the plus icon
        And User sees the detail page
        And User enters the values in the fields
            | name          | street          | rooms | price | activeStatus |
            | AddCancelTest | AddcancelStreet | 99    | 321   | true         |
        And User clicks on Cancel button
        When User clicks on OK button in the confirmation popup
        Then User should see the front page
        And User should not see a new record added in the front page

    Scenario: API - Adding a new record by entering valid values in all the fields
        When User sends the payload in the API POST call and validates the response
            | name           | street      | rooms | price | activeStatus | expectedResponseCode |
            | PostRandomName | AddStreetAP | 7     | 3     | true         | 200                  |
        Then User should see a new record added in the front page

    Scenario: API - Adding a new record by entering invalid values in each field
        When User sends the payload in the API POST call and validates the response
            | name | street  | rooms    | price | activeStatus | expectedResponseCode |
            | ;;;; | Street3 | asdfasdf | -5    | yes          | 500                  |
        Then User should not see a new record added in the front page

    Scenario: API - Adding a new record by entering empty values in mandatory fields
        When User sends the payload in the API POST call and validates the response
            | name | street | rooms | price | activeStatus | expectedResponseCode |
            |      |        |       |       |              | 500                  |
        Then User should not see a new record added in the front page
