/*global define,describe,it,beforeEach,expect,inject,jasmine,waitsFor,runs*/

(function() {
    'use strict';

    describe('Directive: treeView', function () {

        var $compile,
            $rootScope,
            $scope,
            $treeFactory,
            element;

        beforeEach(module('ngTree'));

        beforeEach(inject(function($injector) {
            $compile = $injector.get('$compile');
            $treeFactory = $injector.get('$treeFactory');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();

            $scope.testTree = $treeFactory({
                children: [
                    {
                        name: 'dupuis',
                        collapsed: false,
                        children: [
                            {
                                name: 'prunelle',
                                children: [
                                    {
                                        name: 'lebrac',
                                        job: 'designer'
                                    },
                                    {
                                        name: 'lagaffe',
                                        firstname: 'gaston',
                                        job: 'sleeper'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            element = $compile('<tree-view tree="testTree"></tree-view>')($scope);
            $scope.$digest();
        }));

        it('should generate the good view', function() {
            var rootUl = element.find('ul');
            expect(rootUl.hasClass('tree')).toBe(true);
            expect(rootUl.find('tree-child-view').length).toBe(3);
            expect(rootUl.find('tree-view').length).toBe(1);

            var dupuisLi = rootUl.find('tree-child-view').eq(0).find('li');
            expect(dupuisLi.hasClass('collapsed')).toBe(false);
            expect(dupuisLi.find('a').hasClass('name'));
            expect(dupuisLi.find('a').html()).toBe('dupuis');
            expect(dupuisLi.find('tree-view').length).toBe(1);

            var dupuisUl = dupuisLi.find('tree-view').eq(0).find('ul');
            expect(dupuisUl.hasClass('tree')).toBe(true);
            expect(dupuisUl.find('tree-child-view').length).toBe(1);

            var prunelleLi = dupuisUl.find('tree-child-view').eq(0).find('li');
            expect(prunelleLi.hasClass('collapsed')).toBe(true);
            expect(prunelleLi.find('tree-view').length).toBe(0);
        });
    });
}());
