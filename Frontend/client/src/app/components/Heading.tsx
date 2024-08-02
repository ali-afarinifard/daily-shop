
interface HeadingProps {
    title: string;
    center?: boolean;
    custom?: string;
};


const Heading: React.FC<HeadingProps> = ({ title, center, custom }) => {
    return (
        <div className={`${center ? 'text-center' : 'text-start'} relative`}>
            <h1 className={`font-bold text-2xl ${custom ? custom : ''}`}>{title}</h1>
            <span className="w-full h-[2px] bg-slate-400 absolute left-0 -bottom-2"></span>
        </div>
    )
}

export default Heading