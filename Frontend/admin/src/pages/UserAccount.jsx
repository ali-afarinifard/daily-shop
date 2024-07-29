import { useContext, useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from "../context/AuthContext";
import { updateUser } from "../services/apiUrls";

const UserAccount = () => {
    const { user, updateUserInContext } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        userId: '',
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                userId: user._id,
                username: user.username,
                email: user.email,
                password: ''
            });
        }
    }, [user]);

    const updateUserMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            alert('User updated successfully!');
            // Update the user in context
            updateUserInContext(data.user); 
        },
        onError: (error) => {
            alert('Error updating user information.');
            console.error(error);
        }
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserMutation.mutate(formData);
    };

    return (
        <div>
            <h2>User Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UserAccount;
