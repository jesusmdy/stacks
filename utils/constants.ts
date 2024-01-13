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


const DAY = 24;
const MONTH = 28;
const YEAR = 365;

export const hoursToDays = (hours: number) => {
  if (hours === 0) {
    return '0h';
  }
  if (hours > YEAR) {
    return `${Math.floor(hours / YEAR)}y`;
  }
  if (hours > MONTH) {
    return `${Math.floor(hours / MONTH)}m`;
  }
  if (hours > DAY) {
    return `${Math.floor(hours / DAY)}d`;
  }
  return `${hours}h`;
}

export const valueParser = (value: string) => {
  const prefix = value.slice(-1);
  const number = Number(value.slice(0, -1));
  switch (prefix) {
    case 'h':
      return number;
    case 'd':
      return number * DAY;
    case 'm':
      return number * MONTH;
    case 'y':
      return number * YEAR;
    default:
      return 0;
  }
};
