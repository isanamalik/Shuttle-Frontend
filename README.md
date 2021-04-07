# ned-shuttle-tracker

To run this application :

1. Clone Repository
2. Run npm install
3. Connect your mobile to laptop through cable.
4. Now go to C:/Users/Username/AppData/Local/Android/Sdk/Platform Tools
5. Now open 'cmd' and type adb devices. It will show if your device is connected or not.
6. Now run 'adb reverse tcp:8081 tcp:8081'
7. Now go to Project root directory, open up cmd and type 'react-native run-android'
8. You will see app running on your mobile phone.


If you get some error like: 
ERROR Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication)

Run:

1. cd/android in app root directory
2. run 'gradlew clean'
3. Now run the app again

If the above command doesn't help, then you may have an error in code.
