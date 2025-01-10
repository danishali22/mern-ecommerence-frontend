import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import { Skeleton } from "../../components/loader";
import { useAllCouponsQuery } from "../../redux/api/couponApi";

interface DataType {
  code: string;
  amount: number;
  _id: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


const Coupon = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const { data, isLoading, isError, error } = useAllCouponsQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data)
      setRows(
        data.data.map((i) => ({
          _id: i._id,
          code: i.code,
          amount: i.amount,
          action: <Link to={`/admin/coupon/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const err = error as CustomError;
  if (isError) {
    toast.error(err.data.message);
  }

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-coupon-box",
    "Coupons",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
      <Link to="/admin/coupon/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Coupon;
