import { useRef } from "react";

import classes from "./produtosOrder.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const ProdutosOrder = (props) => {
  const sizeInputRef = useRef("");
  const quantityInputRef = useRef("");

  const submitHandler = () => {
    const enteredSize = sizeInputRef.current.value;
    const enteredQuantity = quantityInputRef.current.value;

    let formIsValid = false;

    if (props.sizes) {
      formIsValid = isNotEmpty(enteredSize) && isNotEmpty(enteredQuantity);
    } else {
      formIsValid = isNotEmpty(enteredQuantity);
    }

    if (!formIsValid) {
      console.log("formulario inválido");
      return;
    }

    const order = {
      name: props.name,
      img: props.img,
      price: props.price,
      id: props.id,
      size: enteredSize || null,
      quantity: enteredQuantity,
    };

    console.log(order);
  };

  return (
    <section className={classes.produtosOrderWrapper}>
      <img src={props.img} alt={props.name} />
      <div className={classes.produtosInfo}>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <div className={classes.produtosActions}>
          {props.sizes && (
            <div className={classes.selectInput}>
              <label htmlFor="size">Tamanho</label>
              <select ref={sizeInputRef} name="sizing" id="size">
                <option value="" disabled selected>
                  Escolha o Tamanho
                </option>
                {props.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="quantity">Quantidade</label>
            <input
              placeholder="Peças"
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="5"
              step="1"
              ref={quantityInputRef}
            />
          </div>
        </div>
        <h2>R$ {props.price}</h2>
        <button onClick={submitHandler}>Adicionar à sacola</button>
      </div>
    </section>
  );
};

export default ProdutosOrder;
