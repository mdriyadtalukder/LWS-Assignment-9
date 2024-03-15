import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../features/project/projectApi";
import { useGetTeamsQuery } from "../features/team/teamApi";
import { useAddTaskMutation } from "../features/task/taskApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const { data } = useGetProjectsQuery();
    const { data: datas } = useGetTeamsQuery();
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [date, setDate] = useState('');
    const [addTask, { isError, isSuccess, error }] = useAddTaskMutation();
    const dispatch = useDispatch();
    const navigator = useNavigate('')

    const handleAdding = (e) => {
        e.preventDefault();
        dispatch(addTask({
            taskName: title,
            teamMember: {
                name: name,
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBXqRKXezHfKsAvXX2HOz0QO_5dvdAj5s0Bg&usqp=CAU",
            },
            project: {
                projectName: projectName,
                colorClass: "color-scoreboard"
            },
            deadline: date,
            status: "pending"
        }));
    }
    // if (isSuccess) {
    //     navigator('/')
    // }

    return (
        <div className="container relative">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                    Create Task for Your Team
                </h1>

                <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                    <form onSubmit={handleAdding} className="space-y-6">
                        <div className="fieldContainer">
                            <label htmlFor="lws-taskName">Task Name</label>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                name="taskName"
                                id="lws-taskName"
                                required
                                placeholder="Implement RTK Query"
                            />
                        </div>

                        <div className="fieldContainer">
                            <label>Assign To</label>
                            <select onChange={(e) => setName(e.target.value)} name="teamMember" id="lws-teamMember" required>
                                <option defaultValue="" hidden selected>Select Job</option>
                                {datas?.map(d => <option key={d?.id}>{d?.name}</option>)}
                            </select>
                        </div>
                        <div className="fieldContainer">
                            <label htmlFor="lws-projectName">Project Name</label>
                            <select onChange={(e) => setProjectName(e.target.value)} id="lws-projectName" name="projectName" required>
                                <option value="" hidden selected>Select Project</option>
                                {data?.map(d => <option key={d?.id}>{d?.projectName}</option>)}
                            </select>
                        </div>

                        <div className="fieldContainer">
                            <label htmlFor="lws-deadline">Deadline</label>
                            <input onChange={(e) => setDate(e.target.value)} type="date" name="deadline" id="lws-deadline" required />
                        </div>

                        <div className="text-right">
                            <button type="submit" className="  lws-submit">Save</button>
                        </div>
                        {isSuccess && <p>Adding Success!! </p>}
                        {isError && <p>{error} </p>}
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Add;