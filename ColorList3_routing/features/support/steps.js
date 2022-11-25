// Note:  To keep the example simple, you need to launch the react app and the 
// back-end API before running Cucumber

const { Given, When, Then, Before, AfterAll } = require('@cucumber/cucumber')
const { Builder, By, Key, until } = require('selenium-webdriver')
const { expect } = require('expect')  // The matchers from Jest
const http = require('http')

// Note:  This is asynchronous.  driver is a promise.
let driver = new Builder().forBrowser('chrome').build()

Before(() => {
  driver.get('http://localhost:3001/reset')
})


AfterAll(() => {
  if (driver !== null) {
    driver.quit
  }
})

When('I visit the root page', () => {
  // get returns a promise. Remember to return this promise
  // so the runner knows when to move onto the next step.
  return driver.get('http://localhost:3000/')
})

Then('I should see {int} colors', async function (numColors) {
  const colors = await driver.findElements(By.xpath('//section'))
  expect(colors.length).toBe(numColors)
})

Given('I edit the {string} color', async (colorName) => {
  const editButton = driver.findElement(By.xpath(`//section[h1/text()='${colorName}']//button`))
  editButton.click()
})

Then('The color form should say {string}', async function (label) {
  const formLabel = await driver.findElement(By.xpath('//*[@id="updateForm"]/span'))
  expect(await formLabel.getText()).toBe(label)
})

Then('The color form should have an {string} button', async function (label) {
  await driver.findElement(By.xpath(`//*[@id='updateForm']//button[text()='${label}']`))
  // no expect needed:  Previous statement will fail if button is not found.
})

When('I rename the color to {string}', async function (newColor) {
  const titleInput = await driver.findElement(By.xpath('//input[@type="text"]'))
  titleInput.clear()
  titleInput.sendKeys(newColor)
})

When('I click {string}', async function (label) {
  const button = await driver.findElement(By.xpath(`//*[@id='updateForm']//button[text()='${label}']`))
  button.click()
})

Then('I should see a color named {string}', async function (colorName) {
  await driver.findElement(By.xpath(`//section[h1/text()='${colorName}']`))
})

Then('The color name in the form should be empty', async function () {
  const titleInput = await driver.findElement(By.xpath('//input[@type="text"]'))
  expect(await titleInput.getAttribute('value')).toBe('')
})

When('I set the color to {string}', async function (newColor) {
  // This doesn't quite work yet.
  await driver.findElement(By.xpath('//input[@type="color"]'))
  const qs = `document.querySelector("[type='color']").value = '${newColor}'`
  console.log(qs)
  driver.executeScript(qs)
})
