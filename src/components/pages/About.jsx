import { Logo } from "../../components/index"

export const About = () => { 
    return(
        <div className="">
            <div className="h-[65vh]">
                <img className="h-[65vh] w-full relative" src="https://images.pexels.com/photos/5586266/pexels-photo-5586266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </div>
            {/* content */}
            <div className="px-5 pb-10 mt-10">
                <div className="px-5">
                    <h1 className="font-racing text-center text-4xl text-gray-700 mb-5">Don’t squeeze in a sedan when you could relax in a van.</h1>
                    <p className="font-semibold">Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</p>
                    <p className="font-semibold">Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                </div>
                <div className="bg-lime-200 rounded-md px-12 py-12 mt-10">
                    <h3 className="font-Montserrat text-2xl font-bold">Your destination is waiting.
                    <br />Your van is ready.</h3>
                    <button className="bg-black text-white mt-4 rounded-md px-3 py-2 text-xl font-racing">Explore our vans</button>
                </div>
            </div>
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