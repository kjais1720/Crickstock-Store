import styles from "./home.module.css"
import { HeroBanner } from "./components/banner-section";
import { Categories } from "./components/categories-section";

export function Home(){
    document.title = "Crickstock store | One stop shop for all your cricketing needs"
    return (
        <main>
            <HeroBanner styles={styles}/>
            <Categories styles={styles}/>
        </main>
    )
}