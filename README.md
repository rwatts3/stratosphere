# THIS IS A WIP
Next thing to figure out is how to handle logins from Meteor tool

# Stratosphere
Stratosphere is a private package server for Meteor.

## Installation
### 1) create a Meteor developer app
First create an  app that can use the meteor developer account services:
[https://www.meteor.com/account-settings/apps](https://www.meteor.com/account-settings/apps) (be sure to set a correct redirect url)
Fill in the app id and app secret in the settings.json.template file and rename the template file to settings.json

### 2) Run the app
This is a Meteor project, so you can deploy and run it the same way as any other Meteor project.
You need to tell meteor it needs to use the settings.json file with the --settings option:
```
meteor --settings settings.json
```
First start-up can take long, since it needs to import all packages from the official package repo.

After this, you need to create the database file.
First you need to find the existing database file (packages.data.db) here:

### 3) Create the package database
On Linux
```
~/.meteor/package-metadata/v2.0.1
```

On Windows:
```
%appdata%\..\Local\.meteor\package-metadata\v2.0.1
```
Next, you copy the existing database file and give it the filename you see when going to the front-end of your package server.
Note that Meteor does not currently support package servers running on another port than port 80, [see this PR](https://github.com/meteor/meteor/pull/4460)

## Usage
To publish and sync with Stratosphere, you have to set the package server URL to your stratosphere URL.
This can be achieved by setting the environment variable: METEOR_PACKAGE_SERVER to your package server url:
```
METEOR_PACKAGE_SERVER_URL=[YOUR URL]
```

Meteor splits package database and files according to this URL, so you should be able to switch package servers back and forth by changing this variable.

## Settings
* upstreamURL: The URL to the of
ficial package manager, you probably don't want to change this
* readmeDirectory: Where readme files are saved to, for now, this must be publicly accessible.
* packageDirectory: Where package zips are saved to, for now, this must be publicly accessible.
* loginRequired: Whether a login is required, not yet implemented.

## Security remarks
Note that currently no effort has been made towards security.
This means that to protect your stratosphere install, you probably want to run it inside a firewall protected part of your organization.
Anyone can view all packages and add new ones. No checks are made towards the input variables or uploaded files!

## Contribute
We're open for contributions.
Here are some ideas:
- Add security (user accounts, check input parameters, uploaded files, ...)
- Look into the 'XXX'-es inside the code, these serve as TODOS
- Tests
- Whatever front-end functionality you consider useful