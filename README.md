# ngSelect
Angular Select Options Directive [UI]

- nuget link : <a href="https://www.nuget.org/packages/ngSelect" target="_blank">ngSelect</a>

<h1>Start</h1>
- add js & css files
- inject "ngSelect" in your app module
- use ng-select element in your html

```html
var app = angular.module("app", ["ngSelect"]);
```

<h1>ngSelect</h1>
```html
<ng-select ng-model="selectMe"></ng-select>
```

<h1>settings</h1>

- options: array ex: 
```html
   $scope.options = [
      { name: "Css", disc: "somthing about css", id: 1, value: "css" },
      { name: "Bootstrap", disc: "somthing about bootstrap", id: 2, value: "bootstrap" },
      { name: "PHP", disc: "somthing about php", id: 3, value: "php" }
    ];
```
- searchable: bool [true, false]
- output: object parameters [in top example is: "name" OR "id", OR "value" OR "disc"]
- show-as: object parameters [in top example is: "name" OR "id", OR "value" OR "disc"]
- set-by-id: bool [this help you to set a default option by id] ex: $scope.selectMe = {id: 1};
- set-by-name: bool [this help you to set a default option by name] ex: $scope.selectMe = {name: "Css"}; [default is 'value']
- disabled: "disabled"
- rtl: bool [support rtl mode for 'farsi' or 'arabic']

<h1>default option is first one</h1>
OR you can set by value as default $scope.selectMe = {value: "bootstrap"};
```html
<ng-select ng-model="selectMe" options="options"></ng-select>
```
Output is 'object' >> { name: "Bootstrap", id: 2, value: "bootstrap" }
<hr>
<img src="http://cdn.persiangig.com/preview/lUhS6OSy5o/1.jpg">

<h1>default option set by id</h1>
$scope.selectMe = {id: 2};
```html
<ng-select 
ng-model="selectMe"
options="options"
set-by-id="true"
show-as="disc"
output="name">
</ng-select>
```
Output is 'name' >> "Bootstrap"
<hr>
<img src="http://cdn.persiangig.com/preview/8bRKrVWw2V/2.jpg">

<h1>default option set by name</h1>
$scope.selectMe = {name: "Bootstrap"};
```html
<ng-select 
ng-model="selectMe"
options="options"
output="id"
set-by-name="true">
</ng-select>
```
Output is 'id' >> "2"
<hr>
<img src="http://cdn.persiangig.com/preview/FMJbQ8ENbZ/3.jpg">

<h1>Searchable</h1>
```html
<ng-select 
ng-model="selectMe"
options="options"
searchable="true">
</ng-select>
```
<hr>
<img src="http://cdn.persiangig.com/preview/4TLA1eRwLO/4.jpg">
