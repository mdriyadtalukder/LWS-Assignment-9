import { useSelector } from 'react-redux';
import { useGetProjectsQuery } from '../features/project/projectApi';
import { useGetTasksQuery } from '../features/task/taskApi';
import Task from './Task';

const Tasks = () => {
    const { data: data2 } = useGetProjectsQuery();
    const { data, isError, isLoading, error } = useGetTasksQuery();
    const { search, addColor } = useSelector((state) => state.projects);
    let content;
    if (isLoading) content = <p>Loading...</p>
    if (!isLoading && isError) content = <p>{error}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p>No team member found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data
            .filter((d) => {
                if (addColor.length > 0) {

                    return addColor.includes(d?.project?.projectName)
                }
                else if (addColor.length === 0) {
                    return false;
                }
                else {
                    return true;
                }
            })
            .filter((d) => {
                if (search !== '') {
                    return d?.taskName.toLowerCase().includes(search.toLowerCase());
                }
                else {
                    return true;
                }
            })
            .map((d) => <Task d={d} key={d?.id}></Task>)
    }

    return (
        <div className="lws-task-list">
            {content}
        </div>
    );
};

export default Tasks;