var OneMeal = angular.module('starter', ['ionic', 'ngStorage', 'ngCordova'])
var serverSideUrl = "http://swapswip.azurewebsites.net/";

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
        })
        .state('product', {
            url: '/product',
            templateUrl: 'templates/product.html',
            controller: 'ProductController'
        })
        .state('items', {
            url: '/items',
            templateUrl: 'templates/items.html',
            controller: 'ItemsController'
        })
        .state('swipe', {
            url: '/swipe',
            templateUrl: 'templates/swipe.html',
            controller: 'SwipeController'
        });
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
    if ($localStorage.hasOwnProperty("accessToken") === false && $localStorage.hasOwnProperty("userId") === true)
        $location.path("/product");
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
                //$location.path("/product");
                $http.post(serverSideUrl + 'api/Users', data).
                    then(function (response){
                        $location.path("/product");             
                    });
            }, function(error) {
                //alert("There was a problem getting your profile.");
                //console.log(error);
                $location.path("/product");
            });         
        }, function(error) {
            alert(error);
            console.log(error);
        });
    };

});

OneMeal.controller("ProductController", function ($scope, $cordovaOauth, $localStorage, $location, $http) {

    $scope.init = function () {
        if (true) {
            $scope.my = { Name: '', Type: ''}
            $scope.Save = function () {
                var pictureData = document.getElementById("imagedata").innerHTML;
                var data = {
                    Description: $scope.my.Name,
                    Value: $scope.my.Type,
                    DealType: 0,
                    PictureData:pictureData
                };
                $http.post(serverSideUrl + 'api/Items', data).
                    then(function (response) {
                        $location.path("/product");
                    });
            }

        } else {
            alert("Not signed in");
            $location.path("/index");
        }
    };

    if (!$localStorage.hasOwnProperty("accessToken") || !$localStorage.hasOwnProperty("userId"))
        $location.path("/index");
    cordova.plugins.diagnostic.requestCameraAuthorization(function (status) {
        console.log("Authorization request for camera use was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
    }, function (error) {
        console.error(error);
    });
    $scope.addImage = function () {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });
    };
    

});
function onSuccess(imageData) {
    var image = document.getElementById('currentImage');
    image.src = "data:image/jpeg;base64," + imageData;
    document.getElementById("imagedata").innerHTML = imageData;
}
function onFail(message) {
    alert('Failed because: ' + message);
}

OneMeal.controller("ItemsController", function ($scope, $cordovaOauth, $localStorage, $location, $http) {
    $scope.init = function () {
        if (true) {
            $scope.newItem = function () {
                $location.path("/product");
            };
            $http.get(serverSideUrl + "api/myitems/" + $localStorage.userId).then(function (response) {
                $scope.myItems = response.data;
            });
            

        } else {
            alert("Not signed in");
            $location.path("/index");
        }
    };
    if (!$localStorage.hasOwnProperty("accessToken") || !$localStorage.hasOwnProperty("userId"))
        $location.path("/index");
    $scope.openItem(id) = function (id) {
        alert(id);
    }

});
OneMeal.controller("SwipeController", function ($scope, $cordovaOauth, $localStorage, $location, $http) {
    if (!$localStorage.hasOwnProperty("accessToken") || !$localStorage.hasOwnProperty("userId"))
        $location.path("/index");
    

});