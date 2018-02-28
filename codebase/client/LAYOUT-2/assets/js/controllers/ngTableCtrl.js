'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */
var data = [{
    id: 1,
    name: "Batman",
    alias: "Bruce Wayne",
    publisher: "DC Comics",
    gender: "male",
    power: 37
}, {
    id: 2,
    name: "Superman",
    alias: "Clark Kent",
    publisher: "DC Comics",
    gender: "male",
    power: 94
}, {
    id: 3,
    name: "Catwoman",
    alias: "Selina Kyle",
    publisher: "DC Comics",
    gender: "female",
    power: 24
}, {
    id: 4,
    name: "Spider-Man",
    alias: "Peter Benjamin Parker",
    publisher: "Marvel Comics",
    gender: "male",
    power: 58
}, {
    id: 5,
    name: "Banshee",
    alias: "Sean Cassidy",
    publisher: "Marvel Comics",
    gender: "male",
    power: 60
}, {
    id: 6,
    name: "Black Mamba",
    alias: "Tanya Sealy",
    publisher: "Marvel Comics",
    gender: "female",
    power: 78
}, {
    id: 7,
    name: "Batgirl",
    alias: "Mary Elizabeth Kane",
    publisher: "DC Comics",
    gender: "female",
    power: 12
}, {
    id: 8,
    name: "Blade",
    alias: "Eric Brooks",
    publisher: "Marvel Comics",
    gender: "male",
    power: 33
}, {
    id: 9,
    name: "Captain America",
    alias: "Steven Grant Rogers",
    publisher: "Marvel Comics",
    gender: "male",
    power: 46
}, {
    id: 10,
    name: "Lex Luthor",
    alias: "Alexander 'Lex' Joseph Luthor",
    publisher: "DC Comics",
    gender: "male",
    power: 10
}, {
    id: 11,
    name: "Marvel Girl",
    alias: "Rachel Anne Summers",
    publisher: "Marvel Comics",
    gender: "female",
    power: 95
}, {
    id: 12,
    name: "Penguin",
    alias: "Oswald Chesterfield Cobblepot",
    publisher: "DC Comics",
    gender: "male",
    power: 30
}, {
    id: 13,
    name: "Rogue",
    alias: "Anna Marie",
    publisher: "Marvel Comics",
    gender: "female",
    power: 80
}];
app.controller('ngTableCtrl', ["$scope", "ngTableParams", function ($scope, ngTableParams) {
    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 5 // count per page
    }, {
        total: data.length, // length of data
        getData: function ($defer, params) {
            $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
}]);
app.controller('ngTableCtrl2', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {
    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 5, // count per page
        sorting: {
            name: 'asc' // initial sorting
        }
    }, {
        total: data.length, // length of data
        getData: function ($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
}]);
app.controller('ngTableCtrl3', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {
    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 5, // count per page
        filter: {
            name: 'M' // initial filter
        }
    }, {
        total: data.length, // length of data
        getData: function ($defer, params) {
            // use build-in angular filter
            var orderedData = params.filter() ? $filter('filter')(data, params.filter()) : data;
            $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
            params.total(orderedData.length);
            // set total for recalc pagination
            $defer.resolve($scope.users);
        }
    });
}]);
app.controller('ngTableCtrl4', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {
    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 10 // count per page

    }, {
        total: data.length, // length of data
        getData: function ($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

        }
    });
}]);
app.controller('ngTableCtrl5', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {
    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 10 // count per page
    }, {
        total: data.length, // length of data
        getData: function ($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
}]);
app.controller('ngTableCtrl6', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {
    var data = [{
		"id": 1,
		"itm": "Property Maintenance",
		"dor": "1 Jan,15",
		"pmt": "Yes",
		"prc": 2000,
		"std": "7 Jan,15",
		"end": "8 Feb,15",
		"sta": "Complete",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15" 
		}
	},{
		"id": 2,
		"itm": "Geriatric care",
		"dor": "3 Jun, 15",
		"pmt": "Yes",
		"prc": 5000,
		"std": "4 Jun,15",
		"end": "5 Jul,15",
		"sta": "Complete",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{
		"id": 3,
		"itm": "IT Returns filing",
		"dor": "5 Jan, 15",
		"pmt": "No",
		"prc": 6000,
		"std": "8 Jan,15",
		"end": "10 Mar,15",
		"sta": "In Progress",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{
		"id": 4,
		"itm": "PAN Card Application ",
		"dor": "9 Sep,15",
		"pmt": "No",
		"prc": 2000,
		"std": "10 Sep,15",
		"end": "12 Oct,15",
		"sta": "On Hold",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{
		"id": 5,
		"itm": "Airport pick up ",
		"dor": "11 Apr,15",
		"pmt": "Yes",
		"prc": 700,
		"std": "15 Apr,15",
		"end": "15 Apr,15",
		"sta": "Complete",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{
		"id": 6,
		"itm": "Hotel Accomodation ",
		"dor": "1 Jan,15",
		"pmt": "Yes",
		"prc": 6000,
		"std": "8 Jan,15",
		"end": "12 Jan,15",
		"sta": "Complete",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{
		"id": 7,
		"itm": "Property Maintenance",
		"dor": "10 Oct,15",
		"pmt": "No",
		"prc": 10000,
		"std": "15 Oct,15",
		"end": "15 Dec,15",
		"sta": "On Hold",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{
		"id": 8,
		"itm": "Fee payments",
		"dor": "19 Apr,15",
		"pmt": "Yes",
		"prc": 12000,
		"std": "25 Apr,15",
		"end": "25 Jun,15",
		"sta": "Complete",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{
		"id": 9,
		"itm": "Notarization",
		"dor": "11 Jan,15",
		"pmt": "No",
		"prc": 12000,
		"std": "18 Jan,15",
		"end": "18 Fec,15",
		"sta": "In Progress",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{
		"id": 10,
		"itm": "Medicine Delivery ",
		"dor": "1 Apr,15",
		"pmt": "No",
		"prc": 15000,
		"std": "1 Jan,15",
		"end": "1 Jan,16",
		"sta": "Complete",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{	
		"id": 11,
		"itm": "IT Returns filing",
		"dor": "1 Jan, 15",
		"pmt": "Yes",
		"prc": 10000,
		"std": "3 May,15",
		"end": "13 Aug,15",
		"sta": "Complete",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{
		"id": 12,
		"itm": "Emergency care",
		"dor": "10 Nov,15",
		"pmt": "No",
		"prc": 12000,
		"std": "12 Nov,15",
		"end": "12 Dec,15",
		"sta": "On Hold",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{
		"id": 13,
		"itm": "Renovation",
		"dor": "4 Sep,15",
		"pmt": "Yes",
		"prc": 25000,
		"std": "4 Sep,15",
		"end": "4 Nov,15",
		"sta": "Complete",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	},{
		"id": 14,
		"itm": "Interior Designing",
		"dor": "21 Dec,15",
		"pmt": "Yes",
		"prc": 12000,
		"std": "25 Dec,15",
		"end": "25 Jan,15",
		"sta": "Complete",
		"upd":{
			"desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
			"by"  : "Jeremy", 
			"on"  : "5 Feb,15"
		}
	}
	/*
	{
        "id": 1,
        "lm": 138661285100,
        "ln": "Smith",
        "fn": "John",
        "dc": "CEO",
        "em": "j.smith@company.com",
        "ph": "617-321-4567",
        "ac": true,
        "dl": false
    }, {
        "id": 2,
        "lm": 138661285200,
        "ln": "Taylor",
        "fn": "Lisa",
        "dc": "VP of Marketing",
        "em": "l.taylor@company.com",
        "ph": "617-522-5588",
        "ac": true,
        "dl": false
    }, {
        "id": 3,
        "lm": 138661285300,
        "ln": "Jones",
        "fn": "James",
        "dc": "VP of Sales",
        "em": "j.jones@company.com",
        "ph": "617-589-9977",
        "ac": true,
        "dl": false
    }, {
        "id": 4,
        "lm": 138661285400,
        "ln": "Wong",
        "fn": "Paul",
        "dc": "VP of Engineering",
        "em": "p.wong@company.com",
        "ph": "617-245-9785",
        "ac": true,
        "dl": false
    }, {
        "id": 5,
        "lm": 138661285500,
        "ln": "King",
        "fn": "Alice",
        "dc": "Architect",
        "em": "a.king@company.com",
        "ph": "617-244-1177",
        "ac": true,
        "dl": false
    }, {
        "id": 6,
        "lm": 138661285600,
        "ln": "Brown",
        "fn": "Jan",
        "dc": "Software Engineer",
        "em": "j.brown@company.com",
        "ph": "617-568-9863",
        "ac": true,
        "dl": false
    }, {
        "id": 7,
        "lm": 138661285700,
        "ln": "Garcia",
        "fn": "Ami",
        "dc": "Software Engineer",
        "em": "a.garcia@company.com",
        "ph": "617-327-9966",
        "ac": true,
        "dl": false
    }, {
        "id": 8,
        "lm": 138661285800,
        "ln": "Green",
        "fn": "Jack",
        "dc": "Software Engineer",
        "em": "j.green@company.com",
        "ph": "617-565-9966",
        "ac": true,
        "dl": false
    }, {
        "id": 9,
        "lm": 138661285900,
        "ln": "Liesen",
        "fn": "Abraham",
        "dc": "Plumber",
        "em": "a.liesen@company.com",
        "ph": "617-523-4468",
        "ac": true,
        "dl": false
    }, {
        "id": 10,
        "lm": 138661286000,
        "ln": "Bower",
        "fn": "Angela",
        "dc": "Product Manager",
        "em": "a.bower@company.com",
        "ph": "617-877-3434",
        "ac": true,
        "dl": false
    }, {
        "id": 11,
        "lm": 138661286100,
        "ln": "Davidoff",
        "fn": "Fjodor",
        "dc": "Database Admin",
        "em": "f.davidoff@company.com",
        "ph": "617-446-9999",
        "ac": true,
        "dl": false
    }, {
        "id": 12,
        "lm": 138661286200,
        "ln": "Vitrovic",
        "fn": "Biljana",
        "dc": "Director of Communications",
        "em": "b.vitrovic@company.com",
        "ph": "617-111-1111",
        "ac": true,
        "dl": false
    }, {
        "id": 13,
        "lm": 138661286300,
        "ln": "Valet",
        "fn": "Guillaume",
        "dc": "Software Engineer",
        "em": "g.valet@company.com",
        "ph": "617-565-4412",
        "ac": true,
        "dl": false
    }, {
        "id": 14,
        "lm": 138661286400,
        "ln": "Tran",
        "fn": "Min",
        "dc": "Gui Designer",
        "em": "m.tran@company.com",
        "ph": "617-866-2554",
        "ac": true,
        "dl": false
    }*/];
    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10
    }, {
        total: data.length,
        getData: function ($defer, params) {
            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.editId = -1;

    $scope.setEditId = function (pid) {
        $scope.editId = pid;
    };
}]);
