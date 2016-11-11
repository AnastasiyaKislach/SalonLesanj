(function () {

    'use strict';

    angular
		.module('app')
		.directive('compareTo', compareTo);

    function compareTo() {
        return {
            require: "ngModel",
            scope:
			{
			    confirmPassword: "=compareTo"
			},
            link: function (scope, element, attributes, modelVal) {
                modelVal.$validators.compareTo = function (val) {
                    return val == scope.confirmPassword;
                };
                scope.$watch("confirmPassword", function () {
                    modelVal.$validate();
                });
            }
        };
    }

})();