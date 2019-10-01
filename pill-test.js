init('.itinerary-card-component', ()=>{

  pills(
  {
      pillDetails: {
          color: 'red',
          text: ' Buy one get one free',
          class: 'pill_bogo'
      },
      pillCriteria: {
          
          promoDates: [
              {
                  startDate: 'Sep 18 2019 10:00:00', 
                  endDate: 'Oct 22 2019 10:00:00' 
              },
              {
                  startDate: 'Oct 24 2019 10:00:00',
                  endDate: 'Nov 05 2019 10:00:00'
              }
          ],
          sailingDates: [
              {
                  startDate: 'Oct 1 2019 10:00:00', 
                  endDate: 'Dec 31 2021 10:00:00'   
              }
          ],
          //numberOfNights: [4, 8],
          // departurePorts: ['Fort Lauderdale', 'Miami'],
      },
      pillExclusions: {
          // shipCodes: ['NV'],
          // numberOfNights: [6, 9],
          // departurePorts: ['Miami', 'Fort Lauderdale'],
          // destinationPorts: ['Nassau'],
          departureDates: [
              {
                  startDate: 'Sep 25 2019',
                  endDate:' Oct 30 2019'
              },
              {
                  startDate:'Oct 26 2019',
                  endDate: 'Dec 31 2019'
              }
          ],
          //otherPills: ['mx_savings']
      }
  }
);

// pills(
//   {
//       pillDetails: {
//           color: 'green',
//           text: ' 30% Off',
//           class: 'pill_30off'
//       },
//       pillCriteria: {
          
//           promoDates: [
//               {
//                   startDate: 'Sep 18 2019 10:00:00', 
//                   endDate: 'Oct 22 2019 10:00:00' 
//               },
//               {
//                   startDate: 'Oct 24 2019 10:00:00',
//                   endDate: 'Nov 05 2019 10:00:00'
//               }
//           ],
//           sailingDates: [
//               {
//                   startDate: 'Oct 1 2019 10:00:00', 
//                   endDate: 'Dec 31 2021 10:00:00'   
//               }
//           ],
//           numberOfNights: [3, 8],
//           departurePorts: ['Fort Lauderdale', 'Miami'],
//       },
//       pillExclusions: {
//           //shipCodes: ['NV'],
//           // numberOfNights: [6, 9],
//           //departurePorts: ['Miami', 'Fort Lauderdale'],
//           // destinationPorts: ['Nassau'],
//           departureDates: [
//               {
//                   startDate: 'Sep 25 2019',
//                   endDate:' Dec 31 2019'
//               },
//               {
//                   startDate:'June 20 2020',
//                   endDate: 'July 31 2020'
//               }
//           ],
//           //otherPills: ['mx_savings']
//       }
//   }
// );

// pills(
//   {
//       pillDetails: {
//           color: 'red',
//           text: ' 200 BONES OFF',
//           class: 'pill_jimbo'
//       },
//       pillCriteria: {
          
//           promoDates: [
//               {
//                   startDate: 'Sep 18 2019 10:00:00', 
//                   endDate: 'Oct 22 2019 10:00:00' 
//               },
//               {
//                   startDate: 'Oct 24 2019 10:00:00',
//                   endDate: 'Nov 05 2019 10:00:00'
//               }
//           ],
//           sailingDates: [
//               {
//                   startDate: 'Oct 1 2019 10:00:00', 
//                   endDate: 'Dec 31 2020 10:00:00'   
//               }
//           ],
//           // numberOfNights: [4, 8],
//           // departurePorts: ['Fort Lauderdale', 'Miami'],
//       },
//       pillExclusions: {
//           // shipCodes: ['NV'],
//           // numberOfNights: [6, 9],
//           // departurePorts: ['Miami', 'Fort Lauderdale'],
//           // destinationPorts: ['Nassau'],
//           // departureDates: [
//           //     {
//           //         startDate: 'Sep 25 2019',
//           //         endDate:' Oct 13 2019'
//           //     },
//           //     {
//           //         startDate:'Oct 26 2019',
//           //         endDate: 'Nov 13 2019'
//           //     }
//           // ],
//           //otherPills: ['pill_bogo']
//       }
//   }
// );

});