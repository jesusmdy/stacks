export const PRIORITIES = [
  { value: 0, label: 'None' },
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
  { value: 4, label: 'Urgent' },
];

export const getPriorityProperties = (priority: number) => {
  switch (priority) {
    case 0:
      return {
        color: 'gray',
        label: 'None',
      };
    case 1:
      return {
        color: 'green',
        label: 'Low',
      };
    case 2:
      return {
        color: 'yellow',
        label: 'Medium',
      };
    case 3:
      return {
        color: 'orange',
        label: 'High',
      };
    case 4:
      return {
        color: 'red',
        label: 'Urgent',
      };
    default:
      return {
        color: 'gray',
        label: 'None',
      };
  }
};