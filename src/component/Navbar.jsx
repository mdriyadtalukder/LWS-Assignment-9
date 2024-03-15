import { Link } from 'react-router-dom';
import image from '../assets/svg/logo.svg'
import { useDispatch, useSelector } from 'react-redux';
import { searching } from '../features/project/projectSlice';
const Navbar = () => {
    const dispatch = useDispatch();
    return (
        <nav className="container relative py-3">
            <div className="flex items-center justify-between">
                <Link to='/'>
                    <img src={image} />
                </Link>
                <div className="flex-1 max-w-xs search-field group">
                    <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
                    <input onChange={(e) => dispatch(searching(e.target.value))} type="text" placeholder="Search Task" className="search-input" id="lws-searchTask" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;