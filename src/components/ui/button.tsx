import type { JSX } from "react";

type ButtonProps = {
    title: string;
    id: string;
    icon?: JSX.Element;
    containerClass?: string;
}

const Button = ({title,id,icon,containerClass}: ButtonProps) => {
  return (
    <button id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 
    py-3 text-black ${containerClass}`}>
        {icon}
        <span className="relative incline-flex overflow-hidden font-general text-xs uppercase ">
            <div>{title}</div>
        </span>
    </button>
  )
}

export default Button;