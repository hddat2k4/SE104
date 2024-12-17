import React from "react";
import { Link } from "react-router-dom"
import { AiOutlinePrinter, AiOutlineFolderAdd, AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { IoIosPeople } from 'react-icons/io';
import TitleWithIcon from "./TitleWithIcon";
import CustomerImg from "../assets/img/client.svg";
import CustomertoPdf from "../report/CustomerToPdf";
import "../styles/button.css";
import "../styles/table.css";
import NoDataMessage from "./NoDataMessage";

const CustomerList = ({ customerList, onDeleteCustomer }) => {

    const isEmpty = customerList.length === 0;

    return (
        <>
            <div className="table-title">
                <TitleWithIcon
                    icon={<IoIosPeople />}
                    title="Khách Hàng"
                />
            </div>

            <div className="button-container">
                <Link to="/them-khach-hang" className="button primary-button">
                    <AiOutlineFolderAdd className="button-icon" />
                    Thêm Mới
                </Link>

                <button
                    onClick={(e) => CustomertoPdf(customerList)}
                    className="button secondary-button" >
                    <AiOutlinePrinter className="button-icon" />
                    In
                </button>
            </div>

            {isEmpty ? (
                <NoDataMessage
                    header={"Oops, không có khách hàng nào."}
                    bodyText={"Thêm một khách hàng"}
                    iconButton={< AiOutlineFolderAdd className="button-icon" />}
                    urlButton={"/them-khach-hang"}
                />
            ) :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th> <p>Id</p> </th>
                                <th> <p>Tên</p> </th>
                                <th> <p>Đường</p> </th>
                                <th> <p>Số Nhà</p> </th>
                                <th> <p>Phường/Xã</p> </th>
                                <th> <p>Thành Phố</p> </th>
                                <th> <p>Tỉnh/Thành</p> </th>
                                <th> <p>Mã Bưu Điện</p> </th>
                                <th> <p>Hành Động</p> </th>
                            </tr>
                        </thead>

                        <tbody>
                            {customerList.map((customer) => (
                                <tr key={customer.id}>
                                    <td> <p className="p_td">{customer.id}</p></td>
                                    <td> <p className="p_td">{customer.nome}</p> </td>
                                    <td> <p className="p_td">{customer.rua}</p> </td>
                                    <td> <p className="p_td">{customer.numero} </p> </td>
                                    <td> <p className="p_td">{customer.bairro} </p> </td>
                                    <td> <p className="p_td">{customer.cidade} </p> </td>
                                    <td> <p className="p_td">{customer.estado} </p> </td>
                                    <td> <p className="p_td">{customer.cep} </p> </td>
                                    <td>
                                        <div className="table-action">

                                            <Link
                                                className="table-action-icon edit"
                                                to={`/sua-khach-hang/${customer.id}`} >
                                                <BiEdit />
                                            </Link>

                                            <button
                                                className="table-action-icon"
                                                onClick={() => onDeleteCustomer(customer.id)}>
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
                    src={CustomerImg}
                    alt="Hình ảnh khách hàng"
                />
            </div>
        </>
    );
};

export default CustomerList;
