import { useParams } from "react-router-dom";
import { useEditTaskMutation, useGetTaskQuery } from "../features/task/taskApi";
import { useGetProjectsQuery } from "../features/project/projectApi";
import { useGetTeamsQuery } from "../features/team/teamApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Edit = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetTaskQuery(id);
    const { data: data2 } = useGetProjectsQuery();
    const { data: datas } = useGetTeamsQuery();
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [date, setDate] = useState('');
    const dispatch = useDispatch();
    const [editTask, { isError: erroring, isSuccess, error: err }] = useEditTaskMutation()

    useEffect(() => {
        if (data?.id) {
            setTitle(data?.taskName)
            setName(data?.teamMember?.name)
            setProjectName(data?.project?.projectName)
            setDate(data?.deadline)
        }
    }, [data?.deadline, data?.id, data?.project?.projectName, data?.taskName, data?.teamMember?.name, data]);
    let content;

    const handleEditing = (e) => {
        e.preventDefault();
        dispatch(editTask({
            id: data?.id,
            data: {
                taskName: title,
                teamMember: {
                    name: name,
                    avatar: data?.teamMember?.avatar,
                    id: data?.teamMember?.id && data?.teamMember?.id,
                },
                project: {
                    id: data?.project?.id && data?.project?.id,
                    projectName: projectName,
                    colorClass: data?.project?.colorClass,
                },
                deadline: date,
                status: data?.status ? data?.status : "pending"
            }
        }));
    }
    if (isLoading) content = <p>Loading...</p>
    if (!isLoading && isError) content = <p>{error}</p>

    if (!isLoading && !isError && data?.id) {
        content = <form onSubmit={handleEditing} className="space-y-6">
            <div className="fieldContainer">
                <label htmlFor="lws-taskName">Task Name</label>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={data?.taskName}
                    type="text"
                    name="taskName"
                    id="lws-taskName"
                    required

                />
            </div>

            <div className="fieldContainer">
                <label>Assign To</label>
                <select onChange={(e) => setName(e.target.value)} name="teamMember" id="lws-teamMember" required>
                    {datas?.map(d => <option selected={data?.teamMember?.name === d?.name} key={d?.id}>{d?.name}</option>)}
                </select>
            </div>
            <div className="fieldContainer">
                <label htmlFor="lws-projectName">Project Name</label>
                <select onChange={(e) => setProjectName(e.target.value)} id="lws-projectName" name="projectName" required>
                    {data2?.map(d => <option selected={data?.project?.projectName === d?.projectName} key={d?.id}>{d?.projectName}</option>)}
                </select>
            </div>

            <div className="fieldContainer">
                <label htmlFor="lws-deadline">Deadline</label>
                <input onChange={(e) => setDate(e.target.value)} defaultValue={data?.deadline} type="date" name="deadline" id="lws-deadline" required />
            </div>

            <div className="text-right">
                <button type="submit" className="lws-submit">Save</button>
            </div>
            {isSuccess && <p>Adding Success!! </p>}
                        {erroring && <p>{err} </p>}
        </form>
    }
    return (
        <div className="container relative">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                    Edit the task
                </h1>

                <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                    {content}
                </div>
            </main>
        </div>
    );
};

export default Edit;