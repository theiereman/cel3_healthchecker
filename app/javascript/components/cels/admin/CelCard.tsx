import {Cel} from "../../../interfaces/cel/cel.ts";
import {Link} from "@inertiajs/react";

export const CelCard = ({cel} : { cel : Cel}) => {
    return (
        <div className='flex gap-2 items-center'>
            <input type="text" className="rounded-lg" value={cel.name}/>
            <input type="text" className="rounded-lg w-full" value={cel.url}/>
            <Link className="bg-blue-800 p-2 rounded-lg text-slate-900 dark:text-slate-100">Edit</Link>
            <Link className="bg-red-800 p-2 rounded-lg text-slate-900 dark:text-slate-100">Delete</Link>
        </div>
    )
}