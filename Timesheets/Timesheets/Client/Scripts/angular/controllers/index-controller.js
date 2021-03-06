﻿'use strict';

angular.module('timesheetsApp.controllers')
    .controller('IndexController', ['$scope', '$location', 'timesheetService', function ($scope, $location, timesheetService) {
        $scope.timesheets = [];
        $scope.loading = false;
        $scope.error = false;
        $scope.searched = false;
        $scope.deleteSuccess = false;
        $scope.deleteError = false;

        $scope.candidateName = $location.search().candidateName;
        $scope.clientName = $location.search().clientName;
        $scope.dateFrom = $location.search().dateFrom;
        $scope.dateTo = $location.search().dateTo;

        $scope.$on('$routeChangeSuccess', function () {
            $scope.init();
        });

        $scope.init = function () {
            if ($scope.candidateName !== undefined || $scope.clientName !== undefined || $scope.dateFrom !== undefined || $scope.dateTo !== undefined) {
                $scope.search(true);
            }
        }

        $scope.resetStatusFlags = function () {
            $scope.deleteSuccess = false;
            $scope.deleteError = false;
            $scope.error = false;
        }

        $scope.getFormattedDate = function (date) {
            return moment(date).format("DD/MM/YYYY");
        }

        $scope.search = function (valid) {
            if (valid) {
                $scope.resetStatusFlags();
                $scope.loading = true;

                var requestObject = { CandidateName: $scope.candidateName, ClientName: $scope.clientName, From: ukFormattedMoment($scope.dateFrom), To: ukFormattedMoment($scope.dateTo) };
                var request = timesheetService.searchTimesheets(requestObject);
                request.then(function (response) {
                    $scope.timesheets = response.data;
                    $scope.searched = true;
                }).catch(function (response) {
                    $scope.error = true;
                }).finally(function () {
                    $scope.loading = false;
                });
            }
        }

        $scope.deleteTimesheets = function () {
            $scope.resetStatusFlags();
            var answer = confirm('Are you sure you want to delete these timesheets?');

            if (answer) {
                var ids = [];

                $scope.timesheets.forEach(function (timesheet) {
                    ids.push(timesheet.Id);
                });

                var request = timesheetService.deleteTimesheets(ids);
                request.then(function (response) {
                    $scope.timesheets = [];
                    $scope.deleteSuccess = true;
                }).catch(function (response) {
                    $scope.deleteError = true;
                }).finally(function (response) {

                });
            }
        }
    }]);
