import React, {Component} from "react";
import { useNavigate, Link } from "react-router-dom";
import Users from '../data/Users';
import './login.css'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }

    handleLogin = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const { navigate } = this.props;

        const user = Users.find((user) => user.email === email);

        if(!user) {
            this.setState({ error: "user not found" })
            return;
        }

        if(user.password !== password) {
            this.setState({ error: "Incorrect password" })
            return;
        }
        navigate("/dashboard");
    };

    render() {
        const {email, password, error} = this.state;

        
        return (
            <div className="login-page">
                <div className="login-box">
                <h2>Sign in</h2>

                <form onSubmit={this.handleLogin}>
                <div className="input-group">
                    <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.handleChange}
                    required
                    />
                    </div>

                    <div className="input-group">
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange}
                    required
                    />
                    </div>

                    <div className="action-buttons">
                    <button className="login-button" type="subit">Sign in</button>
                     <Link to="" className="forgot-password">Forgot your password?</Link>
                         </div>
 
                         <div className="or-separator">Or</div>
                        <div className="social-buttons">
                    <button className="facebook-button">Login with Facebook</button>
                      <button className="google-button">Login with Google</button>
                      </div>

                    {error && <p className="error-message">{error}</p>}
                    
                    <div >
                    <Link to="/register" className="not-user">
                         Not a user? Sign Up
                    </Link>
                    </div>                         
                </form>
                </div>                                
            </div>
        )
    }
}

const LoginWrapper = () => {
    const navigate = useNavigate();
    return <Login navigate={navigate}/>;
};

export default LoginWrapper;