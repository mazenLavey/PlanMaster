import Logo from "@/components/Logo";
import "./index.scss";

const Nav: React.FC = ()=>{
    return (
        <header className="Nav">
            <div className="Nav__Wrapper container">
                <Logo />
                <nav>
                    <div></div>
                </nav>
            </div>
        </header>
    );
};

export default Nav;