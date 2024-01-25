export const generateColObjects = (points) => {
  const result = [];

  for (let i = 1; i < points; i++) {
    if (result.length === 0) {
      result.push({
        id: 'time',
        label: 'Time',
        minWidth: 60,
      });
    }
    const name = `P${i}-P${i + 1}`;
    const rName = `P${i + 1}-P${i}`;
    const col = {
      id: name,
      label: name,
      minWidth: 30,
    };
    const reverseCol = {
      id: rName,
      label: rName,
      minWidth: 30,
    };
    result.push(col);
    result.push(reverseCol);
  }
  return result;
};

export const roundUpOrDown = (num) => {
  if (num % 1 === 0.5) {
    return Math.ceil(num);
  } else {
    return Math.round(num);
  }
};

export const formatDateToCustomFormat = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getDirectionsDetails = async (service, request) => {
  return await service.route(request, (result, status) => {
    if (status !== google.maps.DirectionsStatus.OK) {
      console.error('error fetching directions', result, status);
    }
  });
};
