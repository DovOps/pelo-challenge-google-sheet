function onOpen() {
   SpreadsheetApp.getUi()  
      .createMenu('Peloton')
      .addItem('Login', 'showSidebarLogin')
      .addItem('Find Rides', 'showSidebarRides')
      .addItem('Find Users', 'showSidebarUsers')
      .addToUi();
}

function handleSidebarLogin(obj){
  var results={};
   if(!obj.username || obj.username.length < 5 ||
      !obj.password  || obj.password.length <5 ) {
     return {"error":"Username and password are both required"};
   } 
  var results=processLogin(obj.username,obj.password);
  // for reasons I don't understand, Google has a hard time serializing this remotely 
  // to HTML calling this via google.script.run, but this fixes the issue.
  //    o
  // -\/^\/-
  // Whatever!
  return  JSON.parse(JSON.stringify(results));
}

function showSidebarLogin() {
  var html = HtmlService.createHtmlOutputFromFile('login-sidebar.html')
      .setTitle('Peloton Login')
      .setWidth(320).setHeight(550);
      SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(html, "Peloton Log In");
}

function showSidebarRides() {
  var tmpl = HtmlService.createTemplateFromFile('rides-sidebar.html').evaluate();
  var html=HtmlService.createHtmlOutput().setContent(tmpl.getContent())
    .setTitle('Peloton On-Demand Ride Search');
  SpreadsheetApp.getUi() 
      .showSidebar(html);
}

function showSidebarUsers() {
  var tmpl = HtmlService.createTemplateFromFile('users-sidebar.html').evaluate();
  var html=HtmlService.createHtmlOutput().setContent(tmpl.getContent())
    .setTitle('Peloton User Search');
  SpreadsheetApp.getUi() 
      .showSidebar(html);
}


function displayUser(id){
  var template=HtmlService.createTemplateFromFile("user-details.html");
  template.user_id=id;
  var output=template.evaluate();
  var html=HtmlService.createHtmlOutput().setContent(output.getContent()).setWidth(800).setHeight(800).setTitle("User Details");
  SpreadsheetApp.getUi().showModalDialog(html,"User Details");
  }
  
function showRideDetails(id){
  var template=HtmlService.createTemplateFromFile("ride-details.html");
  template.ride_id=id;
  
  var output=template.evaluate();
  var html=HtmlService.createHtmlOutput().setContent(output.getContent()).setWidth(800).setHeight(800).setTitle("Ride Details");
  SpreadsheetApp.getUi().showModalDialog(html,"Ride Details");
  }