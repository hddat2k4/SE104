import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineFolderAdd } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { customerRegistrationSchema, validateForm, renderValidationMessage, clearError } from '../utils/validationSchemas';
import TitleWithIcon from './TitleWithIcon';
import Select from 'react-select';
import InputMask from 'react-input-mask';
import CustomerService from '../services/CustomerService.js';

const CustomerForm = ({ id, customer }) => {

    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [personaType, setPersonaType] = useState({ value: 'PF', label: 'Cá Nhân' });
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (customer) {
            setNome(customer.nome);
            setRua(customer.rua);
            setNumero(customer.numero);
            setBairro(customer.bairro);
            setCidade(customer.cidade);
            setEstado(customer.estado);
            setCep(customer.cep);

            if (customer.cpf) {
                setPersonaType({ value: 'PF', label: 'Cá Nhân' });
                setRg(customer.rg);
                setCpf(customer.cpf);
                setCnpj('');
            } else {
                setPersonaType({ value: 'PJ', label: 'Tổ Chức' });
                setRg('');
                setCpf('');
                setCnpj(customer.cnpj);
            }
        }
    }, [customer]);

    const saveOrUpdateCustomer = async (e) => {
        e.preventDefault();

        const clienteType = personaType.value;
        const customerData = {
            nome,
            rua,
            numero,
            bairro,
            cidade,
            estado,
            cep,
            rg: personaType.value === 'PF' ? rg : undefined,
            cpf: personaType.value === 'PF' ? cpf : undefined,
            cnpj: personaType.value === 'PJ' ? cnpj : undefined,
        };

        const errors = await validateForm(customerData, customerRegistrationSchema, personaType.value);

        setValidationErrors(errors);

        if (Object.keys(errors).length === 0) {
            const customerRequest = {
                clienteType,
                [clienteType.toLowerCase()]: customerData,
            };

            try {
                const response = id
                    ? await CustomerService.updateCustomer(id, customerRequest)
                    : await CustomerService.insertCustomer(customerRequest);

                console.log(response.data);
                window.location.href = '/khach-hang';
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handlePersonaTypeChange = (selectedOption) => {
        setPersonaType(selectedOption);
    };

    const personaOptions = [
        { value: 'PF', label: 'Cá Nhân' },
        { value: 'PJ', label: 'Tổ Chức' },
    ];

    return (
        <div className="form-container">
            <div className="form-title">
                <TitleWithIcon
                    icon={id ? <BiEdit /> : <AiOutlineFolderAdd />}
                    title={id ? "Cập Nhật Khách Hàng" : "Thêm Khách Hàng"}
                />
            </div>

            <form onSubmit={saveOrUpdateCustomer} className="form">
                <div className="form-input">
                    <label>Tên</label>
                    <input
                        type="text"
                        placeholder="Nhập tên"
                        name="nome"
                        value={nome}
                        onChange={(e) => {
                            setNome(e.target.value);
                            clearError(validationErrors, setValidationErrors, 'nome');
                        }}
                    />
                    {renderValidationMessage(validationErrors, 'nome')}
                </div>

                <div className="form-in-column">
                    <div className="form-input">
                        <label>Đường</label>
                        <input
                            type="text"
                            placeholder="Nhập tên đường"
                            name="rua"
                            value={rua}
                            onChange={(e) => {
                                setRua(e.target.value);
                                clearError(validationErrors, setValidationErrors, 'rua');
                            }}
                        />
                        {renderValidationMessage(validationErrors, 'rua')}
                    </div>

                    <div className="form-input">
                        <label>Số Nhà</label>
                        <input
                            type="number"
                            placeholder="Nhập số nhà"
                            name="numero"
                            value={numero}
                            onChange={(e) => {
                                setNumero(e.target.value);
                                clearError(validationErrors, setValidationErrors, 'numero');
                            }}
                        />
                        {renderValidationMessage(validationErrors, 'numero')}
                    </div>

                    <div className="form-input">
                        <label>Phường/Xã</label>
                        <input
                            type="text"
                            placeholder="Nhập phường/xã"
                            name="bairro"
                            value={bairro}
                            onChange={(e) => {
                                setBairro(e.target.value);
                                clearError(validationErrors, setValidationErrors, 'bairro');
                            }}
                        />
                        {renderValidationMessage(validationErrors, 'bairro')}
                    </div>
                </div>

                <div className="form-in-column">
                    <div className="form-input">
                        <label>Thành Phố</label>
                        <input
                            type="text"
                            placeholder="Nhập thành phố"
                            name="cidade"
                            value={cidade}
                            onChange={(e) => {
                                setCidade(e.target.value);
                                clearError(validationErrors, setValidationErrors, 'cidade');
                            }}
                        />
                        {renderValidationMessage(validationErrors, 'cidade')}
                    </div>

                    <div className="form-input">
                        <label>Tỉnh/Thành</label>
                        <input
                            type="text"
                            placeholder="Nhập tỉnh/thành"
                            name="estado"
                            value={estado}
                            onChange={(e) => {
                                setEstado(e.target.value);
                                clearError(validationErrors, setValidationErrors, 'estado');
                            }}
                        />
                        {renderValidationMessage(validationErrors, 'estado')}
                    </div>

                    <div className="form-input">
                        <label>Mã Bưu Chính (CEP)</label>
                        <InputMask
                            mask="99999-999"
                            maskChar="_"
                            value={cep}
                            onChange={(e) => {
                                setCep(e.target.value);
                                clearError(validationErrors, setValidationErrors, 'cep');
                            }}
                        >
                            {inputProps => (
                                <input
                                    type="text"
                                    placeholder="Nhập mã bưu chính"
                                    name="cep"
                                    {...inputProps}
                                />
                            )}
                        </InputMask>
                        {renderValidationMessage(validationErrors, 'cep')}
                    </div>
                </div>

                <div className="form-type">
                    <label>Loại Khách Hàng</label>
                </div>

                <div className="form-related">
                    <div className="form-in-column">
                        <div className="form-input">
                            <Select
                                name="personaType"
                                className="react-select"
                                classNamePrefix="react-select"
                                isSearchable={false}
                                value={personaType}
                                onChange={handlePersonaTypeChange}
                                options={personaOptions}
                            />
                        </div>
                    </div>

                    {personaType.value === 'PF' && (
                        <div className="form-in-column">
                            <div className="form-input">
                                <label>Chứng Minh Nhân Dân (RG)</label>
                                <InputMask
                                    mask="99.999.999-9"
                                    maskChar="_"
                                    value={rg}
                                    onChange={(e) => {
                                        setRg(e.target.value);
                                        clearError(validationErrors, setValidationErrors, 'rg');
                                    }}
                                >
                                    {inputProps => (
                                        <input
                                            type="text"
                                            placeholder="Nhập CMND"
                                            name="rg"
                                            {...inputProps}
                                        />
                                    )}
                                </InputMask>
                                {renderValidationMessage(validationErrors, 'rg')}
                            </div>

                            <div className="form-input">
                                <label>Mã Số Thuế Cá Nhân (CPF)</label>
                                <InputMask
                                    mask="999.999.999-99"
                                    maskChar="_"
                                    value={cpf}
                                    onChange={(e) => {
                                        setCpf(e.target.value);
                                        clearError(validationErrors, setValidationErrors, 'cpf');
                                    }}
                                >
                                    {inputProps => (
                                        <input
                                            type="text"
                                            placeholder="Nhập CPF"
                                            name="cpf"
                                            {...inputProps}
                                        />
                                    )}
                                </InputMask>
                                {renderValidationMessage(validationErrors, 'cpf')}
                            </div>
                        </div>
                    )}

                    {personaType.value === 'PJ' && (
                        <div className="form-in-column">
                            <div className="form-input">
                                <label>Mã Số Thuế Công Ty (CNPJ)</label>
                                <InputMask
                                    mask="99.999.999/9999-99"
                                    maskChar="_"
                                    value={cnpj}
                                    onChange={(e) => {
                                        setCnpj(e.target.value);
                                        clearError(validationErrors, setValidationErrors, 'cnpj');
                                    }}
                                >
                                    {inputProps => (
                                        <input
                                            type="text"
                                            placeholder="Nhập CNPJ"
                                            name="cnpj"
                                            {...inputProps}
                                        />
                                    )}
                                </InputMask>
                                {renderValidationMessage(validationErrors, 'cnpj')}
                            </div>
                        </div>
                    )}
                </div>

                <div className="button-container">
                    <button
                        type="submit"
                        className="button primary-button"
                    >
                        Lưu
                    </button>

                    <Link
                        to="/khach-hang"
                        className="button secondary-button"
                    >
                        Hủy
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;
