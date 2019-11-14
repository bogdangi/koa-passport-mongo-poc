const { Given, When, Then, Before, After } = require("cucumber");

const { expect } = require("chai");


Before(function fn() {
  return this.setUp();
});

Given('there is an empty {string} collection', function fn(collectionName) {
  return this.dropCollection(collectionName);
});

Given("the application is up and running", function fn() {
  return this.applicationIsUpAndRunning();
});

Given("there a user with username {string} and password {string}", function fn(username, password) {
  return this.addUser(username, password);
});

When("I open {string} in browser", {timeout: 15000}, function fn(path) {
  return this.openBrowserOnPath(path);
});

When("I enter {string} into {string}", function fn(text, selector) {
  return this.type(selector, text);
});

When("I click on element {string}", function fn(selector) {
  return this.click(selector);
});

Then("I have to be redirected to {string}", function fn(path) {
  expect(this.page.url()).to.be.equal(`${this.baseURL}${path}`);
});

After(function fn() {
  return this.tearDown();
});
