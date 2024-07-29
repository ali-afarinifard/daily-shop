import { useContext } from 'react';
import avatar from '../../../assets/images/profile.png'
import { AuthContext } from '../../../context/AuthContext';


const Header = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="flex items-center justify-between gap-2">

            {user && (
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12'>
                        <img src={avatar} alt="avatar" className='w-full h-full' />
                    </div>

                    <div>{user.username}</div>
                </div>
            )}

            <div>
                خوش آمدید
            </div>

        </div>
    )
}

export default Header