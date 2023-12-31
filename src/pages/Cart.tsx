import { FC, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import cart from "../static/cart.svg";
import trash from "../static/trash.svg";
import greyArrowLeft from "../static/grey-arrow-left.svg";

import { CartItem } from "../redux/cart/types";
import { clearItems } from "../redux/cart/slice";
import { selectCart } from "../redux/cart/selectors";

import CartEmpty from "../components/CartEmpty";
import UiPreloader from "../components/UiPreloader/UiPreloader";

const CartItemBlock = lazy(() => import("../components/CartItemBlock"));

const Cart: FC = () => {
  const { items, totalPrice } = useSelector(selectCart);

  const dispatch = useDispatch();

  const onClickClear = () => {
    if (window.confirm("Ты точно хочешь очистить корзину?")) {
      dispatch(clearItems());
    }
  };

  const totalCount = items.reduce((sum: number, item: any) => {
    return sum + item.count;
  }, 0);

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="wrapper">
      <div className="content">
        <div className="container container--cart">
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">
                <img src={cart} alt="cart" />
                Корзина
              </h2>
              <div className="cart__clear" onClick={onClickClear}>
                <img src={trash} alt="trash" />
                <span>Очистить корзину</span>
              </div>
            </div>
            <div className="cart__items">
              <Suspense fallback={<UiPreloader />}>
                {items.map((item: CartItem) => (
                  <CartItemBlock key={item.id} {...item} />
                ))}
              </Suspense>
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  Всего пицц: <b>{totalCount} шт.</b>
                </span>
                <span>
                  Сумма заказа: <b>{totalPrice} ₽</b>
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link
                  to="/"
                  className="button button--outline button--add go-back-btn"
                >
                  <img src={greyArrowLeft} alt="grey-arrow-left" />
                  <span>Вернуться назад</span>
                </Link>
                <div className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
