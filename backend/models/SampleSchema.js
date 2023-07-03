// EVENT

// owner/user ID ref
// name
// array of dates
// start time
// end time
// timestamps


// SCHEDULE
// event id ref

// DAILY SCHEDULE
// active: { type: Boolean, default: false }

{
    "_id" : objectid,
    "username" : "test",
    "schedule" : [
        "2023-04-10" : {
            "_id" : objectid,
            "9:00 AM" : true,
            "9:30 AM" : true,
            "10:00 AM" : false,
            "10:30 AM" : false,
            "11:00 AM" : false,
            "11:30 AM" : true,
            "12:00 PM" : true
        },
        "2023-04-10" : {
            "_id": objectid,
            "9:00 AM": true,
            "9:30 AM": false,
            "10:00 AM": false,
            "10:30 AM": false,
            "11:00 AM": true,
            "11:30 AM": true,
            "12:00 PM": true
        }
    ]

}