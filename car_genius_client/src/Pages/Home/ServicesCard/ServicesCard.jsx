import { Link } from "react-router-dom";

const ServicesCard = ({ service }) => {
  const { title, img, price, _id } = service;
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p className="text-xl text-orange-500 font-bold">${price}</p>
        <div className="card-actions">
          <Link to={`/${_id}`}>
            {" "}
            <button className="btn btn-primary">Book Service</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
