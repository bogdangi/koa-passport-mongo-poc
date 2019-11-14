Feature: Login

  Background:
    Given there is an empty "users" collection 
    And the application is up and running

  Scenario: As an anonymous user with valid credentials I should be able to login
    Given there a user with username "someValidUserName" and password "someValidPassword"
    When I open "/login" in browser
    And I enter "someValidUserName" into "[name=username]"
    And I enter "someValidPassword" into "[name=password]"
    And I click on element "button[type=submit]"
    Then I have to be redirected to "/private-zone"

  Scenario: As an anonymous user with invalid credentials I should be able to login
    When I open "/login" in browser
    And I enter "someInValidUserName" into "[name=username]"
    And I enter "someInValidPassword" into "[name=password]"
    And I click on element "button[type=submit]"
    Then I have to be redirected to "/login-failed"
