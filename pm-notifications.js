// PM Notification
// Version: 1.0.0
// Author: MSG
// This header must remain intact.  ALL comments are to remain intact.
// This plugin CANNOT be modified to be passed off as your own.  You MAY modify notated sections for your own use.
// You are NOT allowed to redistribute this plugin if it has been modified.

/*
**************************
* DO NOT EDIT BELOW THIS *
**************************
*/

function pmnotice() {
    // if you want this displayed on every page, you are allowed to change the line below to: if (pb.data('user').is_logged_in == 1) {
    if ((pb.data('route').name == "home" || pb.data('route').name == "forum") && pb.data('user').is_logged_in == 1) { // Are we on the page designated as "home" or "forum" and is the user logged in?
        var settings = pb.plugin.get('msg_pm_notification').settings; // this just gives us a quicker way to access the plugin settings.
        var tbText = settings.msg_tb_text; // get the text color for the title bar from the plgin UI.
        var tbBG = settings.msg_tb_bg; // get the background color for the title bar from the plgin UI.
        var caSize = 0; // initializing the content area text size to 0 - for use in an if statement later on.
        var caText = settings.msg_ca_text; // get the text color for the content area from the plgin UI.
        var caBG = settings.msg_ca_bg; // get the background color for the content area from the plgin UI.
        var msgs = pb.data('user').has_new_messages; // returns a boolean to check if the user has any new messages or not.
        var nbrMsgs = $("[href='/conversations']").find('.tip-number').html(); // gets the number of new messages.  BIG thanks to Todge for this!
        var tbMsg = ""; // initializing the title bar 'MESSAGE' text to nothing.  It will be set to singular or plural below.
        var caMsg = ""; // initializing the content area 'message' text to nothing.  It will be set to singular or plural below.
        
        if (nbrMsgs == 1) { // if we only have 1 new message, make the text singular.
            tbMsg = "MESSAGE"; // title bar text singular.
            caMsg = "message"; // content area text singular.
        }
        else { // if we have more than 1 message, make the text plural.
            tbMsg = "MESSAGES"; // title bar text plural.
            caMsg = "messages"; // content area text plural.
        }
        
        if (!settings.msg_ca_size || settings.msg_ca_size <= 0) { // if the text size is undefined or is less than or equal to 0, set it to 18 (px).
            caSize = 18;
        }
        else {
            caSize = settings.msg_ca_size; // otherwise, set the text size to the setting in the plugin UI.
        }
        
        /*
        *********************************************************************************************************************************************************
        * You can edit the text displayed and the styling in the titleBar and contentArea variables below, but do not edit or remove the variables within them. *
        *********************************************************************************************************************************************************
        */
        
        if (msgs == 1) { // using our boolean result to see if there are any new messages.  The following will only run if there are.
            // the following line handles creating the container and displaying the title bar.
            var titleBar = '<div class="container"><div class="title-bar" style="text-align: center; background-color: #' + tbBG + '; color: #' + tbText + ';"><h2>NEW ' + tbMsg + '</h2></div>';
            // the following line handles displaying the content area.
            var contentArea = '<div class="content" style="font-size: ' + caSize + 'px; text-align: center; background-color: #' + caBG + '; color: #' + caText + ';"><br />You have <span style="color: #ffffff;"> >> ' + nbrMsgs + ' << </span> new ' + caMsg + '.  Click <a href="/conversations" style="color: #ffffff; text-decoration: underline overline;">HERE</a> to go to your Inbox.<br /><br /></div></div>';
            // do not change the following line, as this puts it all together.
            var notification = titleBar + contentArea;
            // the following line puts the container right above the forum's content.  Change the '#content' if you want this placed before something else.
            $('#content').prepend(notification);
        }
    }};

// do NOT modify the lines below.
$(document).ready(function() {
    pmnotice();
});
