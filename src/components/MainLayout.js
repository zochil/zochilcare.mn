import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
function MainLayout({children, pageProps}) {
    return (
        <div>
            <Navbar logo={pageProps?.campaign?.logo || ""} />
            {children}
            <Footer/>
        </div>
    )
}

export default MainLayout
