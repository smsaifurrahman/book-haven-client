
import { useGetMyOrdersQuery } from "../../redux/feature/order/order";
import { useGetSingleUserQuery } from "../../redux/feature/user/user.api";



const ViewMyOrders = () => {
    const {data} = useGetSingleUserQuery(undefined);
    const user_id = data?.data?._id
  

    const {data: orderData} = useGetMyOrdersQuery(user_id);
    console.log('orderData', orderData);

    return (
        <div>
            my orders
        </div>
    );
};

export default ViewMyOrders;