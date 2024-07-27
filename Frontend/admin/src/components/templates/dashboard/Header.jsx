import avatar from '../../../assets/images/profile.png'


const Header = () => {
    return (
        <div className="flex items-center justify-between gap-2">

            <div className='flex items-center gap-4'>
                <div className='w-12 h-12'>
                    <img src={avatar} alt="avatar" className='w-full h-full' />
                </div>

                <div>Username Text</div>
            </div>

            <div>
                خوش آمدید
            </div>

        </div>
    )
}

export default Header