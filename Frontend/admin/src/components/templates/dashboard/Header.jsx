import { useContext } from 'react';
import avatar from '../../../assets/images/admin-pic.webp'
import { AuthContext } from '../../../context/AuthContext';


const Header = () => {

    const { admin } = useContext(AuthContext);

    return (
        <div className="flex items-center justify-between gap-2">

            {admin && (
                <div className='flex items-center'>
                    <div className='w-20'>
                        <img src={avatar} alt="avatar" className='w-full h-full' />
                    </div>

                    <div className='relative left-3 text-slate-600'>{admin.username}</div>
                </div>
            )}

            <div className='text-slate-600 text-sm'>
                
            </div>

        </div>
    )
}

export default Header