/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Skeleton } from "../../components/loader";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userApi";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { responseToast } from "../../utils/features";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isError, isLoading, error } = useAllUsersQuery(user?._id!);

  const [deleteUser] = useDeleteUserMutation();

  const [rows, setRows] = useState<DataType[]>([]);

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({userId, adminUserId: user?._id!});
    responseToast(res, null, "");
  }

  const err = error as CustomError;
  if (isError) {
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(data.data.map((i) => ({
        avatar: (
          <img alt={i.name} src={i.photo} style={{borderRadius: '50%'}} />
        ),
        name: i.name,
        email: i.email,
        gender: i.gender,
        role: i.role,
        action: (
          <button onClick={() => deleteHandler(i._id)}> <FaTrash /> </button>
        )
      })));
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
    </div>
  );
};

export default Customers;
