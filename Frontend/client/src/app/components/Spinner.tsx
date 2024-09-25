// ** Spinner
import { PuffLoader } from "react-spinners"


interface SpinnerProps {
    size: number;
}


const Spinner: React.FC<SpinnerProps> = ({size}) => {
    return (
        <PuffLoader color="#334155" size={size} />
    )
}

export default Spinner