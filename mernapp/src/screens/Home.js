import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
//import Carousal from '../components/Carousal';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            response = await response.json();
            setFoodItem(response[0]);
            setFoodCat(response[1]);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?fries" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container">
                {foodCat.length !== 0 ? (
                    foodCat.map((category) => (
                        <div className="row mb-3" key={category._id}>
                            <div className="fs-3 m-3">{category.CategoryName}</div>
                            <hr />
                            {foodItem.length !== 0 ? (
                                foodItem
                                    .filter((item) => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                    .map((filterItems) => (
                                        <div className="col-12 col-md-6 col-lg-3" key={filterItems._id}>
                                            <Card foodItem={filterItems.name} options={filterItems.options[0]} imgSrc={filterItems.img} > </Card>
                                        </div>
                                    ))
                            ) : (
                                <div>No Such Data Found</div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No Categories Found</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
