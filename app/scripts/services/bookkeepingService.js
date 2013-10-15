'use strict';

angular.module('bbNgApp')
  .factory('bookkeepingService', function ($resource, CONFIG) {
    return $resource('http://' + CONFIG["api_host"] + '/groups/:group_id/bookkeepings/:collection_action/:id/:member_action.json', {
      group_path: '@group_id',
      id: '@id'
    }, {
      update: {
        method: "PUT"
      },
      calculate: {
        method: "GET",
        params: {
          collection_action: "calculate"
        }
      }
    });
  });