import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import '../styles/form.css';
import '../styles/button.css';
import { AiOutlineFolderAdd } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import TitleWithIcon from './TitleWithIcon';
import { saleRegistrationSchema, validateForm, renderValidationMessage, clearError } from '../utils/validationSchemas';
import SaleService from '../services/SaleService';
import { convertNumberToCurrency } from '../utils/convertNumberToCurrency';

const SaleForm = ({ id, sale, bookList, customerList }) => {

    const [saleForm, setSaleForm] = useState({
        customerName: '',
        bookId: '',
        qtdItens: '',
        salePrice: ''
    });

    const [total, setTotal] = useState(0);

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (sale && sale.livro) {
            setSaleForm(prevSaleForm => ({
                ...prevSaleForm,
                customerName: sale.clienteNome,
                bookId: sale.livro.id,
                qtdItens: sale.qtdItens || 0,
                salePrice: sale.precoVenda || 0,
            }));
        }
    }, [sale]);

    useEffect(() => {
        setTotal(saleForm.qtdItens * saleForm.salePrice);
    }, [saleForm.qtdItens, saleForm.salePrice]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSaleForm({
            ...saleForm,
            [name]: value,
        });

        clearError(validationErrors, setValidationErrors, [name]);
    };

    const saveOrUpdateBook = async (e) => {
        e.preventDefault();

        const errors = await validateForm(saleForm, saleRegistrationSchema);

        setValidationErrors(errors);

        const saleData = {
            clienteNome: saleForm.customerName,
            livro: {
                id: saleForm.bookId
            },
            qtdItens: saleForm.qtdItens,
            precoVenda: saleForm.salePrice
        };

        if (Object.keys(errors).length === 0) {
            try {
                if (id) {
                    await SaleService.updateSale(id, saleData);
                    window.location.href = '/ban-hang';
                } else {
                    await SaleService.insertSale(saleData);
                    window.location.href = '/ban-hang';
                }
            } catch (error) {
                console.error(error);
            }
        };
    }

    const bookOptions = bookList.map((bookItem) => ({
        value: bookItem.id,
        label: bookItem.titulo,
    }));

    const customerOptions = customerList.map((customerItem) => ({
        value: customerItem.nome,
        label: customerItem.nome,
    }));

    return (
        <div className="form-container">

            <div className="form-title">
                <TitleWithIcon
                    icon={id ? <BiEdit /> : <AiOutlineFolderAdd />}
                    title={id ? "Cập nhật giao dịch" : "Thêm giao dịch"}
                />
            </div>

            <form className='form'>
                <div className="form-input">
                    <label>Khách hàng</label>
                    <Select
                        name="customerName"
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="Chọn khách hàng"
                        isSearchable={false}
                        value={customerOptions.find(
                            option => option.value === saleForm.customerName
                        )}
                        onChange={(e) => {
                            setSaleForm({
                                ...saleForm,
                                customerName: e.value,
                            })
                            clearError(validationErrors,
                                setValidationErrors,
                                'customerName');
                        }}
                        options={customerOptions}
                    />
                    {renderValidationMessage(validationErrors, 'customerName')}
                </div>

                <div className="form-input">
                    <label>Sách</label>
                    <Select
                        name="bookId"
                        className="react-select"
                        classNamePrefix="react-select"
                        placeholder="Chọn sách"
                        isSearchable={false}
                        value={bookOptions.find(
                            option => option.value === saleForm.bookId
                        )}
                        onChange={(e) => {
                            setSaleForm({
                                ...saleForm,
                                bookId: e.value,
                            })
                            clearError(validationErrors,
                                setValidationErrors,
                                'bookId');
                        }}
                        options={bookOptions}
                    />
                    {renderValidationMessage(validationErrors, 'bookId')}

                </div>

                <div className="form-in-column">
                    <div className="form-input">
                        <label>Số lượng</label>
                        <input
                            type="number"
                            placeholder="Nhập số lượng"
                            name="qtdItens"
                            value={saleForm.qtdItens}
                            onChange={handleChange}
                        >
                        </input>
                        {renderValidationMessage(validationErrors, 'qtdItens')}
                    </div>

                    <div className="form-input">
                        <label>Giá bán</label>
                        <input
                            type="number"
                            step="0.1"
                            min='0'
                            placeholder="Nhập giá bán"
                            name="salePrice"
                            value={saleForm.salePrice}
                            onChange={handleChange}
                        >
                        </input>
                        {renderValidationMessage(validationErrors, 'salePrice')}
                    </div>


                    <div className="form-input">
                        <label>Tổng cộng</label>
                        <input
                            type="text"
                            value={convertNumberToCurrency(total)}
                            style={{ backgroundColor: 'var(--second-color)' }} 
                            disabled
                        />
                        <input
                            type="hidden"
                            name="totalValue"
                            value={saleForm.total}
                        />
                    </div>
                </div>

                <div className='button-container'>
                    <button
                        type="submit"
                        className="button primary-button"
                        onClick={(e) => saveOrUpdateBook(e)}
                    >
                        Lưu
                    </button>

                    <Link
                        to="/ban-hang"
                        className="button secondary-button ">
                        Hủy bỏ
                    </Link>
                </div>
            </form >

        </div >
    );

};

export default SaleForm;
