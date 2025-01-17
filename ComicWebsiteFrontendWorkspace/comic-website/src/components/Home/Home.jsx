import styles from './Home.module.css';
import ComicsList from '../ComicsList/ComicsList';
import Comic from '../Comic/Comic';

const Home = () => {
    return (
        <div className={styles["home-cntr"]}>
            <Comic />
            <ComicsList />
        </div>
    )
}
export default Home;