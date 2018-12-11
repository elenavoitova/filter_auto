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
		this.userName = candidate.profileName;
		this.userPhoto = candidate.profileImage;

		this.stage1 = hiringSection.step1;
		this.stage2 = hiringSection.step2;
		this.stage3 = hiringSection.step3;
  }


	async addFilter(name, city){
		let result = {};
		await this.set(this.searchName, name);
		await this.set(this.searchCity, city);
		await this.find(this.submit).click();


		let items = await this.findAll('.CrewMember-container');
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
		await this.find('#name').clear();
		await this.find('#city').clear();
	}

	async detectPerson(){
		let name = await this.find('.CrewMemeber-name > div:nth-child(1)').getText();
		let city = await this.find('.CrewMemeber-name > div:nth-child(2)').getText();
		return `${name} ${city}`;
	}

	async removeFilter(){
		await this.find('[type=button]').click();
		let result = await this.find('.CrewMember-container');
		if (result.length == 0 || result.length == 1) {
				return false;
		} else  if(this.find('#name').getText() !== "" && this.find('#city').getText() !== ""){
		 		return false;
		}

		return true;
	}


}
