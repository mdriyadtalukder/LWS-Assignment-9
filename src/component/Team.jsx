
const Team = ({ d }) => {
    const { name, avatar } = d || {};
    return (
        <div className="checkbox-container">
            <img src={avatar} className="team-avater" />
            <p className="label">{name}</p>
        </div>

    );
};

export default Team;