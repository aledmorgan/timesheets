﻿'use strict';

angular.module('timesheetsApp.controllers')
    .controller('IndexController', ['$scope', 'timesheetService', function ($scope, timesheetService) {
        $scope.timesheets = [];
        $scope.loading = true;
        $scope.error = false;

        $scope.$on('$routeChangeSuccess', function () {
            $scope.init();
        })

        $scope.init = function () {
            $scope.loadTimesheets();
        }

        $scope.loadTimesheets = function () {
            var request = timesheetService.getTimesheets();
            request.then(function (response) {
                $scope.timesheets = response.data;
            }).catch(function (response) {
                $scope.error = true;
            }).finally(function () {
                $scope.loading = false;
            });
        }
    }]);
