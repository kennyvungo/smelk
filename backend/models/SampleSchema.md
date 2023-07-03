EVENT

owner/user ID ref
name
array of dates
start time 
end time
timestamps
event url


Schedule
event id ref
username


DAILY SCHEDULE
date
schedule id ref
30 min increments


active: { type: Boolean, default: false }

// {
//     "_id" : objectid,
//     "username" : "test",
//     "event_id": 
//     "dailySchedule" : [
//         "2023-04-10" : {
//             "_id" : objectid,
//             "9:00 AM" : true,
//             "9:30 AM" : true,
//             "10:00 AM" : false,
//             "10:30 AM" : false,
//             "11:00 AM" : false,
//             "11:30 AM" : true,
//             "12:00 PM" : true
//         },
//         "2023-04-11" : {
//             "_id": objectid,
//             "9:00 AM": true,
//             "9:30 AM": false,
//             "10:00 AM": false,
//             "10:30 AM": false,
//             "11:00 AM": true,
//             "11:30 AM": true,
//             "12:00 PM": true
//         }
//     ],
//         "aggSchedule" : [
//             "2023-04-10" : {
//                 "_id": objectid,
//                 "9:00 AM": {
//                     available: ["shanna","kenny", "ernest"],
//                     unavailable: ["lauren"],
//                     availableCount: 3
//                 },
//                 "9:30 AM": {
//                     available: ["shanna", "kenny", "ernest"],
//                     unavailable: ["lauren"]
//                 }, 
//                 "10:00 AM": false,
//                 "10:30 AM": false,
//                 "11:00 AM": false,
//                 "11:30 AM": true,
//                 "12:00 PM": true
//             },
//             "2023-04-11" : {
//                 "_id": objectid,
//                 "9:00 AM": true,
//                 "9:30 AM": false,
//                 "10:00 AM": false,
//                 "10:30 AM": false,
//                 "11:00 AM": true,
//                 "11:30 AM": true,
//                 "12:00 PM": true
//             }
//         ]

// }