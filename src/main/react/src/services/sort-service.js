export function sortList(list, ascending, sortBy) {
    const sortProperty = sortBy;
    // const listToSort = [...list];
    return list.sort((a, b) => {
      if (ascending) {
        return a[sortProperty] > b[sortProperty] ? 1 : -1;
      } else return a[sortProperty] < b[sortProperty] ? 1 : -1;
    });

// export function sortList(list, types, type) {
//   let sortedArray = [];
//   const sortProperty = types[type].value;
//   const ascending = types[type].asc;
//   if (ascending) {
//     sortedArray = [...list].sort((a, b) => b[sortProperty] - a[sortProperty]);
//   } else {
//     sortedArray = [...list].sort((a, b) => a[sortProperty] - b[sortProperty]);
//   }
//   return sortedArray;
// }


}

// export function sortList  (list, ascending, sortBy)  {
//     let sortedArray = [];
//     const sortProperty = sortBy;
//     if (ascending) {
//       sortedArray = [...list].sort((a, b) => b[sortProperty] - a[sortProperty]);
//     } else {
//       sortedArray = [...list].sort((a, b) => a[sortProperty] - b[sortProperty]);
//     }
//     return sortedArray;
//   };
