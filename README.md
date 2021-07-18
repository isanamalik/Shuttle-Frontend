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


ERROR: unable to load script from assets 'index.android.bundle'


mkdir android\app\src\main\assets

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android\app\src\main\assets\index.android.bundle --assets-dest android\app\src\main\res
 

(if this causes regular expression error: or Invalid regular expression: /(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/: Unterminated character class. Run CLI with --verbose flag for more details.)

try:

go to :   {project_root}\node_modules\metro-config\src\defaults\blacklist.js

change blacklist variable to: var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];


ERROR: Command failed: gradlew.bat app:installDebug
cd android
gradlew.bat installDebug
cd ..
react-native run-android



Splash Command 
yarn react-native generate-bootsplash assets/Splash.png --background-color=FFFFFF --logo-width=200 --assets-path=assets --flavor=main

linking date picker with older react native version : npx react-native link react-native-date-picker