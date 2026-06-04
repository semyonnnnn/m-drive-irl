import { UnderLinkProps } from "@/types"
import NavLink from "./NavLink"

const UnderLink = ({ children, href, active }: UnderLinkProps) => {
    return <NavLink
        href={href}
        active={active}
        className="
        relative text-black px-3 py-1 text-md font-semibold
        transition-colors
        after:absolute after:left-1/2 after:bottom-0
        after:h-0.5 after:w-full 
        

        after:bg-black
        after:from-primary 
        after:to-primary-container

        after:-translate-x-1/2 after:scale-x-0
        after:origin-center
        after:transition-transform after:duration-300
        hover:after:scale-x-100"
    >
        {children}
    </NavLink>
}

export { UnderLink }