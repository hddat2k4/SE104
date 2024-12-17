import * as yup from 'yup';

export const bookRegistrationSchema = yup.object({
    titulo: yup.string()
        .min(3, 'Tiêu đề phải có ít nhất 3 ký tự.')
        .max(50, 'Tiêu đề không được vượt quá 50 ký tự.')
        .required('Tiêu đề là bắt buộc.'),

    autor: yup.string()
        .min(3, 'Tên tác giả phải có ít nhất 3 ký tự.')
        .max(50, 'Tên tác giả không được vượt quá 50 ký tự.')
        .required('Tên tác giả là bắt buộc.'),

    editora: yup.string()
        .min(3, 'Tên nhà xuất bản phải có ít nhất 3 ký tự.')
        .max(50, 'Tên nhà xuất bản không được vượt quá 50 ký tự.')
        .required('Nhà xuất bản là bắt buộc.'),

    linkImg: yup.string()
        .required('Liên kết hình ảnh là bắt buộc.')
        .url('Liên kết hình ảnh không hợp lệ.'),

    anoPublicacao: yup.string()
        .required('Năm xuất bản là bắt buộc.'),

    estoque: yup.number()
        .typeError('Số lượng tồn kho là bắt buộc.')
        .integer('Số lượng tồn kho phải là một số nguyên.')
        .required('Số lượng tồn kho là bắt buộc.'),
});

export const customerRegistrationSchema = yup.object({
    nome: yup.string()
        .min(3, 'Tên phải có ít nhất 3 ký tự.')
        .max(50, 'Tên không được vượt quá 50 ký tự.')
        .required('Tên là bắt buộc.'),

    rua: yup.string()
        .min(3, 'Tên đường phải có ít nhất 3 ký tự.')
        .max(50, 'Tên đường không được vượt quá 50 ký tự.')
        .required('Tên đường là bắt buộc.'),

    numero: yup.number()
        .typeError('Số nhà là bắt buộc.')
        .integer('Số nhà phải lớn hơn 0.')
        .required('Số nhà là bắt buộc.'),

    bairro: yup.string()
        .min(3, 'Phường/xã phải có ít nhất 3 ký tự.')
        .max(30, 'Phường/xã không được vượt quá 30 ký tự.')
        .required('Phường/xã là bắt buộc.'),

    cidade: yup.string()
        .min(3, 'Thành phố phải có ít nhất 3 ký tự.')
        .max(30, 'Thành phố không được vượt quá 30 ký tự.')
        .required('Thành phố là bắt buộc.'),

    estado: yup.string()
        .min(2, 'Tỉnh/Thành phố phải có ít nhất 2 ký tự.')
        .max(20, 'Tỉnh/Thành phố không được vượt quá 20 ký tự.')
        .required('Tỉnh/Thành phố là bắt buộc.'),

    cep: yup.string()
        .min(7, 'Mã bưu điện phải có ít nhất 7 ký tự.')
        .max(11, 'Mã bưu điện không được vượt quá 11 ký tự.')
        .required('Mã bưu điện là bắt buộc.'),

    rg: yup.string().when('$personaType', {
        is: 'PF',
        then: yup.string()
            .min(9, 'Số CMND phải có ít nhất 9 ký tự.')
            .max(12, 'Số CMND không được vượt quá 12 ký tự.')
            .required('Số CMND là bắt buộc.'),
    }),

    cpf: yup.string().when('$personaType', {
        is: 'PF',
        then: yup.string()
            .min(11, 'Số CPF phải có 11 ký tự.')
            .max(15, 'Số CPF không được vượt quá 15 ký tự.')
            .required('Số CPF là bắt buộc.'),
    }),

    cnpj: yup.string().when('$personaType', {
        is: 'PJ',
        then: yup.string()
            .min(14, 'Số CNPJ phải có 14 ký tự.')
            .max(20, 'Số CNPJ không được vượt quá 20 ký tự.')
            .required('Số CNPJ là bắt buộc.'),
    }),

});

export const purchaseRegistrationSchema = yup.object({
    bookId: yup.string()
        .typeError('Cần chọn một cuốn sách.')
        .required('Cần chọn một cuốn sách.'),

    qtdItens: yup.number()
        .typeError('Số lượng là bắt buộc.')
        .positive('Số lượng phải lớn hơn 0.')
        .required('Số lượng là bắt buộc.'),

    precoVenda: yup.number()
        .typeError('Giá bán là bắt buộc.')
        .positive('Giá bán phải lớn hơn 0.')
        .required('Giá bán là bắt buộc.'),
});

export const saleRegistrationSchema = yup.object({
    customerName: yup.string()
        .typeError('Cần chọn một khách hàng.')
        .required('Cần chọn một khách hàng.'),

    bookId: yup.string()
        .typeError('Cần chọn một cuốn sách.')
        .required('Cần chọn một cuốn sách.'),

    qtdItens: yup.number()
        .typeError('Số lượng là bắt buộc.')
        .positive('Số lượng phải lớn hơn 0.')
        .required('Số lượng là bắt buộc.'),

    salePrice: yup.number()
        .typeError('Giá bán là bắt buộc.')
        .positive('Giá bán phải lớn hơn 0.')
        .required('Giá bán là bắt buộc.'),
});

export const validateForm = async (values, schema, personaType) => {
    try {
        await schema.validate(values, { context: { personaType }, abortEarly: false });
        return {};
    } catch (error) {
        const validationErrors = {};
        error.inner.forEach(err => {
            validationErrors[err.path] = err.message;
        });
        return validationErrors;
    }
};

export const renderValidationMessage = (validationErrors, field) => {
    if (validationErrors[field]) {
        return (
            <div className="error-message">
                {validationErrors[field]}
            </div>
        );
    }
    return null;
};

export const clearError = (validationErrors, setValidationErrors, field) => {
    if (validationErrors[field]) {
        setValidationErrors((errors) => ({ ...errors, [field]: '' }));
    }
};
