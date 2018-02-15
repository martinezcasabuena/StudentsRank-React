/**
 * Person class. We store personal information and attitudePoints that reflect daily classroom job
 *
 * @constructor
 * @param {string} name - Person name
 * @param {string} surname - Person surname
 * @param {array} attitudeTasks - Person awarded AttitudeTasks array   
 * @param {number} id - Person id default value null whwen created first time
 * @tutorial pointing-criteria
 */

import {formatDate,popupwindow,hashcode,loadTemplate,getCookie} from '../lib/utils.js';
import {template} from '../lib/templator.js';
import {events} from '../lib/eventsPubSubs.js';
import $ from "jquery";
import RankingListPage from '../components/rankingListPage.js';
import React from 'react';
import reactDOM from 'react-dom';
import Settings from '../classes/settings.js';
import GradedTask from '../classes/gradedtask.js';

let students = new Map();
let settings = {};
let attitudeMAP = new Map();
let gradedtaskMAP = new Map();

//Add or edit a student
events.subscribe('dataservice/SaveStudent',(obj) => {
    let student = {};
    //UPDATE
    if (obj.student.studentId) {
       student=students.get(obj.student.studentId);
       student.name = obj.student.studentName;
       student.surname = obj.student.studentSurname;
      
       events.publish('dataservice/saveStudents',JSON.stringify([...students]));
       events.publish('/context/getRankingTable');
    //NEW  
    }else{
      student = new Person(obj.student.studentName,obj.student.studentSurname,[]);
      Person.addStudent(student);
    }
    obj.formData.append('idStudent',student.getId());    
    loadTemplate('api/uploadImage',function(response) {
      console.log(response);
    },'POST',obj.formData,'false');
  }
);

//Change value of graded tasks
events.subscribe('student/changeStudentMark',(obj) =>{
  let idPerson = obj.student.id;
  let idGradedTask = obj.gtTask.id;
  let gt = gradedtaskMAP.get(parseInt(idGradedTask));
  gt.addStudentMark(idPerson,obj.taskMark);
});

events.subscribe('attitudeTask/change',(obj) => {
  attitudeMAP = obj;
});

events.subscribe('gradedTask/change',(obj) => {
  gradedtaskMAP = obj;
  Person.getRankingTable();
});

events.subscribe('dataservice/getStudents',(obj) => {
  let students_ = new Map(JSON.parse(obj));
  students_.forEach(function(value_,key_,students_) {
      students_.set(key_,new Person(value_.name,value_.surname,
          value_.attitudeTasks,value_.id));
    });
  students = students_;
});

events.subscribe('settings/change',(obj) => {
  settings = obj;
});

events.subscribe('/context/newGradedTask',(gtask) => {
  students.forEach(function(studentItem,studentKey,studentsRef) {
    gtask.addStudentMark(studentKey,0);
  });
});


const privateAddTotalPoints = Symbol('privateAddTotalPoints'); /** To accomplish private method */
const _totalXPpoints = Symbol('TOTAL_XP_POINTS'); /** To acomplish private property */

class Person {
  constructor(name,surname,attitudeTasks,id=null) {
    this[_totalXPpoints] = 0;
    this.name = name;
    this.surname = surname;
    if (!id) {
      this.id = hashcode(this.name + this.surname);
    }else {
      this.id = id;
    }
    this.attitudeTasks = attitudeTasks;
  }

  /** Get person id  based on a 10 character hash composed by name+surname */
  getId() {
    return this.id;
  }

  /** Read person _totalXPpoints. A private property only modicable inside person instance */
  getXPtotalPoints() {
    this[_totalXPpoints] = 0;
    try {
      this.attitudeTasks.forEach(function (itemAT) {
        if (attitudeMAP.size > 0) {
          let instanceAT = attitudeMAP.get(parseInt(itemAT.id));
          try {
            this[_totalXPpoints] += parseInt(instanceAT.points);
          } catch (error) {
            this[_totalXPpoints] += 0;
          }
        }
      }.bind(this));
    }catch (err) {
      console.log('ERROR:' + err);
    }

    return this[_totalXPpoints];
  }

  /** returns max XP grade used to calculate XP mark for each student */
  static getMaxXPmark() {
    let max = 0;
    students.forEach(function(studentItem,studentKey,studentsRef) {
      if (studentItem.getXPtotalPoints() > max) {
        max = studentItem.getXPtotalPoints();
      }
    });
    return max;
  }
  /** Add a Attitude task linked to person with its own mark. */
  addAttitudeTask(taskInstance) {
    let dateTimeStamp = new Date();//Current time
    this.attitudeTasks.push({'id':taskInstance.id,'timestamp':dateTimeStamp});
    events.publish('/context/addXP',{'attitudeTask':taskInstance,'person':this});
    events.publish('dataservice/saveStudents',JSON.stringify([...students]));    
  }
  /** Delete XP associated to this person */
  deleteXP(taskInstanceId) {
    console.log(taskInstanceId);
    this.attitudeTasks.forEach((itemAT) => {
        if (itemAT.id == taskInstanceId) {
          let index = this.attitudeTasks.indexOf(itemAT);
          if (index > -1) {
            this.attitudeTasks.splice(index, 1);
          }
        }
      });
    events.publish('dataservice/saveStudents',JSON.stringify([...students]));
  }

  /** Get students Marks in current term from context from newer to older */
  getStudentMarks() {
    let gtArray = [];
    try {
      gradedtaskMAP.forEach((valueGT) => {
        gtArray.push([valueGT.id,{id:valueGT.id,points:valueGT.studentsMarkMAP.get(this.id),name:valueGT.name,
          weight:valueGT.weight,datetime:formatDate(new Date(valueGT.datetime))}]);
      });

      if (settings.defaultTerm !== 'ALL') {
        let aux = [];
        for (let i = 0;i < gtArray.length;i++) {
          let gtInstance = gradedtaskMAP.get(gtArray[i][0]);
          if (gtInstance.term === settings.defaultTerm) {
            aux.push(gtArray[i]);
          }
        }
        gtArray = aux;
      }
    }catch (err) {
      console.log('ERROR' + err);
    }
    return gtArray.reverse();
  }

  /** Get total points over 100 taking into account different graded tasks weights */
  getGTtotalPoints() {
    let points = 0;
    try {
      gradedtaskMAP.forEach((itemTask) => {
        if (itemTask.term === settings.defaultTerm || settings.defaultTerm === 'ALL') {
          points += itemTask.studentsMarkMAP.get(this.id) * (itemTask.weight / 100);
        }
      });
    } catch (err) {
      console.log(err);
    }
    return Math.round((points * 100) / 100);
    //return GradedTask.getStudentGradedTasksPoints(this.getId());
  }
  /** XP mark relative to highest XP mark and XP weight and GT grade */
  getFinalGrade() {
    let xpGrade = this.getXPtotalPoints() * (settings.weightXP) / Person.getMaxXPmark();
    if (isNaN(xpGrade)) {
      xpGrade = 0;
    }
    return Math.round(xpGrade + (this.getGTtotalPoints() * (settings.weightGP / 100)));
  }
  
  static getPersonById(idHash) {
    return students.get(parseInt(idHash));
  }

  static getRankingTable() {
    reactDOM.render(<RankingListPage gtWeight={Settings.getGtWeight()} xpWeight={Settings.getXpWeight()}
    students= {Person.getStudentsFromMap()} gradedTasks= {GradedTask.getGradedTasksFromMap()}/>, document.getElementById('content'));   
  }

  static addStudent(studentInstance) {
    events.publish('student/new',studentInstance);
    students.set(studentInstance.getId(),studentInstance);
    events.publish('dataservice/saveStudents',JSON.stringify([...students])); 
    events.publish('/context/getRankingTable');
  }
  static getStudentsSize() {
    return students.size;
  }
  static deleteById(idPerson) {
    students.delete(idPerson);
    events.publish('dataservice/saveStudents',JSON.stringify([...students]));
  }
  static getStudentsFromMap() {
    return [...students.entries()];
  }
}

export default Person;
