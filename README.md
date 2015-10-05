# ngSelect
Angular Select Options Directive [UI]

<h1></h1>
```html
<ng-select ng-model="selectMe"></ng-select>
```

<h1>settings</h1>

- options: array ex: 
   $scope.options = [
      { name: "Css", id: 1, value: "css" },
      { name: "Bootstrap", id: 2, value: "bootstrap" },
      { name: "PHP", id: 3, value: "php" }
    ];
- searchable: bool [true, false]
- output: object parameters [in top example is: "name" OR "id", OR "value"]
- set-by-id: bool [this help you to set a default option by id] ex: $scope.selectMe = {id: 1};
- set-by-name: bool [this help you to set a default option by name] ex: $scope.selectMe = {name: "Css"}; [default is 'value']

<h1>default option is first one</h1>
OR you can set by value as default $scope.selectMe = {value: "php"};
```html
<ng-select ng-model="selectMe" options="options"></ng-select>
```
Output is 'object' >> { name: "PHP", id: 3, value: "php", active: true }

<img src="http://cdn.persiangig.com/preview/lUhS6OSy5o/1.jpg">

<h1>default option set by id</h1>
$scope.selectMe = {id: 3};
```html
<ng-select 
ng-model="selectMe"
options="items"
searchable="true"
output="name"
set-by-id="true">
</ng-select>
```
Output is 'name' >> "PHP"

<h1>default option set by name</h1>
$scope.selectMe = {name: "PHP"};
```html
<ng-select 
ng-model="selectMe"
options="items"
searchable="true"
output="value"
set-by-name="true">
</ng-select>
```
Output is 'value' >> "php"


