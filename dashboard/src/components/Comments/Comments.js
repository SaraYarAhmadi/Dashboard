import React, { useReducer } from "react";
import ErrorBox from "../Errorbox/Errorbox";
import DetailsModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
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
        <table className="cms-table">
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ</th>
              <th>ساعت</th>
            </tr>
          </thead>

          <tbody>
            {state.allComments.map((comment) => (
              <tr key={comment.id} className="comment-table-tr">
                <td>{comment.userID}</td>
                <td>{comment.productID}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: 'SET_MainCommentBody', payload: { mainCommentBody: comment.body } });
                      dispatch({ type: 'SET_IsShowDetailsModal', payload: { isShowDetailsModal: true, } });
                    }}
                  >
                    دیدن متن
                  </button>
                </td>
                <td>{comment.date}</td>
                <td>{comment.hour}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: 'SET_IsShowDeleteModal', payload: { isShowDeleteModal: true, } })
                      dispatch({ type: 'SET_commentID', payload: { commentID: comment.id, } })
                    }}
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: 'SET_IsShowEditModal', payload: { isShowEditModal: true, } })
                      dispatch({ type: 'SET_MainCommentBody', payload: { mainCommentBody: comment.body } });
                      dispatch({ type: 'SET_commentID', payload: { commentID: comment.id, } })
                    }}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ کامنتی یافت نشد" />
      )}

      {state.isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <p className="text-modal">{state.mainCommentBody}</p>
          <button className="text-modal-close-btn" onClick={closeDetailsModal}>
            بستن
          </button>
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
            value={state.mainCommentBody}
            onChange={(event) => dispatch({ type: 'SET_MainCommentBody', payload: { mainCommentBody: event.target.value } })}
          ></textarea>
        </EditModal>
      )}
    </div>
  );
}
