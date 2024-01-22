import Logo from "@/components/Logo";
import UserAuthStatus from "@/components/UserAuthStatus";
import "./index.scss";

const Nav: React.FC = ()=>{
    return (
        <header className="Nav">
            <div className="Nav__Wrapper container">
                <Logo />
                <nav>
                    <UserAuthStatus />
                </nav>
            </div>
        </header>
    );
};

export default Nav;