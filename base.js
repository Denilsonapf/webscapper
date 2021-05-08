const {remote} = require('webdriverio');

let browser

;(async () => {
    browser = await remote({
        capabilities: { browserName: 'chrome' }
    })

    await browser.navigateTo('https://www.google.com/ncr')

    const searchInput = await browser.$('#lst-ib')
    await searchInput.setValue('WebdriverIO')

    const searchBtn = await browser.$('input[value="Google Search"]')
    await searchBtn.click()

    console.log(await browser.getTitle()) // outputs "WebdriverIO - Google Search"

    await browser.deleteSession()
})().catch((err) => {
    console.error(err)
    return browser.deleteSession()
})