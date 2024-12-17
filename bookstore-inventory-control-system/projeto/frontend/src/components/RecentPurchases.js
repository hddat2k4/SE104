import { AiOutlineShoppingCart, AiOutlineFolderAdd } from 'react-icons/ai';
import "../styles/table.css";
import "../styles/component.css";
import { convertNumberToCurrency } from "../utils/convertNumberToCurrency";
import TitleWithIcon from './TitleWithIcon';
import NoDataMessage from './NoDataMessage';

const RecentPurchases = ({ purchaseList }) => {

    const isEmpty = purchaseList.length === 0;

    return (
        <div className="container-component">

            <TitleWithIcon
                icon={<AiOutlineShoppingCart />}
                title="Đơn hàng gần đây"
            />

            {isEmpty ? (
                <NoDataMessage
                    header={"Oops, chưa có đơn hàng nào."}
                    bodyText={"Hãy thêm một đơn hàng mới"}
                    iconButton={<AiOutlineFolderAdd className="button-icon" />}
                    urlButton={"/them-don-hang"}
                />
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th> <p>Sách</p> </th>
                            <th> <p>Số lượng</p> </th>
                            <th> <p>Giá bán</p> </th>
                            <th> <p>Tổng cộng</p> </th>
                        </tr>
                    </thead>

                    <tbody>
                        {purchaseList.slice(-4).map((compra) => (
                            <tr key={compra.id}>
                                <td> <p>{compra.livro.titulo} </p> </td>
                                <td> <p>{compra.qtdItens} </p> </td>
                                <td> <p>{convertNumberToCurrency(compra.precoVenda)} </p> </td>
                                <td> <p>{convertNumberToCurrency(compra.total)} </p> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RecentPurchases;
