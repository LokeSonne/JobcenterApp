angular.module('jobcenterapp.directives')
		.directive('rotateOnClick', ['$animate', '$timeout', function($animate, $timeout) {
			return {
				restrict: 'A',
				link: function(scope, elem, attrs){
					elem.bind('click', function(){
						if(elem.hasClass('rotate') === false){
							elem.addClass('rotate');
							$timeout(function(){
								elem.removeClass('rotate');
							}, 6000)
						}
						else{
							return false;
						}
					});
				}
			};
		}]);