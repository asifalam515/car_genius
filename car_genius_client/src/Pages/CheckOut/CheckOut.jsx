import { useLoaderData } from "react-router-dom";

const CheckOut = () => {
  const loadedData = useLoaderData();
  const { price, service_id, title } = loadedData;

  return (
    <div>
      <h1 className="text-3xl">Book Services for {title} </h1>
      <div>
        <form className="card-body">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                name="fname"
                type="text"
                placeholder="First Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                name="lname"
                type="text"
                placeholder="Last Name"
                className="input input-bordered"
                required
              />
              <label className="label"></label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Phone</span>
              </label>
              <input
                name="phone"
                type="number"
                placeholder="Your Phone"
                className="input input-bordered"
                required
              />
              <label className="label"></label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                className="input input-bordered"
                required
              />
              <label className="label"></label>
            </div>
            <div className="form-control mt-6 col-span-2">
              <button className="btn btn-block">Order Confirm</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
