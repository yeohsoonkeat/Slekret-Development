import IconClock from "../icons/ic_clock";
import NavigationBar from "./navbar";

export default function ComingSoon() {
    return (
        <>
        <NavigationBar/>
        <div className=" w-full flex items-center justify-center flex-col" style={{
            height:"90vh"
        }}>
            <IconClock className="w-32 h-32"/>
            <h1 className="text-3xl font-black">Comming Soon</h1>
        </div>
        </>
    )
}
