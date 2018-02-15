'use strict';
import {context} from './context.js';
import {deleteCookie,setCookie,loadTemplate} from './lib/utils.js';
import {updateFromServer} from './dataservice.js';
import {events} from './lib/eventsPubSubs.js';
import MenuPage from './components/menuPage.js';
import ModalNewSubject from './components/modalNewSubject.js';
import $ from "jquery";
//import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import React from 'react';
import reactDOM from 'react-dom';

//import modal from "bootstrap";

let settings = {};
events.subscribe('settings/change',(obj) => {
  settings = obj;
});

events.subscribe('settings/newSubject',(obj) => {
  addSubject()
});

events.subscribe('settings/saveNewSubject',(obj) => {
  saveNewSubject(obj)
});


events.subscribe('settings/changeSubject',(obj) => {
  context.user.defaultSubject = obj;
  setCookie('user',JSON.stringify(context.user),7);
  loadTemplate('api/changeSubject',function(response) {
    updateFromServer();
    //context.getTemplateRanking();
  },'GET','newsubject=' + obj,false);
  console.log(context.user)
  //events.publish('dataservice/saveStudents',JSON.stringify([...students]));
  //events.publish('/context/getRankingTable'); 
});

/** Show Menu  */
function showMenu() {
  $('#navbarNav').show();
}
/** Hide Menu */
function hideMenu() {
  let sel = $('#navbarNav');
  sel.show().hide();
}
/** Generate menu options taking into account logged in user */
function generateMenu() {
  reactDOM.unmountComponentAtNode(document.getElementById('menu')); //umount react component                    
  reactDOM.render(<MenuPage user={context.user} settings={settings}/>, document.getElementById('menu')); 
}
/** Logout. Delete session in server side and credentials in client side */
function logout() {
  context.user = '';
  deleteCookie('user');
  deleteCookie('connect.sid');
  hideMenu();
  loadTemplate('api/logout',function(response) {
                context.clear();
                context.login();
                document.location.href = '/';
              },'GET','',false);
}

function saveNewSubject(subject){
  let sharedGroup = "";
  if(subject.sharedGroups){
    sharedGroup = subject.sharedGroups;
  }
  loadTemplate('api/addSubject',function(response) {
    context.user.defaultSubject = subject.subjectName;
    context.user.subjects.push(subject.subjectName);
    $('#SubjectModal').modal('toggle');
    $('.modal-backdrop').remove();
    events.publish('/context/getRankingTable');
    //if (funcCallback) funcCallback();
    console.log(sharedGroup);
    
  },'GET','newSubject=' + subject.subjectName + '&sharedGroup=' + sharedGroup,false);
  //return false; //Abort submit

}

function addSubject(funcCallback) {
  reactDOM.unmountComponentAtNode(document.getElementById('modal')); //umount react component
  loadTemplate('api/getSharedGroups',function(response) {
    let sharedGroups = JSON.parse(response);
    reactDOM.render(<ModalNewSubject groups={sharedGroups} />, document.getElementById('modal')); 
    $('#SubjectModal').modal('toggle');  
  },'GET','',false);
  
}
export {generateMenu,addSubject,logout,showMenu,hideMenu};