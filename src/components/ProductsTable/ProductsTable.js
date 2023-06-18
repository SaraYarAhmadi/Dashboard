import React, { useReducer } from "react";
import DeleteModal from "./../DeleteModal/DeleteModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import EditModal from "./../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErrorBox from "../Errorbox/Errorbox";
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

export default function ProductsTable({ allProducts, getAllProducts }) {

  const [state, dispatch] = useReducer(reducer, initialData);

  const deleteModalCancelAction = () => {
    dispatch({ type: 'SET_IS_SHOW_DELETE_MODAL', payload: { isShowDeleteModal: false } })
  };

  const deleteModalSubmitAction = () => {
    const newProduct = allProducts.filter(product => product.id !== state.productID);
    dispatch({ type: 'SET_IS_SHOW_DELETE_MODAL', payload: { isShowDeleteModal: false } })
    getAllProducts(newProduct);

  };

  const closeDetailsmodal = () => {
    dispatch({ type: 'SET_IS_SHOW_DETAILS_MODAL', payload: { isShowDetailsModal: false } })
  };

  const updateProductInfos = (event) => {
    event.preventDefault();

    const newProduct = allProducts.map(product => {
      if (product.id === state.productID) {
        return { ...product, ...state.productData };
      } else {
        return product
      }
    });

    getAllProducts(newProduct);
    dispatch({ type: 'SET_IS_SHOW_EDIT_MODAL', payload: { isShowEditModal: false } });
  };

  function setNewProductData(event, propertyName) {
    dispatch({
      type: 'SET_PRODUCT_DATA',
      payload: {
        productData:{
          ...state.productData,
        [propertyName]: event.target.value
        }        
      }
    });
  }

  return (
    <>
      {allProducts.length ? (
        <table className="products-table">
          <thead>
            <tr className="products-table-heading-tr">
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.id} className="products-table-tr">
                <td>
                  <img
                    src={product.img}
                    alt="oil image"
                    className="products-table-img"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.price} تومان</td>
                <td>{product.count}</td>
                <td>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      dispatch({ type: 'SET_IS_SHOW_DETAILS_MODAL', payload: { isShowDetailsModal: true } })
                      dispatch({ type: 'SET_MAIN_PRODUCT_INFOS', payload: { mainProductInfos: product } })

                    }}
                  >
                    جزییات
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      dispatch({ type: 'SET_IS_SHOW_DELETE_MODAL', payload: { isShowDeleteModal: true } })
                      dispatch({ type: 'SET_PRODUCT_ID', payload: { productID: product.id } });
                    }}
                  >
                    حذف
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      dispatch({ type: 'SET_IS_SHOW_EDIT_MODAL', payload: { isShowEditModal: true } })
                      dispatch({ type: 'SET_PRODUCT_ID', payload: { productID: product.id } });
                      dispatch({ type: 'SET_PRODUCT_DATA', payload: { productData: product } });
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
          <table className="cms-table">
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
          </table>
        </DetailsModal>
      )}
      {state.isShowEditModal && (
        <EditModal
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
