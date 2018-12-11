import webdriver from 'selenium-webdriver';

const until = webdriver.until;
const by = webdriver.By;


export default class AbstractPage {

  constructor (){
    this.driver = new webdriver.Builder().forBrowser('chrome').build();
    let driver = this.driver;
  }

  quit() {
    return this.driver.quit();
  }

  goTo(url) {
    return this.driver.get(url);
  }

  find(el) {
    this.driver.wait(until.elementLocated(by.css(el)), 15000);
    return this.driver.findElement(by.css(el));
  }

  findAll(el) {
    this.driver.wait(until.elementLocated(by.css(el)), 15000);
    return this.driver.findElements(by.css(el));
  }

  set(el, value) {
    return this.find(el).sendKeys(value);
  }

  click(el) {
  return this.find(el).click();
  }
}
