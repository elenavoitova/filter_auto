import webdriver from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import HomePage from './pages/homepage';
import chai from 'chai';

const should = chai.should();

describe('Lets testing', function() {
  let page = new HomePage();
  page.goTo('http://localhost:3000');
  this.timeout(50000);


  it('Check app is correct', async function() {
    let title = await page.driver.getTitle();
      title.should.equal('OOS: Crew applications', "Wrong app is launched");
  });

  it('Set invalid filter: blank data', async function(){
    await page.clearInputs();
    let result = await page.addFilter("", "");
    result.should.not.equal(0, "Filter processes blank inputs but shouldn't");
  });

  it('Set invalid filter: unexisted data', async function(){
    let result = await page.addFilter("qwerty", "qwerty");
    result.should.equal(0, "Filter doesn't work");
  });

  it('Set invalid filter: swapped data', async function(){
    await page.clearInputs();
    let result = await page.addFilter("hereford", "lloyd");
    result.should.equal(0, );
  });

  it('Set invalid filter: name from one + city from other', async function(){
    await page.clearInputs();
    let result = await page.addFilter("lloyd", "sheffield");
    result.should.equal(0);
  });

  //Supposed issue: search by full name doesn't work
  it('Set valid filter: full name + city', async function(){
    await page.clearInputs();
    let result = await page.addFilter("julia cunningham", "sheffield");
    result.should.equal(1, "Candidate doesn't exsist");
  });

  //Supposed issue: filter shouldn't be case sencitive
  it('Set valid filter: case sensitive', async function(){
    await page.clearInputs();
    let result = await page.addFilter("Julia", "Sheffield");
    result.should.equal(1, "Candidate doesn't exsist");
  });

  it('Set valid filter: name + city', async function(){
    await page.clearInputs();
    let result = await page.addFilter("julia", "sheffield");
    result.person.should.contain("julia cunningham sheffield", "Candidate doesn't exsist");
  });

  //Supposed issue: input fields doesn't clear
  it('Check clear filter', async function(){
    let clear = await page.removeFilter();
    clear.should.equal(true, "Filter isn't cleared")
  })

   it('quit', async function(){
     await page.quit();
   });






  // it('quit', async function(){
  //   await page.quit();
  // });
});
