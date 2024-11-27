import { useLocation } from "react-router-dom"


export const GoBack = () => {
    const location = useLocation()
    console.log(location);
    

    return (
        <button className="">Go Back</button>
    )
}