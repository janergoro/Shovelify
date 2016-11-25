var OneMeal = angular.module('starter', ['ionic', 'ngStorage', 'ngCordova'])
var serverSideUrl = "http://onemeal.azurewebsites.net/";

OneMeal.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

OneMeal.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        });
        //.state('logout', {
        //    url: '/logout',
        //    templateUrl: 'templates/logout.html',
        //    controller: 'LogoutController'
        //})
        //.state('mainscreen', {
        //    url: '/mainscreen',
        //    templateUrl: 'templates/mainscreen.html',
        //    controller: 'MainScreenController'
        //})
        //.state('post', {
        //    url: '/post',
        //    templateUrl: 'templates/post.html',
        //    controller: 'DateTimePickerControl'
        //})
        //.state('myprofile', {
        //    url: '/myprofile',
        //    templateUrl: 'templates/myprofile.html',
        //    controller: 'MyProfileController'
        //})
        //.state('history', {
        //    url: '/history',
        //    templateUrl: 'templates/history.html',
        //    controller: 'MyHistoryController'
        //})
        //.state('profile', {
        //    url: '/profile/:UserID/:MealID/:ProfileState',
        //    templateUrl: 'templates/profile.html',
        //    controller: 'ProfileController'
        //});
    $urlRouterProvider.otherwise('/login');
});

OneMeal.controller("LoginController", function ($scope, $cordovaOauth, $localStorage, $location, $http) {
    if ($localStorage.hasOwnProperty("accessToken") === true && $localStorage.hasOwnProperty("userId") === true)
        $location.path("/mainscreen");
    $scope.login = function () {
        $cordovaOauth.facebook("248927015523725", ["public_profile", "email"]).then(function (result) {
            $localStorage.accessToken = result.access_token;
            $http.get("https://graph.facebook.com/v2.0/me", { params: { access_token: $localStorage.accessToken, fields: "id,first_name,last_name,work,birthday", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;
                $localStorage.userId = $scope.profileData.id;
                var data = {
                    FaceBookUniqueId: $scope.profileData.id,
                    PhoneNo: "+37256830123",//$scope.profileData.mobile_phone,
                    Email: $scope.profileData.email,
                    FirstName: $scope.profileData.first_name,
                    LastName: $scope.profileData.last_name,
                    Token: $localStorage.acessToken
                };
                alert(data.PhoneNo);
                alert(data.Email);
                $http.post(serverSideUrl + 'api/FacebookProfile', data).
                    then(function (response){
                        $location.path("/mainscreen");             
                    });
            }, function(error) {
                alert("There was a problem getting your profile.");
                console.log(error);
            });         
        }, function(error) {
            alert(error);
            console.log(error);
        });
    };

});