
function onFormSubmit(event){
  Logger.log("OnFormSubmit!");
  Logger.log(JSON.stringify(event));
  Logger.log(event.namedValues);
  var message="";
  var username=event.namedValues["Leaderboard Name"][0];
  var profile=null;
  try{
      profile=getUserProfile(username);
      var status="Success Loading";
      message="Successfully Loaded User Profile: "+profile.username +" ("+profile.user_id+")";
      if(profile.following_user){
        message+=" (Already Following this user)"
              var status="Already Following";

      } else {
      try{
        var result=changeRelationship("follow",profile.user_id);
        message +=" Relationship Changed: me to user:"+result.me_to_user +", user to me:"+result.user_to_me;
       }  catch (x){
       status="Error Following User";
        Logger.log("Error Following "+JSON.stringify(x));
        message+="Error Following user "+username+": "+JSON.stringify(x);
       }
       }
      
    } catch (x){
    status="No User Found";
    Logger.log("Error Loading PRofile "+JSON.stringify(x));
    message="Error resolving user profile "+username+": "+JSON.stringify(x);
  }    
  var formValues = event.namedValues;
  var html = '<hr>'+message+'<hr><ul>';
  for (Key in formValues) {
    var key = Key;
    var data = formValues[Key];
    html += '<li>' + key + ": " + data + '</li>';
  };
  html += '</ul>';
  var cfg=getConfigDetails();
  var to=cfg.email.to;
  
  var options={htmlBody:html};
  if(cfg.email.cc) options.cc=cfg.email.cc;
  
  GmailApp.sendEmail(to,"New Pelo Signup ["+username+" : "+status+"]","",options);
}