import { axiosClient } from '@config/axios';
import { useQuery } from 'react-query';

function fetchTasks() {
  return axiosClient.get('/tasks');
}
export const useFetchTasksQuery = () => {
  return useQuery(['tasks'], fetchTasks);
};
