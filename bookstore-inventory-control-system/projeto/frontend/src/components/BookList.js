import { Link } from "react-router-dom";
import livroImg from "../assets/img/livro.svg";
import BookToPDF from "../report/BookToPDF";
import "../styles/table.css"
import "../styles/button.css"
import { AiOutlinePrinter, AiOutlineFolderAdd, AiOutlineDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { GiBookmarklet } from 'react-icons/gi'
import TitleWithIcon from "./TitleWithIcon";
import formatDateToDdMonthYyyy from "../utils/formatDateToDdMonthYyyy";
import NoDataMessage from "./NoDataMessage";

const BookList = ({ bookList, onDeleteBook }) => {

  const isEmpty = bookList.length === 0;

  return (
    <>

      <div className="table-title">
        <TitleWithIcon
          icon={<GiBookmarklet />}
          title="Sách"
        />
      </div>

      <div className="button-container">
        <Link to="/them-sach" className="button primary-button">
          <AiOutlineFolderAdd className="button-icon" />
          Thêm mới
        </Link>

        <button
          onClick={(e) => BookToPDF(bookList)}
          className="button secondary-button" >
          <AiOutlinePrinter className="button-icon" />
          In
        </button>
      </div>

      {isEmpty ? (
        <NoDataMessage
          header={"Kho đang trống"}
          bodyText={"Hãy nhập thêm sách"}
          iconButton={< AiOutlineFolderAdd className="button-icon" />}
          urlButton={"/them-sach"}
        />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th> <p>Id</p> </th>
              <th> <p>Tiêu đề</p> </th>
              <th> <p>Tác giả</p> </th>
              <th> <p>Nhà xuất bản</p> </th>
              <th> <p>Ảnh bìa</p> </th>
              <th> <p>Ngày xuất bản</p> </th>
              <th> <p>Tồn kho</p> </th>
              <th> <p>Hành động</p> </th>
            </tr>
          </thead>

          <tbody>
            {bookList.map((book) => (
              <tr key={book.id}>
                <td> <p>{book.id}</p></td>
                <td> <p>{book.titulo}</p> </td>
                <td> <p>{book.autor}</p> </td>
                <td> <p>{book.editora} </p> </td>
                <td> <p><img className="book-cover-image" src={book.linkImg} alt="Ảnh bìa" /> </p> </td>
                <td> <p>{formatDateToDdMonthYyyy(book.anoPublicacao)} </p> </td>
                <td> <p>{book.estoque} </p> </td>
                <td>
                  <div className="table-action">
                    <Link
                      className="table-action-icon edit"
                      to={`/chinh-sua-sach/${book.id}`} >
                      <BiEdit />
                    </Link>

                    <button
                      className="table-action-icon"
                      onClick={() => onDeleteBook(book.id)}>
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
          src={livroImg} alt="Hình sách" />
      </div>
    </>
  );
};

export default BookList;
