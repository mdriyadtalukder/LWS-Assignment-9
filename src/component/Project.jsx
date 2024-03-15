import { useDispatch } from "react-redux";
import { addingColor } from "../features/project/projectSlice";

const Project = ({ d }) => {
    const { projectName, colorClass } = d || {};
    const dispatch = useDispatch();
    return (
        <div className="checkbox-container">
            <input onClick={() => dispatch(addingColor(projectName))} type="checkbox" className={`${colorClass}`} defaultChecked />
            <p className="label">{projectName}</p>
        </div>
    );
};

export default Project;