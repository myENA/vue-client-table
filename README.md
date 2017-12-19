# ENA Common Application Framework (CAF) Template for creating a new library

This is a skeleton to get started with creating a new library to use in ENA CAF

## Getting Started

* Fork this repo giving it a meaningful name.
* Checkout the new repo
* Edit the package json and change the `name` and `description` and `repository` to match the new library name. 
    - Commit

## Developing

Write your code in the `src` folder, organizing as it fits best.

When installing dependencies (eg: underscore, backbone), add them also in the `externals` key in `webpack.config.js`. This is to ensure that dependencies are not bundled in the dist file. They should be instead bundled in the dist of the project that includes this lib

A settings file is provided in `config`, which is a template meant to be parsed by `consul-template` for an output `js`. This will be bundled in a single `ctmpl` file.

## Distributing

* Build the code `npm run build`
* Create a new tag
* Commit and push your changes, including the tags `git push origin --tags`

## Versioning

We use [SemVer](http://semver.org/) for versioning.
