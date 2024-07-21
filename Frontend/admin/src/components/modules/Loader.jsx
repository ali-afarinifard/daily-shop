import PuffLoader from "react-spinners/PuffLoader"

const Loader = () => {
    return (
        // absolute top-[50%] left-[50%] -translate-x-[150%] -translate-y-[50%]
        <div className="flex items-center justify-center">
            <PuffLoader color="#5542F6" size={45} />
        </div>
    )
}

export default Loader