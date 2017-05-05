# NodeJs Basic Set Up

## Mac

To install Nodejs on mac os you shellould install systems packages manager first the *brew* :

```shell
curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install
```
Then you can install nodejs by simply type.

```shell
brew install node
```

To view and modify the documentation. You need to install gitbook globally.

```shell
npm install -g gitbook
```

Then you can view and modify the documentation in gh-pages branch

```shell
cd E-promotion
git check out gh-pages
git serve #To life preview the doc in 4000 port
git build #To build the doc from md to html
```
Next, Let's install the meteor cli.
```shell
curl https://install.meteor.com/ | sh
```

Then you can view and modify the server code in master branch
```shell
git check out master
meteor npm install #Install the the packages
meteor #To build and run the code
```

If you want to try the application also, you need to set android environment first.
You need to install java
```shell
brew cask install java
```
Then you can install android sdk
```shell
brew tap caskroom/cask
brew cask install android-sdk
```
After that you need to set system environment of JAVA\_HOME and ANDROID\_HOME

``` shell
echo "export ANDROID_HOME='/usr/local/share/android-sdk'" > .bash_profile
echo "export PATH=/usr/local/bin:$PATH" > .bash_profile
echo "export PATH=/usr/local/sbin:$PATH" > .bash_profile
echo "export PATH=~/.local/bin/:$PATH" > .bash_profile
echo "export JAVA_HOME=\"$(/usr/libexec/java_home -v 1.8)\"" > .bash_profile
source .bash_profile

```
Then you can install the sdk

``` shell
sdkmanager --update
sdkmanager "platforms;android-25" "build-tools;25.0.2" "extras;google;m2repository" "extras;android;m2repository"
sdkmanager "platforms;android-23" "build-tools;25.0.1" "extras;google;m2repository" "extras;android;m2repository"
sdkmanager --licenses
```

After that you can install the react native cli
``` shell
brew install watchman
npm install -g react-native-cli
```
And install packages from npm

``` shell
cd E-promotion/PromotionApp
npm install
react-native run android
react-native start
```
while you may find a error on no device, you need to create the simulator in the Android studio manually.
And it will be easy to create an alias for future dev easily.
```shell
echo "alias eml='/usr/local/share/android-sdk/emulator/emulator -avd Nexus_S_API_25'" > .bash_profile
```
After that you need to reverse the port form simulator to mac.
```shell
adb reverse tcp:3000 tcp:3000
```
Then you can start to run react-native application.
```shell
react-native run-android
```
To run the ios version. It is simple, you just need to ensure the Xcode get installed.
Then run the cli command inside PromotionApp folder.

```shell
react-native run-ios
```
Now you can use the application.

## Linux

```shell
apt-get install node
```
