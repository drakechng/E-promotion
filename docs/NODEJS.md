# NodeJs Basic Set Up

## Mac

To install Nodejs on mac os you should install systems packages manager first the *brew* :

```sh
curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install
```
Then you can install nodejs by simply type.

```sh
brew install node
```

To view and modify the documentation. You need to install gitbook globally.

```sh
npm install -g gitbook
```

Then you can view and modify the documentation in gh-pages branch

```sh
cd E-promotion
git check out gh-pages
git serve #To life preview the doc in 4000 port
git build #To build the doc from md to html
```
Next, Let's install the meteor cli.
```sh
curl https://install.meteor.com/ | sh
```

Then you can view and modify the server code in master branch
```sh
git check out master
meteor npm install #Install the the packages
meteor #To build and run the code
```

If you want to try the application also, you need to set android environment first.
```sh

```
## Linux
```sh
apt-get install node
```
