Feature: Edit Color

    Scenario: Edit a Color
        When I visit the root page
        Then I should see 3 colors
        When I edit the "lawn" color
        Then The color form should say "Update Color"
        And The color form should have an "Update" button

        When I rename the color to "newLawn"
        And I click "Update"
        Then I should see a color named "newLawn"
        And The color form should say "New Color"
        And The color name in the form should be empty
        And The color form should have an "Add" button
        Then I should see 3 colors

    Scenario: Abort color Edit
        When I visit the root page
        Then I should see 3 colors
        Given I edit the "lawn" color
        Then The color form should say "Update Color"
        And The color form should have an "Update" button

        When I rename the color to "newLawn"
        And I click "Cancel"
        Then I should see a color named "lawn"
        And The color form should say "New Color"
        And The color name in the form should be empty
        And The color form should have an "Add" button
        And I should see 3 colors


    Scenario: Add a new color
        When I visit the root page
        Then I should see 3 colors
        And The color form should say "New Color"
        And The color form should have an "Add" button

        When I rename the color to "theNewColor"
        And I set the color to "#00FF00"
        And I click "Add"
        Then I should see 4 colors
        Then I should see a color named "theNewColor"
        And The color form should say "New Color"
        And The color name in the form should be empty
        And The color form should have an "Add" button