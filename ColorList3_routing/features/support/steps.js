// Note:  To keep the example simple, you need to launch the react app and the 
// back-end API before running Cucumber

const { Given, When, Then, Before, AfterAll } = require("cucumber")
const { Builder, By, Key, until } = require('selenium-webdriver')
const expect = require('expect')  // The matchers from Jest
const http = require('http')

// Note:  This is asynchronous.  driver is a promise.
let driver = new Builder().forBrowser('chrome').build()

When('I visit the root page', () => {
  // get returns a promise. Remember to return this promise
  // so the runner knows when to move onto the next step.
  return driver.get('http://localhost:3000/')
})

Then('I edit the {string} color', async (colorName) => {
    const section = driver.findElement(By.xpath(`./section[h1 = '${colorName}']`))
})