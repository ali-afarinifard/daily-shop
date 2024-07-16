const FormWrap = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-fit h-full flex items-center justify-center pb-12 pt-24">
            {/* max-h-[55.625rem]  */}
            <div className="md:max-w-[56.25rem] w-full flex flex-col items-center gap-6 shadow-xl shadow-slate-200 rounded-md p-4 md:p-8">
                {children}
            </div>
        </div>
    )
}

export default FormWrap