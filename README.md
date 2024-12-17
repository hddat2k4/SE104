# Hướng Dẫn Cài Đặt Yarn và Sử Dụng Cho Dự Án React

## 1. Tải và Cài Đặt Node.js
- **Node.js** là yêu cầu cần thiết để sử dụng Yarn.  
- Tải Node.js tại: [Download Node.js](https://nodejs.org/en/download/package-manager)  
  Khi cài đặt Node.js, trình quản lý gói **npm** sẽ được cài đặt tự động.

---

## 2. Cài Đặt Yarn
- Tải Yarn từ trang chính thức:  
  [Download Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)  
  (Nên chọn phiên bản cài đặt bằng file `.msi` để tiện lợi trên Windows.)
- Sau khi cài đặt xong, kiểm tra Yarn đã được cài đặt thành công bằng lệnh:
  ```bash
  yarn --version
  ```

---

## 3. Cài đặt các module cần thiết
- Mở commandline và lần lượt dán các lệnh sau:
    ```bash
    yarn add react-datepicker
    ```
    ```bash
    yarn add date-fns
    ```
    ```bash
    yarn add date-fns/locale/pt-BR
    ```
    ```bash
    yarn add react-datepicker/dist/react-datepicker.css
    ```
    ```bash
    yarn add react-input-mask
    ```
    ```bash
    yarn add pdfmake
    ```
    ```bash
    yarn add yup
    ```

---

## 4. Tiến hành khởi chạy:
- Truy cập vào folder frontend và mở commandline (hoặc sử dụng commandline và cd vào folder) và sử dụng lệnh

    ```bash
    yarn start
    ```
