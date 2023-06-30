import React, { useReducer } from "react";
import DeleteModal from "./../DeleteModal/DeleteModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import EditModal from "./../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErrorBox from "../Errorbox/Errorbox";
import { Table, Button } from 'react-bootstrap';
import { deleteProduct, updateProduct } from "../../Redux/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import "./ProductsTable.css";

const initialData = {
  isShowDeleteModal: false,
  isShowDetailsModal: false,
  isShowEditModal: false,
  productID: null,
  mainProductInfos: {},
  productData: {
    title: '',
    price: '',
    count: '',
    img: '',
    popularity: '',
    sale: '',
    colors: '',
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_IS_SHOW_DELETE_MODAL':
      return { ...state, isShowDeleteModal: action.payload.isShowDeleteModal };
    case 'SET_IS_SHOW_DETAILS_MODAL':
      return { ...state, isShowDetailsModal: action.payload.isShowDetailsModal };
    case 'SET_IS_SHOW_EDIT_MODAL':
      return { ...state, isShowEditModal: action.payload.isShowEditModal };
    case 'SET_PRODUCT_ID':
      return { ...state, productID: action.payload.productID };
    case 'SET_MAIN_PRODUCT_INFOS':
      return { ...state, mainProductInfos: action.payload.mainProductInfos };
    case 'SET_PRODUCT_DATA':
      return { ...state, productData: action.payload.productData };
    default:
      throw new Error(`Unsupported action type ${action.type} in ProductsReducer`);
  }
}

export default function ProductsTable() {

  const [state, dispatch] = useReducer(reducer, initialData);
  const reduxDispatch = useDispatch();
  const { products: allProducts } = useSelector(state => state.products);

  const deleteModalCancelAction = () => {
    dispatch({ type: 'SET_IS_SHOW_DELETE_MODAL', payload: { isShowDeleteModal: false } });
  };

  const deleteModalSubmitAction = () => {
    dispatch({ type: 'SET_IS_SHOW_DELETE_MODAL', payload: { isShowDeleteModal: false } });
    reduxDispatch(deleteProduct(state.productID));
  };

  const closeDetailsmodal = () => {
    dispatch({ type: 'SET_IS_SHOW_DETAILS_MODAL', payload: { isShowDetailsModal: false } });
  };

  const updateProductInfos = (event) => {
    event.preventDefault();

    reduxDispatch(updateProduct(state.productData));
    dispatch({ type: 'SET_IS_SHOW_EDIT_MODAL', payload: { isShowEditModal: false } });
  };

  function setNewProductData(event, propertyName) {
    dispatch({
      type: 'SET_PRODUCT_DATA',
      payload: {
        productData: {
          ...state.productData,
          [propertyName]: event.target.value
        }
      }
    });
  }

  return (
    <>
      {allProducts.length ? (
        <div>
          <div className="product-item product-item-title flexBasic text-dark bg-light px-2 mt-3">
            <p className="flexBasic product-img-wrapper text-center fw-bold"> عکس </p>
            <p className="w-25 text-center fw-bold"> عنوان </p>
            <p className="w-25 text-center fw-bold"> قیمت </p>
            <p className="w-25 text-center fw-bold"> تعداد </p>
            <p className="product-btnGroup text-center fw-bold"> عملیات </p>
          </div>
          {allProducts.map((product) => (
            <div key={product.id} className="product-item flexBasic text-dark bg-light px-2 mt-2">
              <div className="product-img-wrapper">
                <img
                  src={product.img}
                  alt="oil image"
                />
              </div>
              <p className="w-25 text-center">{product.title}</p>
              <p className="w-25 text-center">{product.price} تومان</p>
              <p className="w-25 text-center">{product.count}</p>
              <div className="product-btnGroup">
                <Button
                  className="btn-info border-0 py-md-3 px-md-3 fw-bold"
                  onClick={() => {
                    dispatch({ type: 'SET_IS_SHOW_DETAILS_MODAL', payload: { isShowDetailsModal: true } })
                    dispatch({ type: 'SET_MAIN_PRODUCT_INFOS', payload: { mainProductInfos: product } })
                  }}
                >
                  جزییات
                </Button>
                <Button
                  className="btn-danger border-0 py-md-3 px-md-3 fw-bold me-2"
                  onClick={() => {
                    dispatch({ type: 'SET_IS_SHOW_DELETE_MODAL', payload: { isShowDeleteModal: true } })
                    dispatch({ type: 'SET_PRODUCT_ID', payload: { productID: product.id } });
                  }}
                >
                  حذف
                </Button>
                <Button
                  className="btn-success border-0 py-md-3 px-md-3 fw-bold me-2"
                  onClick={() => {
                    dispatch({ type: 'SET_IS_SHOW_EDIT_MODAL', payload: { isShowEditModal: true } })
                    dispatch({ type: 'SET_PRODUCT_ID', payload: { productID: product.id } });
                    dispatch({ type: 'SET_PRODUCT_DATA', payload: { productData: product } });
                  }}
                >
                  ویرایش
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ErrorBox msg="هیچ محصولی یافت نشد" />
      )}

      {state.isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید ؟"
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
        />
      )}
      {state.isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsmodal}>
          <Table striped bordered hover className="my-3 text-center">
            <thead>
              <tr>
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگ بندی</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{state.mainProductInfos.popularity}</td>
                <td>{state.mainProductInfos.sale}</td>
                <td>{state.mainProductInfos.colors}</td>
              </tr>
            </tbody>
          </Table>
        </DetailsModal>
      )}
      {state.isShowEditModal && (
        <EditModal
          className="my-3 p-2 w-100 border border-1 border-secondary"
          onClose={() => dispatch({ type: 'SET_IS_SHOW_EDIT_MODAL', payload: { isShowEditModal: false } })}
          onSubmit={updateProductInfos}
        >
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-product-input"
              value={state.productData.title}
              onChange={(event) => setNewProductData(event, 'title')} />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="قیمت جدید را وارد کنید"
              className="edit-product-input"
              value={state.productData.price}
              onChange={(event) => setNewProductData(event, 'price')} />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="موجودی جدید را وارد کنید"
              className="edit-product-input"
              value={state.productData.count}
              onChange={(event) => setNewProductData(event, 'count')} />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="آدرس کاور جدید را وارد کنید"
              className="edit-product-input"
              value={state.productData.img}
              onChange={(event) => setNewProductData(event, 'img')} />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="محبوبیت جدید را وارد کنید"
              className="edit-product-input"
              value={state.productData.popularity}
              onChange={(event) => setNewProductData(event, 'popularity')} />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="میزان فروش جدید را وارد کنید"
              className="edit-product-input"
              value={state.productData.sale}
              onChange={(event) => setNewProductData(event, 'sale')} />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="تعداد رنگ بندی جدید را وارد کنید"
              className="edit-product-input"
              value={state.productData.colors}
              onChange={(event) => setNewProductData(event, 'colors')} />
          </div>
        </EditModal>
      )}
    </>
  );
}
