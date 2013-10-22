'use strict';

angular.module('bbNgApp')
  .controller('AppSettingCtrl', function ($scope, $timeout, LoginInfo, UserService) {
    function initForm() {
      $scope.user = angular.copy(LoginInfo.currentUser);
      $scope.userForm.$setPristine();
      $scope.userForm.submitted = false;
    }

    $scope.user = angular.copy(LoginInfo.currentUser);
    $scope.userFormSubmit = function() {
      if($scope.userForm.$valid) {
        UserService.update({ user:$scope.user }, function(data) {
          LoginInfo.setUserInfo(data);
          initForm();
          $timeout(function() { // alert때문에 $scope 반영이 안되서 timeout으로 뺌!
            alert("프로필 정보를 수정하였습니다.");
          }, 0);
        }, function(response) {
          angular.forEach(response.data.errors, function(value, key) {
            alert(key + " " + value);
            return;
          });
        });
      } else {
        $scope.userForm.submitted = true;
      }
    }
  });
