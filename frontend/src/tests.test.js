const { default: TestRunner } = require('jest-runner');


/* Test to check if the stats are returned and handled correctly in the 
admin dashboard. It's supposed to order months backward based on number. For
example, 8 should come before 7. However 1 should come before 12, since when
we get to the next year we want to compare January to last December. The API
always returns data for 2 months only */
test('must sort orders by month (_id), 1 must come after 12', () => {
    // Sorting function to test
    function compare (a, b) {
        if(a._id < b._id) {
          if(a._id === 1 && b._id === 12) return -1
          return 1
        } else if(a._id > b._id) {
          if(a._id === 12 && b._id === 1) return 1
          return -1
        } else {
          return 0
        }       
    }
    
    // Hypothetical data returned from the API
    const ordersData = [
        {
            _id: 1,
            total: 5
        },
        {
            _id: 12,
            total: 12
        }
    ]
    const reorderedOrdersData = [
        {
            _id: 12,
            total: 12
        },
        {
            _id: 1,
            total: 5
        },
    ]

    const actualOrdersData = [{"_id":7,"total":14},{"_id":8,"total":2}];
    const reorderedActualOrdersData = [{"_id":8,"total":2},{"_id":7,"total":14}];

    // Tests
    expect(ordersData.sort(compare)).toEqual([{"_id": 1, "total": 5}, {"_id": 12, "total": 12}]);
    expect(reorderedOrdersData.sort(compare)).toEqual([{"_id": 1, "total": 5}, {"_id": 12, "total": 12}]);
    expect(actualOrdersData.sort(compare)).toEqual([{"_id":8,"total":2},{"_id":7,"total":14}]);
    expect(reorderedActualOrdersData.sort(compare)).toEqual([{"_id":8,"total":2},{"_id":7,"total":14}]);
})

/* Test to check if the data returned from the api for the admin summary chart
is handled and displayed correctly. We receive orders data for the last week
containing an _id that represents a week day, a date and an amount. The point is 
to order this data by day to display on the chart. */
test('must sort array of orders by week day', () => {
    // The main function being tested
    function compare (a, b) {
        if(a.date < b.date) {
          return -1
        } else if(a.date > b.date) {
          return 1
        } else {
          return 0
        }  
    }

    // Function to map the orders in the array to a string representing a week day
    function mapData (array) {
        const mappedArray = array.map((item) => {
            const DAYS = [
                "Sun", // 1 - 0
                "Mon", // 2 - 1
                "Tue", // 3 - 2
                "Wed", // 4 - 3
                "Thu", // 5 - 4
                "Fri", // 6 - 5
                "Sat", // 7 - 6
            ];

            return {
                day: DAYS[item._id - 1],
                amount: item.total / 100
            }
        })
        return mappedArray;
    }

    // Representation of data received from the API
    const dummyDataOne = [{"_id":3,"date":"2022-08-16T08:41:45.844Z","total":101900},{"_id":2,"date":"2022-08-15T12:02:45.732Z","total":111700},{"_id":5,"date":"2022-08-18T15:58:53.926Z","total":3000},{"_id":4,"date":"2022-08-17T16:05:45.910Z","total":5900}];
    const dummyDataTwo = [{"_id":6,"date":"2022-08-19T12:02:45.732Z","total":111700},{"_id":1,"date":"2022-08-14T08:41:45.844Z","total":101900},{"_id":7,"date":"2022-08-20T15:58:53.926Z","total":3000}];
    const dummyDataThree = [{"_id":6,"date":"2022-08-19T12:02:45.732Z","total":111700},{"_id":7,"date":"2022-08-20T15:58:53.926Z","total":3000},{"_id":1,"date":"2022-08-14T08:41:45.844Z","total":101900}];
    
    // Sorting the data
    dummyDataOne.sort(compare);
    dummyDataTwo.sort(compare);
    dummyDataThree.sort(compare);

    // Mapping the arrays
    const newDummyDataOne = mapData(dummyDataOne);
    const newDummyDataTwo = mapData(dummyDataTwo);
    const newDummyDataThree = mapData(dummyDataThree);

    // Tests
    expect(newDummyDataOne).toEqual([{"amount":1117,"day":"Mon"},{"amount":1019,"day":"Tue"},{"amount":59,"day":"Wed"},{"amount":30,"day":"Thu"}]);
    expect(newDummyDataTwo).toEqual([{"amount":1019,"day":"Sun"},{"amount":1117,"day":"Fri"},{"amount":30,"day":"Sat"}]);
    expect(newDummyDataThree).toEqual([{"amount":1019,"day":"Sun"},{"amount":1117,"day":"Fri"},{"amount":30,"day":"Sat"}]);

})