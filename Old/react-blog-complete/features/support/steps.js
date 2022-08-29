// Note:  To keep the example simple, you need to launch the react app and the 
// back-end API before running Cucumber

const { Given, When, Then, Before, AfterAll } = require("cucumber")
const { Builder, By, Key, until } = require('selenium-webdriver')
const expect = require('expect')  // The matchers from Jest
const http = require('http')

// Note:  This is asynchronous.  driver is a promise.
let driver = new Builder().forBrowser('chrome').build()

// Initialize the test database.
Before(() => {
  http.get('http://localhost:3001/initTest').on('error', (error) => console.log("Problem! " + error))
})


When('I visit the home page', () => {
  // get returns a promise. Remember to return this promise
  // so the runner knows when to move onto the next step.
  return driver.get('http://localhost:3000/')
})

Then(/^I should see the loading message$/, async () => {

  // IMPORTANT This step occasionally fails if the web server loads the
  // authors quickly.  If so, just comment it out.

  // If you prefer, you could also use findElements(By.id('loading-message'))
  return driver.findElements({ id: 'loading-message' }).then(async (elements) => {
    expect(elements.length).toBe(1)

    // Note:  This is here just to provide another example of a test
    // Matching specific text is fragile. You may want to just
    // test for the presence of an element.
    expect(await elements[0].getText()).toEqual('Loading...')
  })

})

When(/^I wait for the authors to load$/, () => {
  // Wait 5 seconds for the authors to load
  // Note the use of 'className' instead of 'class'  ("class" is a JavaScript reserved word)
  return driver.wait(until.elementLocated({ className: 'author-list' }), 5000)
})

Then(/^I should see a list of authors$/, async () => {
  return driver.findElements(By.css('.author-list tbody tr')).then(async (elements) => {
    expect(elements.length).toBeGreaterThanOrEqual(2)
  })
})

Then(/^I should see a list of (\d+) authors$/, async (num) => {
  return driver.findElements(By.css('.author-list tbody tr')).then(async (elements) => {
    expect(elements.length).toBe(num)
  })
})

Then(/^Author (\d+) should be "(["^]+)" "([^"]+)" with email "([^"]+)"$/, async (id, fname, lname, email) => {
  return driver.findElements(By.css(`tr[data-id="${id}"] td`)).then(async (elements) => {
    expect(elements.length).toBe(4)

    expect(await elements[0].getText()).toEqual(fname)
    expect(await elements[1].getText()).toEqual(lname)
    expect(await elements[2].getText()).toEqual(email)
  })
})

Then(/^The Author form should be in create mode$/, () => {
  return driver.findElements({ id: 'create-button' }).then(async (elements) => {
    expect(elements.length).toBe(1)
  })
})

Then(/^The Author form should be empty$/, () => {
  return driver.findElements(By.css('.author-form input')).then(async (inputs) => {
    expect(inputs.length).toBe(3)
    for (let i = 0; i < inputs.length; ++i) {
      expect(await inputs[i].getAttribute('value')).toEqual('')
    }
  })
})

Then(/^I enter "([^"]+)" "([^"]+)" with email "([^"]+)" into the Author form$/, async (fname, lname, email) => {
  driver.findElement(By.id('fname')).sendKeys(fname)
  driver.findElement(By.id('lname')).sendKeys(lname)
  return driver.findElement(By.id('email')).sendKeys(email)
})

Then(/^I click the Create button$/, () => {
  return driver.findElement(By.id('create-button')).then(async (button) => {
    return button.click()
  })
})

Then(/^I wait until I can see "([^"]+)" in the Author list/, (text) => {
  let authorList = driver.findElement({ className: 'author-list' })
  return driver.wait(until.elementTextContains(authorList, text), 5000)
})

AfterAll(() => {
  if (driver !== null) {
    return driver.quit()
  }
})
