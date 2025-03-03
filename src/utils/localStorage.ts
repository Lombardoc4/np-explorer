export const SetLocalStorage = (data: ParkLocalStorage) => {
  // Get Local Storage Value
  const recentlyViewed = localStorage.getItem('npe-recently-viewed');

  // If value append else create value
  if (recentlyViewed) {
    const recentArray = JSON.parse(recentlyViewed);
    // Ignore if park already exits
    if (
      recentArray.find((p: ParkLocalStorage) => p.parkCode === data.parkCode)
    ) {
      return;
    }
    // Limit to 10 parks
    if (recentArray.length > 10) {
      recentArray.shift();
    }
    // Add new park
    recentArray.push(data);
    localStorage.setItem('npe-recently-viewed', JSON.stringify(recentArray));
  } else {
    localStorage.setItem('npe-recently-viewed', JSON.stringify([data]));
  }
};
