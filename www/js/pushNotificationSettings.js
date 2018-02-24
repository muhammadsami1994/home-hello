var pushNotification = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        pushNotification.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var pushNotification = window.plugins.pushNotification;
        pushNotification.register(pushNotification.successHandler, pushNotification.errorHandler,{"senderID":"63010211743","ecb":"pushNotification.onNotificationGCM"});


        console.log('Received Event: ' + id);
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        console.log('Callback Success! Result = '+result)
    },
    errorHandler:function(error) {
        alert("Error"+error);
    },
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                   /* alert('registration id = '+ e.regid);*/

                    localStorage.PushRegId = e.regid

                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server

                /*For Push Notification Popup*/
                var pushPopup = document.getElementById('push-notification-popup');
                pushPopup.className = 'popup-container popup-showing';
                pushPopup.getElementsByClassName('popup-title')[0].innerText = e.payload.title;
                pushPopup.getElementsByClassName('popup-body')[0].innerHTML = e.message;

                break;

            case 'error':
                alert('GCM error = '+e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    },
    closePushNotificationPopup:function(){
        document.getElementById('push-notification-popup').className = "popup-container"
    }
};

pushNotification.initialize();

