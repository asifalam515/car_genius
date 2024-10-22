import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const url = `http://localhost:5000/bookings?email=${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="button" className="button" />
                </label>
              </th>
              <th>Customer Name</th>
              <th>Service</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {/* {bookings.map((booking) => (
            <BookingRow
              key={booking._id}
              handleDelete={handleDelete}
              handleBookingConfirm={handleBookingConfirm}
              booking={booking}
            ></BookingRow>
          ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
