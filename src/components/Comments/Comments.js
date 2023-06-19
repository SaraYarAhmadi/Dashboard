import React, { useReducer } from "react";
import ErrorBox from "../Errorbox/Errorbox";
import DetailsModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import Button from 'react-bootstrap/Button';
import "./Comments.css";

const comments = [
  {
    id: 3,
    isAccept: 0,
    body: "این محصول خیلی خوب بود. ممنون از سایت خوبتونییی",
    date: "1401-07-01",
    hour: "01:19",
    userID: "علیرضا",
    productID: "عینک آفتابی"
  }, {
    id: 1,
    isAccept: 0,
    body: "سلام، من از این محصول رضایت کافی رو دارم",
    date: "1401-07-12",
    hour: "12:01",
    userID: "حسین",
    productID: "کوله پشتی"
  }, {
    id: 4,
    isAccept: 0,
    body: "سلام از محصول رضایت نداشتم کیفیت لازم را نداشت ",
    date: "1402-11-11",
    hour: "14:25",
    userID: "علی",
    productID: "ساعت هوشمند"
  }
];

const initialData = {
  allComments: comments,
  isShowDetailsModal: false,
  isShowDeleteModal: false,
  isShowEditModal: false,
  isShowAcceptModal: false,
  isShowRejectModal: false,
  mainCommentBody: '',
  commentID: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_AllCOMMENTS':
      return { ...state, allComments: action.payload.allComments }
    case 'SET_IsShowDetailsModal':
      return { ...state, isShowDetailsModal: action.payload.isShowDetailsModal }
    case 'SET_IsShowDeleteModal':
      return { ...state, isShowDeleteModal: action.payload.isShowDeleteModal }
    case 'SET_IsShowEditModal':
      return { ...state, isShowEditModal: action.payload.isShowEditModal }
    case 'SET_MainCommentBody':
      return { ...state, mainCommentBody: action.payload.mainCommentBody }
    case 'SET_commentID':
      return { ...state, commentID: action.payload.commentID }
    default:
      throw new Error(`Unsupported action type ${action.type} in commentsReducer`);
  }
};

export default function Comments() {
  const [state, dispatch] = useReducer(reducer, initialData);
  
  const getAllComments = (newComments) => dispatch({ type: 'SET_AllCOMMENTS', payload: { allComments: newComments } });
  const closeDetailsModal = () => dispatch({ type: 'SET_IsShowDetailsModal', payload: { isShowDetailsModal: false, } });
  const closeDeleteModal = () => dispatch({ type: 'SET_IsShowDeleteModal', payload: { isShowDeleteModal: false, } });
  const closeEditModal = () => dispatch({ type: 'SET_IsShowEditModal', payload: { isShowEditModal: false, } });

  const deleteComment = () => {
    const newComments = state.allComments.filter(comment => comment.id !== state.commentID);
    getAllComments(newComments);
    dispatch({ type: 'SET_IsShowDeleteModal', payload: { isShowDeleteModal: false, } })
  };

  const updateComment = (event) => {
    event.preventDefault();

    const newComments = state.allComments.map(comment => {
      if (comment.id === state.commentID) {
        return { ...comment, body: state.mainCommentBody }
      } else {
        return comment;
      };
    });

    dispatch({ type: 'SET_IsShowEditModal', payload: { isShowEditModal: false, } })
    getAllComments(newComments);
  };

  return (
    <div className="cms-main">
      {state.allComments.length ? (
        <div>
          <div className="product-item flexBasic text-dark bg-light py-5 product-item-title px-2 mt-3 border border-bottom-1 border-secondary">
              <p className="w-25 text-center fw-bold">اسم کاربر</p>
              <p className="w-25 text-center fw-bold">محصول</p>
              <p className="w-25 text-center fw-bold">کامنت</p>
              <p className="w-25 text-center fw-bold">تاریخ</p>
              <p className="w-25 text-center fw-bold">ساعت</p>
              <p className="w-50 text-center fw-bold">عملیات</p>
          </div>
          <div>
            {state.allComments.map((comment) => (
              <div key={comment.id} className="product-item comments-item flexBasic text-dark bg-light py-5 px-2">
                <p className="w-25 text-center">{comment.userID}</p>
                <p className="w-25 text-center">{comment.productID}</p>
                <div className="w-25 text-center">
                  <Button
                  className="btn-info border-0 py-md-3 px-md-3 fw-bold"
                    onClick={() => {
                      dispatch({ type: 'SET_MainCommentBody', payload: { mainCommentBody: comment.body } });
                      dispatch({ type: 'SET_IsShowDetailsModal', payload: { isShowDetailsModal: true, } });
                    }}
                  >
                    دیدن متن
                  </Button>
                </div>
                <p className="w-25 text-center">{comment.date}</p>
                <p className="w-25 text-center">{comment.hour}</p>
                <div className="w-50 text-center">
                  <Button
                  className="border-0 py-md-3 px-md-4 bg-danger fw-bold"
                    onClick={() => {
                      dispatch({ type: 'SET_IsShowDeleteModal', payload: { isShowDeleteModal: true, } })
                      dispatch({ type: 'SET_commentID', payload: { commentID: comment.id, } })
                    }}
                  >
                    حذف
                  </Button>
                  <Button
                  className="border-0 py-md-3 px-md-4 bg-success ms-2 fw-bold"
                    onClick={() => {
                      dispatch({ type: 'SET_IsShowEditModal', payload: { isShowEditModal: true, } })
                      dispatch({ type: 'SET_MainCommentBody', payload: { mainCommentBody: comment.body } });
                      dispatch({ type: 'SET_commentID', payload: { commentID: comment.id, } })
                    }}
                  >
                    ویرایش
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ErrorBox msg="هیچ کامنتی یافت نشد" />
      )}

      {state.isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <p className="text-modal my-3 fw-bold">{state.mainCommentBody}</p>
        </DetailsModal>
      )}

      {state.isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید؟"
          cancelAction={closeDeleteModal}
          submitAction={deleteComment}
        />
      )}
      {state.isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateComment}>
          <textarea
          className="my-3 p-2 w-100 border border-1 border-secondary"
            value={state.mainCommentBody}
            onChange={(event) => dispatch({ type: 'SET_MainCommentBody', payload: { mainCommentBody: event.target.value } })}
          ></textarea>
        </EditModal>
      )}
    </div>
  );
}
