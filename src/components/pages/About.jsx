import { Logo } from "../../components/index"

export const About = () => { 
    return(
        <div style={{"--image-url": "url(https://images.pexels.com/photos/8837234/pexels-photo-8837234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"}}  
            className="h-screen bg-[image:var(--image-url)] bg-cover z-60">
        </div>
    ) 
    // return(
    //     <div className="py-6 bg-white mt-6">
    //       <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
    //           <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
    //               <div className="md:5/12 lg:w-5/12">
    //                   <img
    //                       src="https://images.pexels.com/photos/8837234/pexels-photo-8837234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //                       alt="image"
    //                   />
    //               </div>
    //               <div className="md:7/12 lg:w-6/12">
    //                     <span className="text-2xl text-gray-900 md:text-4xl font-racing">
    //                         RE<span className="text-cyan-300">BLOG</span> 
    //                     </span>
    //                   <p className="mt-6 text-gray-600 text-xl font-bold">
    //                     It is a blogging website that lets you to express your thoughts with your blogs.
    //                   </p>
    //                   <p className="mt-4 text-gray-600 text-xl font-bold">
    //                       Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
    //                       Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
    //                   </p>
    //                   <p className="mt-4 text-gray-600 text-xl font-bold">
    //                       Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
    //                       Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
    //                   </p>
    //               </div>
    //           </div>
    //       </div>
    //   </div>
    // )
}