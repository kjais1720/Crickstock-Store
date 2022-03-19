export const HeroBanner = ({styles}) => {
    return(
        <section className={`${styles.hero} flex-col justify-c-center`} style={{backgroundImage:"url(/assets/hero-banner-2.webp),var(--bg-gradient-overlay)"}}>
            <h1 className={styles.heroHeading}>
                Shop from the best ever collection of cricket gears
            </h1>
            <div className="cta">
                <a href="#categories" className="tr-btn tr-btn-cta">Shop now</a>
            </div>
        </section>
    )
}