import { useEffect, useState } from 'react';
import styles from './ComicsList.module.css';
import axios from 'axios';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComicList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getComicsList');
                setComicsList(response.data);
            } catch (error) {
                console.error('Error fetching list of comics:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchComicList();
    }, []);

    useEffect(() => {
        console.log(comicsList);
    }, [comicsList]);

    if (loading) return <p>Loading...</p>;
    
    return (
        <div className={styles["cmc-list-cntr"]}>
            {
                comicsList.map((comic, index) => (
                    <div key={index} 
                        className={`${styles["cmc-card"]} 
                            ${index === (comicsList.length-1) ? styles["cmc-card-last"] : ""}`}
                    >
                        <img className={styles["cmc-cvr-img"]} src={comic.coverImageURL}></img>
                        <div className={styles["comic-desc"]}>
                            <p className={styles["title"]}>{comic.title}</p>
                            <p className={styles["genres"]}>{comic.genres}</p>
                        </div>
                    </div>
                ))      
            }
        </div>
    )
}
export default ComicsList;