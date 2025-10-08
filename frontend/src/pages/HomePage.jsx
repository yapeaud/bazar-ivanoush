import BestSeller from '../components/BestSeller'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import NewsletterBox from '../components/NewsletterBox'
import OurPolicy from '../components/OurPolicy'

const HomePage = () => {
    return (
        <>
            <Hero />
            <LatestCollection />
            <BestSeller />
            <OurPolicy />
            <NewsletterBox />
        </>
    )
}

export default HomePage