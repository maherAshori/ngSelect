# ngSelect v1.0.3
Angular Select Options Directive [UI]

- nuget link : <a href="https://www.nuget.org/packages/ngSelect" target="_blank">ngSelect</a>

<h1>Release Note:</h1>
- Update css style
- Update disabled="disabled" to ng-disabled="true/false"
- Add result search length in the bottom
- Add "limit-to" for binding options data
- Handle some errors in the Css & Directive when use two or more ng-select in 1 page

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
- search-not-found: "string" [ex: Not Found]
- output: object parameters [in top example is: "name" OR "id", OR "value" OR "disc"]
- show-as: object parameters [in top example is: "name" OR "id", OR "value" OR "disc"]
- set-by-id: bool [this help you to set a default option by id] ex: $scope.selectMe = {id: 1};
- set-by-name: bool [this help you to set a default option by name] ex: $scope.selectMe = {name: "Css"}; [default is 'value']
- ng-disabled: bool [true, false]
- rtl: bool [support rtl mode for 'farsi' or 'arabic']
- limit-to: int [show 5 options or more; Note: search is including all of data]

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
search-not-found="not found!"
searchable="true">
</ng-select>
```
<hr>
<img src="http://cdn.persiangig.com/preview/V2n965rMt9/7.jpg">

<h5>search not found</h5>
<img src="http://cdn.persiangig.com/preview/PGDDgAWU1f/8.jpg">

<h1>Limit To</h1>
<h5>in your controller</h5>

```html
$scope.options = [
   { name: "Css", disc: "css", id: 1, value: "css" },
   { name: "Bootstrap", disc: "bootstrap", id: 2, value: "bootstrap" },
   { name: "PHP", disc: "php", id: 3, value: "php" },
   { name: "C#", disc: "c#", id: 3, value: "c#" },
   { name: "Angular", disc: "angular", id: 4, value: "angular" },
   { name: "WPF", disc: "wpf", id: 5, value: "wpf" },
   { name: "CakePHP", disc: "cakephp", id: 6, value: "cakephp" },
   { name: "LazyLoad", disc: "lazyLoad", id: 7, value: "lazyLoad" }
];
```
<h5>in your html</h5>

```html
<ng-select 
ng-model="selectMe"
options="options"
search-not-found="not found!"
limit-to='4'
searchable="true">
</ng-select>
```
<hr>
<img src="http://cdn.persiangig.com/preview/nvYddn4JO7/9.jpg">
