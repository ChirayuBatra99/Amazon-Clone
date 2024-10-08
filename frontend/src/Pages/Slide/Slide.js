import React, { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Divider } from '@mui/material';
import styles from './Slide.module.scss'
import { addToCart } from '../../redux/features/cartSlice';
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const responsive = {

    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


function Slide({header, sectionId}) {
    const dispatch = useDispatch();
    const [cardData, setCardData] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const baseURL = "http://localhost:8005"

    const handleClick = (e) => {
        navigate(`/getproductsone/${sectionId}/${e}`)
        console.log("prodcut data", e);
    }

    const getAll = async () => {
        const res = await fetch(`${baseURL}/getproducts/${sectionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (res.status !== 201) {
            console.log("cant get all producst")
            alert("No data available for this product");
        }
        else {
            const data = await res.json();
            console.log("getinddata", data)
            setProducts(data);
        }
    };

    useEffect(() => {
        setTimeout(getAll, 1000); getAll();
    }, []);




    const { carts } = useSelector((state) => state.allCart);

    return (
        <div className='product-sectin'>
            <div className='products-dea'>
                <h3>{header}</h3>
                <Divider />

                <Carousel
                    className={styles.container}
                    infinite={true}
                    responsive={responsive}
                    draggable={false}
                    swipeable={true}
                    showDots={false}
                    centerMode={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    containerClass="carousel-container"
                >
                    {products.map((e) => (

                        <div className={styles.productsitems}>
                            <div className={styles.product_img}>
                                <img className={styles.indImage} src={e.url} alt="product image" onClick={() => handleClick(e._id)} />
                            </div>
                            <p className={styles.products_name}>{e.title.longTitle}</p>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                <p className={styles.products_name}>₹{e.price.cost} </p>
                                <p className={styles.price_tag}> {e.discount}</p>
                            </div>
                            <p className={styles.tag}>{e.tagline}</p>
                        </div>
                    ))}

                </Carousel>
            </div>
        </div>
    )
}

export default Slide
