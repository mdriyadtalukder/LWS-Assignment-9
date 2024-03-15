import { useGetProjectsQuery } from '../features/project/projectApi';
import Project from './Project';

const Projects = () => {
    const { data, isError, isLoading, error } = useGetProjectsQuery();
    let content;
    if (isLoading) content = <p>Loading...</p>
    if (!isLoading && isError) content = <p>{error}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p>No team member found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data.map((d) => <Project d={d} key={d?.id}></Project>)
    }
    return (
        <div>
            <h3 className="text-xl font-bold">Projects</h3>
            <div className="mt-3 space-y-4">
                {content}
            </div>
        </div>
    );
};

export default Projects;