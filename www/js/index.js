/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
        
        //后退按钮
        // document.addEventListener("backbutton", onBackKeyDown, false);
        // function onBackKeyDown(e) {
        //     e.preventDefault();
        //     alert('"后退按钮"被点击啦!');
        // }

        document.getElementById("btn_alert").addEventListener("click", dialogAlert);
        document.getElementById("btn_confirm").addEventListener("click", dialogConfirm);

        document.getElementById("btn_start").addEventListener("click", audioCapture);
        document.getElementById("btn_stop").addEventListener("click", imageCapture);
        document.getElementById("btn_video").addEventListener("click", videoCapture);

        function strart() {
            var targetUrl = "https://www.baidu.com";
            window.location.replace(targetUrl);
        }

        function stop() {
            var targetUrl = "https://www.yiibai.com/cordova/cordova_dialogs.html";
            window.location.replace(targetUrl);
        }

        function dialogAlert() {
            var message = "I am Alert Dialog!";
            var title = "ALERT";
            var buttonName = "Alert Button";

            navigator.notification.alert(message, alertCallback, title, buttonName);
            function alertCallback() {
                console.log("Alert is Dismissed!");
            }

        }

        function dialogConfirm() {
            var message = "Am I Confirm Dialog?";
            var title = "CONFIRM";
            var buttonLabels = "YES,NO";
            navigator.notification.confirm(message, confirmCallback, title, buttonLabels);
            function confirmCallback(buttonIndex) {
                console.log("You clicked " + buttonIndex + " button!");
            }

        }

        function audioCapture() {
            var options = {
                limit: 1,
                duration: 10
            };
            navigator.device.capture.captureAudio(onSuccess, onError, options);

            function onSuccess(mediaFiles) {
                var i, path, len;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    path = mediaFiles[i].fullPath;
                    console.log(mediaFiles);
                }
            }

            function onError(error) {
                navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            }

        }


        function imageCapture() {
            var options = {
                limit: 1,
                targetWidth:50,
                targetHeight:50,
            };

            navigator.device.capture.captureImage(onSuccess, onError, options);

            function onSuccess(mediaFiles) {
                var i, path, len;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    path = mediaFiles[i].fullPath;
                    var image = document.getElementById('myImage');
                    image.src = path;
                    console.log(mediaFiles);
                }
            }

            function onError(error) {
                navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            }

        }


        function videoCapture() {

            var options = {
                limit: 1,
                duration: 10
            };

            navigator.device.capture.captureVideo(onSuccess, onError, options);

            function onSuccess(mediaFiles) {
                var i, path, len;

                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    path = mediaFiles[i].fullPath;
                    console.log(mediaFiles);
                }
            }

            function onError(error) {
                navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            }

            window.addEventListener("batterystatus", onBatteryStatus, false);

            function onBatteryStatus(status) {
                console.log("Level: " + status.level + " isPlugged: " + status.isPlugged);
            }

            window.addEventListener("batterylow", onBatteryLow, false);
            function onBatteryLow(status) {
                alert("Battery Level Low " + status.level + "%");
            }

        }
    },
};

app.initialize();