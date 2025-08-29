import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '@/api/products.js';

import './Catalog.scss';
import defaultProduct from '@/assets/default-product.png';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container">
            <div className="catalog">
                <h1 className="catalog__title">Каталог товаров</h1>
                {loading ? (
                    <div className="loader-wrapper">
                        <LoadingSpinner size={160} color="#3aaed8" />
                    </div>
                ) : (
                    <div className="catalog__grid">
                        {products.map((p) => (
                            <div key={p._id} className="product-card">
                                <img
                                    className="catalog__image"
                                    src={p.image}
                                    alt={p.title}
                                    onError={(e) => {
                                        e.target.src = defaultProduct;
                                    }}
                                />
                                <h2 className="catalog__name">{p.title}</h2>
                                <p className="catalog__description">
                                    {p.description}
                                </p>
                                <div className="catalog__tags">
                                    {p.tags.slice(0, 3).map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="catalog__tag"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="catalog__owner">
                                    Продавец: {p.owner.username}
                                </p>
                                <Link
                                    to={`/product/${p._id}`}
                                    className="product-info-circle"
                                >
                                    !
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;
