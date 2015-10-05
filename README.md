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
