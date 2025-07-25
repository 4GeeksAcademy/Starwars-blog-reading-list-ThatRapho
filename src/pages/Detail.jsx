import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const categoryFields = {
    films: ["title", "director", "producer", "release_date", "opening_crawl"],
    planets: ["name", "climate", "terrain", "population", "gravity"],
    people: ["name", "height", "mass", "hair_color", "skin_color", "birth_year"],
    starships: ["name", "model", "manufacturer", "cost_in_credits", "crew"],
    vehicles: ["name", "model", "manufacturer", "vehicle_class"],
    species: ["name", "classification", "designation", "language"],
};

const Detail = () => {
    const navigate = useNavigate();
    const { category, id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getItem = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://www.swapi.tech/api/${category}/${id}`);
                if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

                const data = await res.json();
                setItem(data.result.properties);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getItem();
    }, [category, id]);

    const renderUrlLinks = (urls) => {
        if (!Array.isArray(urls)) return urls;

        return urls.map((url) => {
            const match = url.match(/\/api\/(\w+)\/(\d+)/);
            if (!match) return url;

            const [, cat, itemId] = match;
            return (
                <Link key={url} to={`/detail/${cat}/${itemId}`} className="me-2">
                    {cat} #{itemId}
                </Link>
            );
        });
    };

    if (loading) return <p className="text-warning">Loading...</p>;
    if (error) return <p className="text-danger">Error: {error}</p>;
    if (!item) return <p className="text-danger">No data found.</p>;

    const fieldsToShow = categoryFields[category] || Object.keys(item);

    return (
        <div className="min-vh-100 bg-dark text-light py-5 px-3">
            <div className="container">
                <h1 className="display-4 text-warning mb-4 fw-bold text-capitalize">
                    {item.title || item.name || `Detail for ${category} #${id}`}
                </h1>

                <div className="row g-4 align-items-start">
                    <div className="col-md-6">
                        <img
                            src={`/img/images/${category}/${id}.jpg`}
                            alt={item.title || item.name}
                            className="img-fluid rounded shadow-lg mb-4"
                            onError={(e) => (e.target.style.display = "none")} // hide broken images
                        />
                    </div>
                    <div className="col-md-6 ">
                        <div className="bg-secondary p-4 rounded shadow-lg">
                            {fieldsToShow.map((field) => {
                                const value = item[field];
                                if (value === undefined || value === null) return null;

                                const isUrlArray =
                                    Array.isArray(value) && value.length > 0 && typeof value[0] === "string" && value[0].startsWith("http");

                                return (
                                    <p key={field} className="mb-2">
                                        <strong className="text-warning text-capitalize">{field.replace(/_/g, " ")}:</strong>{" "}
                                        {isUrlArray ? renderUrlLinks(value) : String(value)}
                                    </p>
                                );
                            })}
                        </div>
                        <span className="d-flex justify-content-end mt-5">
                            <button type="button" class="btn btn-light me-2" onClick={() => navigate(`/`)}><i className="fa-regular fa-heart"></i></button>
                            <button type="button" class="btn btn-warning" onClick={() => navigate(`/`)}>Back to Home</button>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Detail;
