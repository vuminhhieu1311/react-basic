import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({children, item_active}) => {
    const [openSidebar, setOpenSidebar] = useState(true)
    const [containerFull, setContainerFull] = useState(false)
    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar)
    }
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setOpenSidebar(false)
                setContainerFull(true)
            } else {
                setContainerFull(false)
            }
        };
        handleResize()
        window.addEventListener("resize", handleResize);
    
        return () => {
            window.removeEventListener("resize", handleResize);
        };
      }, []);
    return (
        <div className='max-h-screen'>
            <Sidebar open={openSidebar} item_active={item_active}></Sidebar>
            <div className= {`${containerFull ? 'ml-24' : openSidebar ? 'ml-72' : 'ml-24'} py-16 mr-8 transition-all duration-200`}>
                <Header openSidebar={openSidebar} toggleSidebar={()=> {toggleSidebar()}}></Header>
                {children}
            </div>
        </div>
    );
};

export default Layout;
