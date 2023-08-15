import React, {Component} from "react";
import { useNavigate, Link } from "react-router-dom";
import Users from '../data/Users'
import './register.css'


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            profilePicture: "",
            error: "",
            isValidEmail: true,
        }
    }

      handleChange = (event) => {
        const {name, value, email, password} = event.target;
        this.setState({ [name]: value });

        
        
      if (event.target.name === "email") { 
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailPattern.test(event.target.value);
        this.setState({ email: event.target.value, isValidEmail });
      } else {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }  


    
  }



    

    

        handleFileChange = (event) => {
            
            const file = event.target.files[0];
            const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({ profilePicture: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
            }
 
        handleRegister = (event) => {
            event.preventDefault();

        const { name, email, password, profilePicture } = this.state;
        const { navigate } = this.props;

        const userRegistered = Users.some((user) => user.email === email);

        if(userRegistered) {
            this.setState({ error: "user already registered" })
            return;
        }

        const newUser = {
            id: Users.length + 1,
            name,
            email,
            password,
            profilePicture: profilePicture
        };
        Users.push(newUser);
        navigate("/dashboard");
    }

      render() {
        const { name,email, password, error, profilePicture, nameError, emailError, passwordError } = this.state;
        return (
            <div className="register-page" >
                <div className="register-box">
                <h2>Sign Up</h2>

                <form onSubmit={this.handleRegister}>
                <div className="input-group">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={this.handleChange}
                    required
                    />
                    </div>

                    <div className="input-group">
                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.handleChange}
                    required
                    />
                    {!this.state.isValidEmail && (
                 <span style={{ color: "red", fontSize: "15px" }}>Invalid email format</span>
                  )}

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
                    {error && <p className="error-message">{error}</p>}

                    <div className="input-group">
                    {profilePicture ? (
                        <img
                            src={profilePicture}
                            alt="Profile"
                            className="profile-picture"
                        />
                        ) : (
                        <div className="file-input-placeholder">
                            <span>Upload Image</span>
                        </div>
                        )}
                        <input
                        type="file"
                        name="profilePicture"
                        onChange={this.handleFileChange}
                        accept="image/*"
                        required
                        />
                    </div>

                    <div className="action-buttons">
                    <button className="register-button" type="submit">Sign Up</button>
                         </div>
                         <div className="or-separator">Or</div>
                         <div className="social-buttons">
                      <button className="google-button">Continue with Google</button>
                      <Link to="/login" className="forgot-password">Already have an account? Sign in</Link>
                      </div>        
                </form>
                </div>
            </div>
        )
    }
}

const RegisterWrapper = () => {
    const navigate = useNavigate();
    return <Register navigate={navigate}/>;
};

export default RegisterWrapper;