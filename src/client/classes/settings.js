import {loadTemplate} from '../lib/utils.js';
import {template} from '../lib/templator.js';
import {events} from '../lib/eventsPubSubs.js';
import $ from "jquery";

let settings = {};

//Get settings
events.subscribe('dataservice/getSettings',(obj) => {
  let settings_ = JSON.parse(obj);
  settings = new Settings(settings_.weightXP,settings_.weightGP,settings_.defaultTerm,settings_.terms);
  events.publish('settings/change',settings);
});

//Change the weight of XP
events.subscribe('settings/changeWeight',(obj) => {
  $('#idXPweight').text(obj.rangeChanger + '% XP weight');
  settings.weightXP = obj.rangeChanger;
  $('#idGPweight').text((100 - obj.rangeChanger) + '% GP weight');
  settings.weightGP = (100 - obj.rangeChanger);
  events.publish('dataservice/saveSettings',settings);
  events.publish('settings/change',settings);
});

//Change the value of the default term
events.subscribe('settings/changeDefaultTerm',(obj) => {
  settings.defaultTerm = obj;
  events.publish('dataservice/saveSettings',settings);
  events.publish('settings/change',settings);
});

class Settings {
  constructor(weightXP,weightGP,defaultTerm,terms) {
    this.weightXP = weightXP;
    this.weightGP = weightGP;
    this.terms = terms;
    this.defaultTerm = this.getDefaultTerm(defaultTerm);
  }

  getDefaultTerm(defaultTerm) {
    if (defaultTerm) {
      this.defaultTerm = defaultTerm;
      return this.defaultTerm;
    }else {
      let out = '';
      try {
        out = this.terms[0].name;
        this.terms.forEach(element => {
          let dateFrom = element.begin;
          let dateTo = element.end;
          let d1 = dateFrom.split('/');
          let d2 = dateTo.split('/');

          let from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
          let to   = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
          let currentDate = new Date();
          if (currentDate > from && currentDate < to) {
            out = element.name;
          }
        });
      }catch (err) {
        out = '1st Term';
      }
      this.defaultTerm = out;
      return out;
    }
  }
  
  //Get terms
  static getTerms() {
    return settings.terms;
  }
  
  //Get XP weight
  static getXpWeight(){
    return settings.weightXP;
  }

  //Get the GT weight
  static getGtWeight(){
    return settings.weightGP;
  }

}

export default Settings;
