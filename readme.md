[![npm version](https://badge.fury.io/js/%40wartoshika%2Fwow-classic-declarations.svg)](https://badge.fury.io/js/%40wartoshika%2Fwow-classic-declarations)
[![Build Status](https://travis-ci.org/wartoshika/wow-classic-declarations.svg?branch=master)](https://travis-ci.org/wartoshika/wow-classic-declarations)

# Typescript declarations for the current live World of Warcraft LUA API

> WoW Retail developers should use the [wow-declarations](https://github.com/wartoshika/wow-declarations) repository.

**Supported transpilers for LUA targets**:
- qhun-transpiler ([GitHub-Page](https://github.com/wartoshika/qhun-transpiler))
- TypescriptToLua ([GitHub-Page](https://github.com/TypeScriptToLua/TypeScriptToLua)) - *Thanks to tstirrat*

## Setup

Installing this dependency via

- `$ npm install @wartoshika/wow-declarations@1.13.3-release.1` (npm repository installation)
- `$ npm install wartoshika/wow-declarations#v1.13.3-release.1` (github repository installation)

> I strongly recommend to use a version tag when using github based install. Referencing the master branch can result in installing a breaking change. Github based installations need a prefixing `v` in the version number!

Please add the wow-declarations path to your `tsconfig.json` compiler options like below:

```js
{
    "compilerOptions": {
        // ...
        "typeRoots": [
            "./node_modules/@types",
            "./node_modules/@wartoshika/wow-classic-declarations"
        ]
    }
}
```

## Changes

### **Sat. 08 2020 - v1.13.3-release.1**

Release of the first version for wow classic. This repository is created to support removed functions in retail 8.3 and should be used when targeting classic environment.

## Contribution

If you want to contribute, please provide a pull request and ensure that you linted your changes with `npm run lint` or try to autofix the errors with `npm run lint:fix`. I appreciate your help!
