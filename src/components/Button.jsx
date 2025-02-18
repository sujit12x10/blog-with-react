export const Button = ({
    children, 
    type="button", 
    bgColor="bg-gray-800", 
    textColor="", 
    className="", 
    ...props}
) => {
    return (
        <button className={`px-3 py-0 text-cyan-100 text-xl hover:bg-slate-300 rounded hover:text-gray-900 duration-500 ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}