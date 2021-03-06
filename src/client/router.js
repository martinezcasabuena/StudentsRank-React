import {context} from './context.js'; //Singleton
import {popupwindow,getIdFromURL,setCookie} from './lib/utils.js';
import {logout} from './menu.js';
import AttitudeTask from './classes/attitudetask.js';
import GradedTask from './classes/gradedtask.js';
import Person from './classes/person.js';
import Settings from './classes/settings.js';
import {saveStudents} from './dataservice.js';
import GradedTaskPage from './components/gradedTaskPage.js';
import RankingListItemPage from './components/rankingListItemPage.js';
import RankingListPage from './components/rankingListPage.js';
import PersonPage from './components/personPage.js';
import PersonDetailPage from './components/personDetailPage.js';
import ModalAttitudeTaskPage from './components/modalAttitudeTaskPage.js';
import SettingsPage from './components/settingsPage.js';
import LoginPage from './components/loginPage.js';
import React from 'react';
import reactDOM from 'react-dom';
import {events} from './lib/eventsPubSubs.js';
import $ from "jquery";

let settings;
events.subscribe('settings/change',(obj) => {
  settings = obj;
});
/** Primitive routing mechanism based on detecting clicks on links and get the URL */
function initRouter() {
  
  window.onclick = function(e) {
        e = e || event;
        var isLink = findParent('a',e.target || e.srcElement);
        if (isLink) {
          reactDOM.unmountComponentAtNode(document.getElementById('content')); //umount react component
          reactDOM.unmountComponentAtNode(document.getElementById('modal')); //umount react component                  
          switch (true) {
            /** View Student information detail */
            case /#student/.test(isLink.href):
              let personInstance = Person.getPersonById(getIdFromURL(isLink.href));
              reactDOM.render(<PersonDetailPage student={personInstance} attitudeTasks={AttitudeTask}
              gradedTasks={personInstance.getStudentMarks()}/>, document.getElementById('content'));
              break;
            /** Modify student information */
            case /#editStudent/.test(isLink.href):
              personInstance = Person.getPersonById(getIdFromURL(isLink.href));
              reactDOM.render(<PersonPage props={personInstance} />, document.getElementById('content'));              
              break;
            /** Delete student with confirmation */
            case /#deleteStudent/.test(isLink.href):
              if (window.confirm('Are you sure?')) {
                Person.deleteById(parseInt(getIdFromURL(isLink.href)));
                context.getTemplateRanking();
              }
              break;
            /** Delete Xp associated to a person */
            case /#deleteXP/.test(isLink.href):
              if (window.confirm('Are you sure?')) {
                var reg = /\/{1}([0-9,-]+)\//;
                var matchResults = isLink.href.match(reg);
                personInstance = Person.getPersonById(matchResults[1]);
                personInstance.deleteXP(parseInt(getIdFromURL(isLink.href)));
                context.getTemplateRanking();                
              }
              break;
            /** Show popup associated to an student in order to assign XP points  */
            case /#addXP/.test(isLink.href):
              personInstance = Person.getPersonById(getIdFromURL(isLink.href));
              context.getTemplateRanking();
              reactDOM.render(<ModalAttitudeTaskPage student={personInstance} attitudeTasks={AttitudeTask.getAttitudeTasksFromMap()}/>, document.getElementById('modal'));              
              $('#XPModal').modal('toggle');
              break;
            /** Add new student form */
            case /#addStudent/.test(isLink.href):
              reactDOM.render(<PersonPage props={{}}/>, document.getElementById('content'));              
              break;
            case /#settings/.test(isLink.href):
              reactDOM.render(<SettingsPage settings={settings}/>, document.getElementById('content'));              
              break;
            /** logout */
            case /#logout/.test(isLink.href):
              logout();
              break;
            /** Button to show a one more graded task on ranking table list */
            case /#expandedView/.test(isLink.href):
              $('.tableGradedTasks').toggle();

              if ($('.tableGradedTasks').is(':visible')) {
                setCookie('expandedView','visible',345);
                $('.fa-hand-o-right').addClass('fa-hand-o-down').removeClass('fa-hand-o-right');
              }else {
                setCookie('expandedView','hidden',345);
                $('.fa-hand-o-down').addClass('fa-hand-o-right').removeClass('fa-hand-o-down');
              }
              break;
            /** Add new Graded Task form */
            case /#addGradedTask/.test(isLink.href):
              reactDOM.render(<GradedTaskPage props={{term:settings.defaultTerm}} allowedWeight={(100 - GradedTask.getGradedTasksTotalWeight())} />, document.getElementById('content'));
              break;
            case /#detailGradedTask/.test(isLink.href):
              let gtInstance = GradedTask.getGradedTaskById(getIdFromURL(isLink.href));	     
              reactDOM.render(<GradedTaskPage props={gtInstance} allowedWeight={(100 - GradedTask.getGradedTasksTotalWeight() + parseInt(gtInstance.weight))} />, document.getElementById('content'));
              break;
            case /#reactTest/.test(isLink.href):
              context.getTemplateRanking();              
              break;

            default:
              context.isLogged();
              //reactDOM.render(<LoginPage props={}/>, document.getElementById('content'));   
              
          }
        }
    };
}

/** find first parent with tagName [tagname] so nested links <a> are triggered too */
function findParent(tagname,el) {
  while (el) {
    if ((el.nodeName || el.tagName).toLowerCase() === tagname.toLowerCase()) {
      return el;
    }
    el = el.parentNode;
  }
  return null;
}

export {initRouter};
