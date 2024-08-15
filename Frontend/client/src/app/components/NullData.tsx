
interface NullDataProps {
    title: string;
    center?: string;
};


const NullData: React.FC<NullDataProps> = ({ title, center }) => {
    return (
        <div className={`w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl ${center ? center : ''}`}>
            <p className='font-medium'>{title}</p>
        </div>
    )
}

export default NullData