import React, {Component} from "react";
import Users from '../data/Users';
import './dashboard.css';
import Header from '../components/Header';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: Users,            
        }
    }

    handleRemove = (id) => {
        this.setState((prevState) => ({
            users: prevState.users.filter((user) => user.id !==id),
        }));
    };

    render(){
        const { users } = this.state;
        const { selectedUser } = this.props;

        return(
            <div>
                <Header/>
                <h2>Users</h2>
                <div className="user-grid">
                    {users.map((user) => (
                        <div key={user.id} className="user-card">
                            <img src={user.profilePicture} alt={user.name}/>
                            <p>{user.name}</p>
                            <button  onClick={() => this.handleRemove(user.id)}>Remove</button>
                            </div>
                    ))}
                </div>
            </div>  
        )
    }
}

export default Dashboard;