var app = angular.module("ngSelect", []);

app.directive("ngSelect", ["$filter", function ($filter) {
    return {
        restrict: "E",
        require: "^ngModel",
        scope: {
            options: "=",
            searchable: "=",
            setByName: "=",
            setById: "=",
            output: "@"
        },
        template: "<div class=\"select-bootstrap-form\"><span ng-bind=\"defaultValue\"></span>" +
            "<ul>" +
            "<li ng-show=\"searchable\"><input type=\"text\" ng-model=\"searching\"><i class=\"glyphicon glyphicon-search\"></i></li>" +
            "<li ng-repeat=\"option in options | filter: {name: searching} \" ng-click=\"setValue(option)\">{{option.name}}<i class=\"glyphicon glyphicon-pushpin\" ng-class=\"{'active': option.active}\"></i></li>" +
            "</ul>" +
            "</div>",
        link: function (scope, element, attrs, ngModel) {
            scope.searchResults = [];

            element.hover(function () {
                element.find("input").select();
            });

            ngModel.$render = function () {
                var actualValue = ngModel.$modelValue;
                if (!angular.isUndefined(actualValue)) {
                    var findOption;
                    if (scope.setByName) {
                        findOption = $filter("filter")(scope.options, { name: actualValue.name }, true)[0];
                        if (!angular.isUndefined(findOption)) {
                            scope.setValue(findOption);
                        } else {
                            console.error("[" + actualValue.name + "] as name, not found in the options");
                        }
                    } else {
                        findOption = $filter("filter")(scope.options, { value: actualValue.value }, true)[0];
                        if (!angular.isUndefined(findOption)) {
                            scope.setValue(findOption);
                        } else {
                            console.error("[" + actualValue.value + "] as value, not found in the options");
                        }
                    }

                    if (scope.setById) {
                        findOption = $filter("filter")(scope.options, { id: actualValue.id }, true)[0];
                        if (!angular.isUndefined(findOption)) {
                            scope.setValue(findOption);
                        } else {
                            console.error("[" + actualValue.id + "] as id, not found in the options");
                        }
                    }
                }
            }

            angular.forEach(scope.options, function (item) {
                item.active = false;
            });

            scope.defaultValue = scope.options[0].name;
            scope.options[0].active = true;

            scope.setValue = function (option) {
                angular.forEach(scope.options, function (item) {
                    item.active = false;
                });

                scope.defaultValue = option.name;
                option.active = true;

                if (!angular.isUndefined(scope.output)) {
                    ngModel.$setViewValue(option[scope.output]);
                } else {
                    ngModel.$setViewValue(option);
                }

            }
        }
    }
}]);
