var app = angular.module("ngSelect", []);

app.directive("ngSelect", ["$filter", function ($filter) {
    return {
        restrict: "E",
        require: "^ngModel",
        replace: true,
        scope: {
            options: "=",
            searchable: "=",
            setByName: "=",
            setById: "=",
            ngDisabled: "=",
            showAs: "@",
            output: "@",
            rtl: "@",
            searchNotFound: "@",
            limitTo: "@"
        },
        template: "<div off-click=\"closeAllSelects()\" class=\"select-bootstrap-form {{ngDisabled ? 'disabled':''}}\" ng-class=\"{'rtl': rtl}\">{{isOpen}}<span ng-bind=\"defaultValue[showAs]\" ng-click=\"proccess()\"></span><i class=\"glyphicon glyphicon-menu-down\"></i>" +
            "<ul>" +
            "<li ng-show=\"searchable\"><input type=\"text\"\" ng-model=\"searching\"><i class=\"glyphicon glyphicon-search\"></i><i class=\"glyphicon glyphicon-remove-circle\" ng-class=\"{'active':searching}\" ng-click=\"removeSearch()\"></i></li>" +
            "<li ng-repeat=\"option in filtered = (options | filter: searching ) | limitTo: limitTo \" ng-click=\"setValue(option)\">{{option[showAs]}}<i class=\"glyphicon glyphicon-pushpin\" ng-class=\"{'active': option.active}\"></i></li>" +
            "<li ng-if=\"filtered.length === 0\">{{searchNotFound}}</li>" +
            "<li class=\"result\" ng-if=\"searching\"><small>{{filtered.length}}</small></li>" +
            "</ul>" +
            "</div>",
        link: function (scope, element, attrs, ngModel) {
            scope.searchResults = [];

            scope.closeAllSelects = function () {
                element.removeClass("open");
            }

            scope.proccess = function () {
                jQuery(".select-bootstrap-form").removeClass("open");
                element.addClass("open");
                scope.searching = "";
                scope.focus = true;
                element.find("input").focus();
            }

            scope.removeSearch = function () {
                scope.searching = "";
                element.find("input").focus();
            }

            if (angular.isUndefined(scope.showAs)) {
                scope.showAs = "name";
            }

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
                } else {
                    scope.defaultValue = scope.options[0];
                    scope.options[0].active = true;

                    if (!angular.isUndefined(scope.output)) {
                        ngModel.$setViewValue(scope.options[0][scope.output]);
                    } else {
                        ngModel.$setViewValue(scope.options[0]);
                    }
                }
            }

            angular.forEach(scope.options, function (item) {
                item.active = false;
            });

            scope.setValue = function (option) {
                angular.forEach(scope.options, function (item) {
                    item.active = false;
                });

                scope.defaultValue = option;
                option.active = true;

                if (!angular.isUndefined(scope.output)) {
                    ngModel.$setViewValue(option[scope.output]);
                } else {
                    ngModel.$setViewValue(option);
                }

                element.removeClass("open");
            }
        }
    }
}]);

app.directive('offClick', ['$rootScope', '$parse', function ($rootScope, $parse) {
        var id = 0;
        var listeners = {};
        // add variable to detect touch users moving..
        var touchMove = false;

        // Add event listeners to handle various events. Destop will ignore touch events
        document.addEventListener("touchmove", offClickEventHandler, true);
        document.addEventListener("touchend", offClickEventHandler, true);
        document.addEventListener('click', offClickEventHandler, true);

        function targetInFilter(target, elms) {
            if (!target || !elms) return false;
            var elmsLen = elms.length;
            for (var i = 0; i < elmsLen; ++i) {
                var currentElem = elms[i];
                var containsTarget = false;
                try {
                    containsTarget = currentElem.contains(target);
                } catch (e) {
                    // If the node is not an Element (e.g., an SVGElement) node.contains() throws Exception in IE,
                    // see https://connect.microsoft.com/IE/feedback/details/780874/node-contains-is-incorrect
                    // In this case we use compareDocumentPosition() instead.
                    if (typeof currentElem.compareDocumentPosition !== 'undefined') {
                        containsTarget = currentElem === target || Boolean(currentElem.compareDocumentPosition(target) & 16);
                    }
                }

                if (containsTarget) {
                    return true;
                }
            }
            return false;
        }

        function offClickEventHandler(event) {
            // If event is a touchmove adjust touchMove state
            if (event.type === 'touchmove') {
                touchMove = true;
                // And end function
                return false;
            }
            // This will always fire on the touchend after the touchmove runs...
            if (touchMove) {
                // Reset touchmove to false
                touchMove = false;
                // And end function
                return false;
            }
            var target = event.target || event.srcElement;
            angular.forEach(listeners, function (listener, i) {
                if (!(listener.elm.contains(target) || targetInFilter(target, listener.offClickFilter))) {
                    $rootScope.$evalAsync(function () {
                        listener.cb(listener.scope, {
                            $event: event
                        });
                    })
                }

            });
        }

        return {
            restrict: 'A',
            compile: function ($element, attr) {
                var fn = $parse(attr.offClick);
                return function (scope, element) {
                    var elmId = id++;
                    var offClickFilter;
                    var removeWatcher;

                    offClickFilter = document.querySelectorAll(scope.$eval(attr.offClickFilter));

                    if (attr.offClickIf) {
                        removeWatcher = $rootScope.$watch(function () {
                            return $parse(attr.offClickIf)(scope);
                        }, function (newVal) {
                            if (newVal) {
                                on();
                            } else if (!newVal) {
                                off();
                            }
                        });
                    } else {
                        on();
                    }

                    attr.$observe('offClickFilter', function (value) {
                        offClickFilter = document.querySelectorAll(scope.$eval(value));
                    });

                    scope.$on('$destroy', function () {
                        off();
                        if (removeWatcher) {
                            removeWatcher();
                        }
                    });

                    function on() {
                        listeners[elmId] = {
                            elm: element[0],
                            cb: fn,
                            scope: scope,
                            offClickFilter: offClickFilter
                        };
                    }

                    function off() {
                        delete listeners[elmId];
                    }
                };
            }
        };
    }]);
