Feature: Authors

  Scenario: Visit root page (simple)
    When I visit the home page
   # Then I should see the loading message
    When I wait for the authors to load
    Then I should see a list of authors

  Scenario: Visit root page (thorough)
    When I visit the home page
    And I wait for the authors to load
    Then I should see a list of 3 authors
    And Author 1 should be "George" "Washington" with email "george@washington.com"
    And Author 2 should be "John" "Adams" with email "john@adams.com"
    And Author 3 should be "Thomas" "Jefferson" with email "thomas@jefferson.com"
    And The Author form should be in create mode
    And The Author form should be empty

  Scenario: Create a new author
    When I visit the home page
    And I wait for the authors to load
    And I enter "James" "Madison" with email "james@madison.com" into the Author form
    And I click the Create button
    And I wait until I can see "james@madison.com" in the Author list
    Then I should see a list of 4 authors
    And Author 1 should be "George" "Washington" with email "george@washington.com"
    And Author 2 should be "John" "Adams" with email "john@adams.com"
    And Author 3 should be "Thomas" "Jefferson" with email "thomas@jefferson.com"
    And Author 4 should be "James" "Madison" with email "james@madison.com" 
    And The Author form should be in create mode
    And The Author form should be empty
