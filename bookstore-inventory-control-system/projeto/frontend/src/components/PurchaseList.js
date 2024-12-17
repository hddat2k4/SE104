import { Link } from "react-router-dom";
import { AiOutlinePrinter, AiOutlineFolderAdd, AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { BsFillCartCheckFill } from 'react-icons/bs';
import TitleWithIcon from "./TitleWithIcon";
import PurchaseToPDF from "../report/PurchaseToPDF";
import PurchaseImg from "../assets/img/compra.svg";
import "../styles/button.css";
import "../styles/table.css";
import { convertNumberToCurrency } from "../utils/convertNumberToCurrency";
import NoDataMessage from "./NoDataMessage";

const PurchaseList = ({ purchaseList, onDeletePurchase }) => {

    const isEmpty = purchaseList.length === 0;

    return (
        <>
            <div className="table-title">
                <TitleWithIcon
                    icon={<BsFillCartCheckFill />}
                    title="Danh sách đơn hàng"
                />
            </div>

            <div className="button-container">
                <Link
                    to="/them-don-hang"
                    className="button primary-button"
                >
                    <AiOutlineFolderAdd className="button-icon" />
                    Thêm mới
                </Link>

                <button
                    onClick={(e) => PurchaseToPDF(purchaseList)}
                    className="button secondary-button"
                >
                    <AiOutlinePrinter className="button-icon" />
                    In báo cáo
                </button>
            </div>

            {isEmpty ? (
                <NoDataMessage
                    header={"Oops, chưa có đơn hàng nào."}
                    bodyText={"Hãy thêm một đơn hàng mới"}
                    iconButton={< AiOutlineFolderAdd className="button-icon" />}
                    urlButton={"/them-don-hang"}
                />
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th> <p>ID</p> </th>
                            <th> <p>Sách</p> </th>
                            <th> <p>Số lượng</p> </th>
                            <th> <p>Giá bán</p> </th>
                            <th> <p>Tổng cộng</p> </th>
                            <th> <p>Hành động</p> </th>
                        </tr>
                    </thead>

                    <tbody>
                        {purchaseList.map((purchase) => (
                            <tr key={purchase.id}>
                                <td> <p>{purchase.id}</p></td>
                                <td> <p>{purchase.livro.titulo}</p> </td>
                                <td> <p>{purchase.qtdItens}</p> </td>
                                <td> <p>{convertNumberToCurrency(purchase.precoVenda)} </p> </td>
                                <td> <p>{convertNumberToCurrency(purchase.total)} </p> </td>
                                <td>
                                    <div className="table-action">
                                        <Link
                                            className="table-action-icon edit"
                                            to={`/chinh-sua-don-hang/${purchase.id}`} >
                                            <BiEdit />
                                        </Link>

                                        <button
                                            className="table-action-icon"
                                            onClick={() => onDeletePurchase(purchase.id)}>
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }

            <div className="table-img">
                <img
                    src={PurchaseImg} alt="Ảnh minh họa đơn hàng" />
            </div>
        </>
    );
};

export default PurchaseList;
