import './Header.css'

function Header({content}) {
    return(
        <header className="header-component">
            <div className="header-overlay"></div>
            <div className="title-container">{content}</div>
        </header>
    )    
}

export default Header;
