import webdriver from 'selenium-webdriver';
import AbstractPage from'./abstractPage';
import { candidate, filter, hiringSection } from '../utils/locators';

export default class HomePage extends AbstractPage {

	constructor(){
	   super();
	   this.clear = filter.clearButton;
           this.submit = filter.submitButton;
	   this.searchName = filter.nameInput;
	   this.searchCity = filter.cityInput;

	   this.stepUp = candidate.upButton;
	   this.userName = candidate.fullName;
	   this.userPhoto = candidate.profileImage;
	   this.userCity = candidate.city;
	   this.userDetails = candidate.profileContainer:

	   this.stage1 = hiringSection.step1;
	   this.stage2 = hiringSection.step2;
	   this.stage3 = hiringSection.step3;
       }


	async addFilter(name, city){
	   let result = {};
	   await this.set(this.searchName, name);
	   await this.set(this.searchCity, city);
	   await this.find(this.submit).click();

           let items = await this.findAll(this.userDetails);
	   if (items.length == 0){
		return items.length;
	   } else {
		let person = await this.detectPerson();
		return result = {
			count: items.length,
			person: person
			}
	   }
	}

	async clearInputs(){
	   await this.find(this.searchName).clear();
	   await this.find(this.searchCity).clear();
	}

	async detectPerson(){
	   let name = await this.find(this.userName).getText();
	   let city = await this.find(this.userCity).getText();
	   return `${name} ${city}`;
	}

	async removeFilter(){
	   await this.find(this.clear).click();
	   let result = await this.find(this.userDetails);
	   if (result.length == 0 || result.length == 1) {
		return false;
	   } else  if(this.find(this.searchName).getText() !== "" && this.find(this.searchCity).getText() !== ""){
		 return false;
	   }
	  return true;
	}


}
