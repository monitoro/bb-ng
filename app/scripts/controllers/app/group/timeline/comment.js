'use strict';

angular.module('bbNgApp')
  .controller('AppGroupTimelineCommentCtrl', function ($scope, $state, CommentService) {

    $scope.bookkeeping_comments = CommentService.get({
      group_id: $state.params.group_id,
      commentable_type: 'bookkeepings',
      commentable_id: $scope.bookkeeping.id,
    });

    $scope.more = function(next){
      $scope.busy = true;
      CommentService.get({
        group_id: $state.params.group_id,
        commentable_type: 'bookkeepings',
        commentable_id: $scope.bookkeeping.id,
        next: next,
      }, function(data){
        angular.forEach(data.comments, function(value, key){
          $scope.bookkeeping_comments.comments.unshift(value);
        });
        $scope.bookkeeping_comments.next = data.next;
        $scope.busy = false;
      });
    }

    function initForm() {
      $scope.newComment = {};
      $scope.commentForm.$setPristine();
      $scope.commentForm.submitted = false;
    }

    $scope.addComment = function() {
      $scope.busy = true;
      if($scope.commentForm.$valid) {
        CommentService.save({
          group_id: $state.params.group_id,
          commentable_type: 'bookkeepings',
          commentable_id: $scope.bookkeeping.id,
          comment: $scope.newComment
        }, function(data) {
          $scope.bookkeeping_comments.comments.push(data);
          initForm();
          $scope.busy = false;
        });
      } else {
        $scope.commentForm.submitted = true;
      }
    };

    $scope.removeComment = function(comment) {
      if(confirm("Are you sure?")) {
        CommentService.remove({
          group_id: $state.params.group_id,
          commentable_type: 'bookkeepings',
          commentable_id: $scope.bookkeeping.id,
          comment_id: comment.id
        }, function(data) {
          var idx = $scope.bookkeeping_comments.comments.indexOf(comment);
          $scope.bookkeeping_comments.comments.splice(idx, 1);
        });
      }
    };
  });
