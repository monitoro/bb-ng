'use strict';

angular.module('bbNgApp', ['config', 'ngResource', 'ui.router', 'ui.date'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    // default route
    $urlRouterProvider.otherwise("/");

    // welcome/join route
    $stateProvider
      .state('default', {
        templateUrl: '/views/layout/default.html',
        controller: 'DefaultCtrl',
        abstract: true,
        onEnter: function() {
          setBodyClass("default-layout");
        }
      })
        .state('default.welcome', {
          url: '/',
          templateUrl: '/views/welcome.html',
          controller: 'WelcomeCtrl'
        })
        .state('default.join', {
          url: '/join',
          templateUrl: '/views/join.html',
          controller: 'JoinCtrl'
        });

    // main app route
    $stateProvider
      .state('app', {
        templateUrl: '/views/layout/app.html',
        controller: 'AppCtrl',
        abstract: true,
        onEnter: function() {
          setBodyClass("app-layout");
        }
      })
        // my
        .state('app.my', {
          url: '/app',
          templateUrl: '/views/app/my.html',
          controller: 'AppMyCtrl',
          abstract: true
        })
          .state('app.my.timeline', {
              url: '/timeline',
              templateUrl: '/views/app/my/timeline.html',
              controller: 'AppMyTimelineCtrl'
            })
        // group
        .state('app.group', {
          url: '/app/communities',
          templateUrl: '/views/app/group.html',
          controller: 'AppGroupCtrl',
          abstract: true
        })
          .state('app.group.item', {
            url: '/:community_id/items',
            templateUrl: '/views/app/group/items.html',
            controller: 'AppGroupItemCtrl'
          })
          .state('app.group.report', {
            url: '/:community_id/report',
            templateUrl: '/views/app/group/report.html',
            controller: 'AppGroupReportCtrl'
          })
          .state('app.group.calendar', {
            url: '/:community_id/calendar',
            templateUrl: '/views/app/group/calendar.html',
            controller: 'AppGroupCalendarCtrl'
          })
          .state('app.group.member', {
            url: '/:community_id/members',
            templateUrl: '/views/app/group/member.html',
            controller: 'AppGroupMemberCtrl'
          })
          .state('app.group.setting', {
            url: '/:community_id/setting',
            templateUrl: '/views/app/group/setting.html',
            controller: 'AppGroupSettingCtrl'
          })
          .state('app.group.timeline', {
            url: '/:community_id',
            templateUrl: '/views/app/group/timeline.html',
            controller: 'AppGroupTimelineCtrl'
          })

        // notification & setting
        .state('app.notification', {
          url: '/app/notifications',
          templateUrl: '/views/app/notification.html',
          controller: 'AppNotificationCtrl'
        })
        .state('app.setting', {
          url: '/app/setting',
          templateUrl: '/views/app/setting.html',
          controller: 'AppSettingCtrl'
        });
    
    $locationProvider.html5Mode(true).hashPrefix('!');

    // layout마다 {name}-layout class를 body에 넣어줌
    function setBodyClass(className) {
      var body = $("body");
      var classes = body.attr("class").split(" ");
      angular.forEach(classes, function(value){
        if(value.indexOf("-layout") > 0) {
          body.removeClass(value);
        }
      });
      body.addClass(className);
    }

    // for CORS
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // for token authentication
    $httpProvider.interceptors.push('tokenAuthFilter');
  });
