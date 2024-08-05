import { useContext, useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from "../context/AuthContext";
import { updateUser } from "../services/apiUrls";
import avatar from "../assets/images/profile.png"

const AdminAccount = () => {
    const { admin, updateAdminInContext } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        adminId: '',
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (admin) {
            setFormData({
                adminId: admin._id,
                username: admin.username,
                email: admin.email,
                password: ''
            });
        }
    }, [admin]);

    const updateAdminMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            alert('Admin updated successfully!');
            // Update the user in context
            updateAdminInContext(data.admin);
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
        updateAdminMutation.mutate(formData);
    };

    return (
        <div>
            <h1 className="font-[400] text-[1.4rem]">حساب کاربری</h1>
            <div className="flex items-center justify-between pt-5">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center gap-6">
                        <div className="flex flex-col gap-1">
                            <label>نام کاربری</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>ایمیل</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label>رمز عبور</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn-primary !py-2">ویرایش</button>
                    </div>
                </form>

                <div className="w-60 h-60">
                    <img src={avatar} alt="avatar" className="w-full h-full" />
                </div>
            </div>
        </div>
    );
};

export default AdminAccount;
