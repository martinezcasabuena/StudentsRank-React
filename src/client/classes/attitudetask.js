import Task from './task.js';
import $ from "jquery";
/**
 * AttitudeTask class. Create a attitude task in order to be
 * assigned to an individual or group of students. This could be for
 * example , participative attitude at class. Point a good 
 * question in class. Be the first finishing some exercise ...
 * 
 * @constructor
 * @param {string} name - task name
 * @param {string} description - task description
 * @param {string} points - task points associated to that behaviour
 * @param {string} hits - times an attitudeTask has been used by everyone
 * @tutorial pointing-criteria
 */

import {popupwindow,loadTemplate} from '../lib/utils.js';
import {template} from '../lib/templator.js';
import {events} from '../lib/eventsPubSubs.js';

let attitudeTasks = new Map();

//Get Attitude tasks
events.subscribe('dataservice/getAttitudeTasks',(obj) => {
  let attitudeTasks_ = new Map(JSON.parse(obj));
  attitudeTasks_.forEach(function(value_,key_,attitudeTasks_) {
      attitudeTasks_.set(key_,new AttitudeTask(value_.name,value_.description,value_.points,
        value_.hits,value_.id));
    });
  attitudeTasks = attitudeTasks_;
  events.publish('attitudeTask/change',attitudeTasks);
});

//Add XP to student
events.subscribe('attitudeTask/addXPtoStudent',(obj) =>{
  $('#XPModal').modal('toggle');
  $('.modal-backdrop').remove();
  let at = attitudeTasks.get(parseInt(obj.idTask));
  at.hits++;
  obj.student.addAttitudeTask(at);
});

//Add new XP task
events.subscribe('attitudeTask/addNewXPTask',(obj) =>{
  let points = $('#points').val();
  let description = $('#description').val();
  let at = new AttitudeTask(description,description,points);
  attitudeTasks.set(at.id,at);

  events.publish('dataservice/saveAttitudeTasks',JSON.stringify([...attitudeTasks]));    
  events.publish('attitudeTask/change',attitudeTasks);
  $('#XPModal').modal('toggle');
  $('.modal-backdrop').remove();
  at.hits++;
  obj.student.addAttitudeTask(at);
});

class AttitudeTask extends Task {
  constructor(name,description,points,hits=0,id=null) {
    super(name,description,id);
    this.points = points;
    this.hits = hits;
    this.type = (this.points >= 0) ? 'success' : 'danger';//Positive or negative attitude
  }
  static getAttitudeTasks() {
    return attitudeTasks;
  }
  
  static getAttitudeById(idTask) {
    return attitudeTasks.get(idTask);
  }

  /** Returns the graded tasks */
  static getAttitudeTasksFromMap() {
    return [...attitudeTasks.entries()];
  }
}

export default AttitudeTask;