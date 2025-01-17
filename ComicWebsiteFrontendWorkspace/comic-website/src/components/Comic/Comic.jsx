import { Link, useParams } from "react-router-dom";
import styles from './Comic.module.css';
import { useEffect, useState } from "react";
import axios from 'axios';

const Comic = () => {
    const [comic, setComic] = useState(null);
    const [loading, setLoading] = useState(true);
    const {comicId} = useParams();

    useEffect(() => {
        document.body.classList.add("body-comic-page-cmpt");

        return () => {
            document.body.classList.remove("body-comic-page-cmpt");
        };
    }, []);

    useEffect(() => {
        const fetchComic = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/getComic/1`);
                setComic(response.data);
                console.log(comic);
            } catch (error) {
                console.error('Error fetching comic details:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchComic(); 
    }, [comicId]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles["comic-page-container"]}>
            <div className={styles["desc-container"]}>
                <div className={styles["desc"]}>
                    <img className={styles["cover-image"]} src={comic.coverImageURL} alt="Manga cover image"/>
                    <table>
                        <tr>
                            <th style={{textAlign:"center"}} colSpan="2">{comic.title}</th>
                        </tr>
                        <tr>
                            <td>Alternative:</td>
                            <td>{comic.alternativeTitles}</td>
                        </tr>
                        <tr>
                            <td>Author(s):</td>
                            <td>{comic.authors}</td>
                        </tr>
                        <tr>
                            <td>Status:</td>
                            <td>{comic.status}</td>
                        </tr>
                        <tr>
                            <td>Genres:</td>
                            <td>{comic.genres}</td>
                        </tr>
                    </table>
                </div>
                <div className={styles["summ"]}>
                    {comic.summary}
                </div>
            </div>

            <div className={styles["chap-list-container"]}>
                <table style={{width:"100%"}}>
                    <thead>
                        <tr style={{borderBottom:"1px solid black"}}>
                            <th style={{width:"70%"}}>Chapter name</th>
                            <th>Uploaded</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            comic.chapters.map((chapter, index) => {
                                return (
                                    <tr key={index}>
                                        <td><Link style={{textDecoration:"none"}} to={`/comic/${comic.id}/chapter/${chapter.id}`}>{chapter.name}</Link></td>
                                        <td>{chapter.uploadDate}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className={styles["cmts-container"]}>
                <div className={styles["post-cmnt"]}>
                    <form>
                        <textarea name="cmnt"></textarea>
                        <input className="btn btn-primary" type="submit" value="post"/>
                    </form>
                </div>
                
                <div className={styles["cmts-hdng"]}>
                    <p style={{margin:"0"}}>Comments</p>        
                </div>

                <div className={styles.cmts}>
                    {
                        comic.comments.map((comment, index) => {
                            return (
                                <div key={index} className={styles["cmnt-cntr"]}>
                                    <div className={styles["prfl-icon-cntr"]}>
                                        <svg 
                                            className={styles["prfl-icon"]} 
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 32 32"
                                            style={{ enableBackground: "new 0 0 32 32" }}
                                            xmlSpace="preserve"
                                        >
                                            <path d="M16 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zM27 32a1 1 0 0 1-1-1v-6.115a6.95 6.95 0 0 0-6.942-6.943h-6.116A6.95 6.95 0 0 0 6 24.885V31a1 1 0 1 1-2 0v-6.115c0-4.93 4.012-8.943 8.942-8.943h6.116c4.93 0 8.942 4.012 8.942 8.943V31a1 1 0 0 1-1 1z"/>
                                        </svg>
                                    </div>
                                    <div className={styles["cmnt-text-cntr"]}>
                                        <p className={styles["cmtr-name"]}>{comment.commentorName}</p>
                                        <p className={styles["cmnt"]}>{comment.comment}</p>
                                        <p className={styles["cmnt-date"]}>{comment.date}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};
export default Comic;