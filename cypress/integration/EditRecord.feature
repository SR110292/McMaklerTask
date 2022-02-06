Feature: Editing the existing record

    Feature Description This feature is required to edit the existing record.
    Background:
        Given User opens the URL
        And User gets the total number of records in the table

    Scenario: UI - Editing the existing record by entering valid values in all the fields
        When User clicks on the random record
        And User sees the detail page
        And User enters the values in the fields
            | name   | street  | rooms | price | activeStatus |
            | UITest | Street3 | 2     | 5     | true         |
        And User clicks on Save button
        Then User should see the values in the front page on the same record
            | adName | street  | rooms | price  | activeStatus |
            | UITest | Street3 | 2     | 5,00 € | Active       |

    Scenario: UI - Editing the existing record by entering invalid value in name field
        When User clicks on the random record
        And User sees the detail page
        And User enters the values in the fields
            | name | street  | rooms | price | activeStatus |
            | ;;;; | Street2 | 3     | 5     | true         |
        Then User sees the Save button as disabled
        And User sees the error message "Alphabets and numerals only"

    Scenario: UI - Editing the existing record by entering negative value in rooms field
        When User clicks on the random record
        And User sees the detail page
        And User enters the values in the fields
            | name           | street  | rooms | price | activeStatus |
            | roomValidation | Street3 | -3    | 5     | true         |
        Then User sees the Save button as disabled

    Scenario: UI - Editing the existing record by entering empty values in mandatory fields
        When User clicks on the random record
        And User sees the detail page
        And User clears the values in the mandatory fields
        Then User sees the Save button as disabled
        And User sees the error message "This is required"

    Scenario: UI - Cancelling the entered values
        When User clicks on the random record
        And User sees the detail page
        And User enters the values in the fields
            | name       | street       | rooms | price | activeStatus |
            | CancelTest | cancelStreet | 11    | 123   | true         |
        And User clicks on Cancel button
        When User clicks on OK button in the confirmation popup
        Then User should see the front page
        But User should not see the new values in the record
            | adName     | street       |
            | CancelTest | cancelStreet |

    Scenario: API - Editing the existing record by entering valid values in all the fields
        When User clicks on the random record to get a recordID for the API request
        And User sends the payload in the API PUT call and validates the response
            | name       | street  | rooms | price | activeStatus | expectedResponseCode |
            | RandomName | Street3 | 2     | 5     | true         | 200                  |
        Then User sends the GET call and verifies the values modified in that record

    Scenario: API - Editing the existing record by entering invalid values in each field
        When User clicks on the random record to get a recordID for the API request
        And User sends the payload in the API PUT call and validates the response
            | name | street  | rooms    | price | activeStatus | expectedResponseCode |
            | ;;;; | Street3 | asdfasdf | -5    | yes          | 500                  |
        Then User sends the GET call and verifies the name not modified in that record

    Scenario: API - Editing the existing record by entering empty values in mandatory fields
        When User clicks on the random record to get a recordID for the API request
        And User sends the payload in the API PUT call and validates the response
            | name | street | rooms | price | activeStatus | expectedResponseCode |
            |      |        |       |       |              | 500                  |
        Then User sends the GET call and verifies the name not modified in that record
