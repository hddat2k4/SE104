import { Link } from "react-router-dom";
import TitleWithIcon from "./TitleWithIcon";
import SaleToPDF from "../report/SaleToPDF";
import SaleImg from "../assets/img/venda.svg";
import { convertNumberToCurrency } from "../utils/convertNumberToCurrency";
import { AiOutlinePrinter, AiOutlineFolderAdd, AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import "../styles/button.css";
import "../styles/table.css";
import NoDataMessage from "./NoDataMessage";

const SaleList = ({ saleList, onDeleteSale }) => {

    const isEmpty = saleList.length === 0;

    return (
        <>
            <div className="table-title">
                <TitleWithIcon
                    icon={<BsFillCreditCard2FrontFill />}
                    title="Danh sách bán hàng"
                />
            </div>

            <div className="button-container">
                <Link
                    to="/add-venda"
                    className="button primary-button"
                >
                    <AiOutlineFolderAdd className="button-icon" />
                    Thêm mới
                </Link>

                <button
                    onClick={(e) => SaleToPDF(saleList)}
                    className="button secondary-button"
                >
                    <AiOutlinePrinter className="button-icon" />
                    In báo cáo
                </button>
            </div>

            {isEmpty ? (
                <NoDataMessage
                    header={"Oops, chưa có giao dịch nào."}
                    bodyText={"Hãy thêm một giao dịch mới"}
                    iconButton={<AiOutlineFolderAdd className="button-icon" />}
                    urlButton={"/add-venda"}
                />
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th> <p>ID</p> </th>
                            <th> <p>Khách hàng</p> </th>
                            <th> <p>Sách</p> </th>
                            <th> <p>Số lượng</p> </th>
                            <th> <p>Giá bán</p> </th>
                            <th> <p>Tổng cộng</p> </th>
                            <th> <p>Hành động</p> </th>
                        </tr>
                    </thead>

                    <tbody>
                        {saleList.map((sale) => (
                            <tr key={sale.id}>
                                <td> <p>{sale.id}</p></td>
                                <td> <p>{sale.clienteNome}</p> </td>
                                <td> <p>{sale.livro.titulo}</p> </td>
                                <td> <p>{sale.qtdItens}</p> </td>
                                <td> <p>{convertNumberToCurrency(sale.precoVenda)} </p> </td>
                                <td> <p>{convertNumberToCurrency(sale.total)} </p> </td>
                                <td>
                                    <div className="table-action">
                                        <Link
                                            className="table-action-icon edit"
                                            to={`/edit-venda/${sale.id}`} >
                                            <BiEdit />
                                        </Link>

                                        <button
                                            className="table-action-icon"
                                            onClick={() => onDeleteSale(sale.id)}>
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="table-img">
                <img
                    src={SaleImg} alt="Hình minh họa bán hàng" />
            </div>
        </>
    );

};

export default SaleList;
