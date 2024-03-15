import { useGetTeamsQuery } from '../features/team/teamApi';
import Team from './Team';

const Teams = () => {
    const { data, isError, isLoading, error } = useGetTeamsQuery();
    let content;
    if (isLoading) content = <p>Loading...</p>
    if (!isLoading && isError) content = <p>{error}</p>
    if (!isLoading && !isError && data?.length === 0) content = <p>No team member found!!</p>
    if (!isLoading && !isError && data?.length > 0) {
        content = data.map((d) => <Team d={d} key={d?.id}></Team>)
    }
    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold">Team Members</h3>
            <div className="mt-3 space-y-4">
                {content}
            </div>
        </div>
    );
};

export default Teams;