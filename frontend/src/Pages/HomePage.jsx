import About from '../Components/About/About'
import BookTable from '../Components/BookTable/BookTable'
import Contact from '../Components/Contact/Contact'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Nav from '../Components/Nav/Nav'
import Offer from '../Components/Offer/Offer'
import Rooms from '../Components/Rooms/Rooms'
import Staff from '../Components/Staffs/Staff'
import Testimonial from '../Components/Testimonials/Testimonial'

const HomePage = () => {
    return (
        <>
            <Nav/>
            <Header/>
            <About/>
            <Rooms/>
            <BookTable/>
            <Offer/>
            <Staff/>
            <Testimonial/>
            <Contact/>
            <Footer/>
        </>
    )
}

export default HomePage