import { useEffect, useState } from 'react';
import styles from './Chapter.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Chapter = () => {
    const [pageNum, setPageNum] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSorted, setIsSorted] = useState(false);
    const [sortedImages, setSortedImages] = useState([]);
    const {chapId} = useParams()

    useEffect(() => {
        document.body.classList.add("body-comic-cmpt");

        return () => {
            document.body.classList.remove("body-comic-cmpt");
        };
    }, []);

    useEffect(() => {
        const handleKeyPress = (event) => {
            console.log(`key pressed: ${event.key}`);

            if(event.key === "ArrowRight") {
                nextPage();
            } else if(event.key === "ArrowLeft") {
                prevPage();
            }
        }

        window.addEventListener("keydown", handleKeyPress);
            
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        }
    }, [pageNum]);

    const nextPage = () => {
        // let lastPage = Object.keys(comicPages)[Object.keys(comicPages).length - 1];
        let lastPage = chapter.images.length-1;
        if(pageNum < lastPage) {
            setPageNum(currPage => currPage+1);
        }
        console.log(pageNum);
    }

    const prevPage = () => {
        if(pageNum > 0) {
            setPageNum(currPage => currPage-1);
        }
        console.log(pageNum);
    }

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    }

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/getChapter/${chapId}`);
                setChapter(response.data);
            } catch (error) {
                console.error('Error fetching comic details:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchChapter(); 
    }, [chapId]);

    useEffect(() => {
        if (chapter && chapter.images) {
            setSortedImages(chapter.images.sort((a, b) => a.number - b.number));
            console.log(sortedImages); // Logs the fetched data
            setIsSorted(true);
        }
    }, [chapter]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles["chptr-container"]}>
            {isChecked ? (
                <div className={styles['chptr-page-cntr']}>
                    <div className={styles['ctrls-container']}>
                        <div className={styles['chkbx-container']}>
                            <input 
                                type='checkbox' 
                                id='check'
                                checked={isChecked} 
                                onChange={handleCheckboxChange} 
                            />
                            <label htmlFor='check' className={styles['tgl-btn']}></label>
                            <label htmlFor='check'>Webcomic format</label>
                        </div>
                    </div>   
                    <div className={styles['cmc-img-cntr']}> 
                        {   
                            // Object.entries(comicPages).map(([key, value]) => (
                            //     <img key={key} src={value}/>
                            // ))

                            sortedImages.map((image, index) => (
                                <img key={index} src={image.url}/>
                            ))
                        }
                    </div>
                </div>
            ) : (
                <div className={styles['chptr-page-cntr']}>
                    <div className={styles['ctrls-container']}>
                        <button className="btn btn btn-outline-primary" onClick={prevPage}>Previous page</button>
                        <button className="btn btn btn-outline-primary" onClick={nextPage}>Next page</button>
                        <div className={styles['chkbx-container']}>
                            <input 
                                type='checkbox' 
                                id='check'
                                checked={isChecked} 
                                onChange={handleCheckboxChange} 
                            />
                            <label for='check' className={styles['tgl-btn']}></label>
                            <label htmlFor='check'>Webcomic format</label>
                        </div>
                    </div>    
                    {isSorted && (
                        <img src={sortedImages[pageNum].url} alt="comic page" />
                    )}
                </div>    
            )}

            <div className={styles["cmts-container"]}>
                <div className={styles["post-cmnt"]}>
                    <form>
                        <textarea name="cmnt"></textarea>
                        <input className="btn btn-outline-primary" type="submit" value="post"/>
                    </form>
                </div>

                <div className={styles["cmts-hdng"]}>
                    <p style={{margin:"0"}}>Comments</p>        
                </div>
                
                <div className={styles["cmts"]}>
                    <p style={{fontWeight:'bold'}}>Comments</p>
                    {
                        chapter.comments.map((comment, index) => {
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
export default Chapter;