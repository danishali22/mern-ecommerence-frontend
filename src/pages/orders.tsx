import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../types/reducer-types";
import { useMyOrdersQuery } from "../redux/api/order";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../components/loader";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const { data, isLoading, isError, error } = useMyOrdersQuery(user?._id!);

  const err = error as CustomError;
  if (isError) {
    toast.error(err.data.message);
  }

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data && data.data)
      setRows(
        data.data.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/order/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);
  
  const Table = TableHOC<DataType>(
    column,
    rows,
    "dasboard-produc-box",
    "Orders",
    rows.length > 6
  )();

  return (
    <div className="container">
      <h1>My Orders</h1>
      <main>{isLoading ? <Skeleton length={20}/> : Table}</main>
    </div>
  );
};

export default Orders;
