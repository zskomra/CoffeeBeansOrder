export function sortList(list, ascending, sortBy) {
    const sortProperty = sortBy;
    return list.sort((a, b) => {
      if (ascending) {
        return a[sortProperty] > b[sortProperty] ? 1 : -1;
      } else return a[sortProperty] < b[sortProperty] ? 1 : -1;
    });
}
