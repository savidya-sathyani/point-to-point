export const TABLE = {
  maxHeight: 375,
  pageOptions: [10, 25, 100],
};

export const POINTS_TABLE = {
  columns: [
    { id: 'no', label: '#', minWidth: 50 },
    { id: 'latitude', label: 'Latitude', minWidth: 100 },
    {
      id: 'longitude',
      label: 'Longitude',
      minWidth: 100,
    },
    {
      id: 'delete',
      label: '',
      minWidth: 20,
    },
  ],
  pageSize: 10,
};

export const RESULT_TABLE = {
  pageSize: 25,
};
