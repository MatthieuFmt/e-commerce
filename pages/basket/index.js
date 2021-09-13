import React, { useContext, useEffect } from "react";
import styles from "../../styles/basket.module.scss";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { BasketContext } from "../../components/Container/Context";

export default function Index() {
  const { basket, setBasket, price, quantity, command, setCommand } =
    useContext(BasketContext);

  const toCommand = () => {
    setCommand(true);
    setBasket([]);
  };

  useEffect(() => {
    const commandTxt = setTimeout(() => {
      setCommand(false);
    }, 2000);

    return () => {
      clearTimeout(commandTxt);
    };
  }, [command]);

  const arrayBasket = [...basket];

  const more = (id) => {
    const index = basket.findIndex((obj) => {
      return obj.id === id;
    });

    arrayBasket[index].quantity++;

    const total = arrayBasket[index].quantity * arrayBasket[index].price;
    arrayBasket[index].totalPrice = total;

    setBasket(arrayBasket);
  };

  const less = (id) => {
    const index = basket.findIndex((obj) => {
      return obj.id === id;
    });
    if (arrayBasket[index].quantity > 1) {
      arrayBasket[index].quantity--;

      const total = arrayBasket[index].quantity * arrayBasket[index].price;
      arrayBasket[index].totalPrice = total;
    } else {
      arrayBasket.pop();
    }
    setBasket(arrayBasket);
  };

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Premier site de vente en ligne de matériel informatique"
        />
        <title>Panier</title>
      </Head>
      <main className={styles.container}>
        <section>
          <h3>Votre panier</h3>
          <div>Nombre d&#39;articles : {quantity}</div>
        </section>

        <ul>
          {basket.map((article, id) => {
            return (
              <li key={id}>
                <div className={styles.left}>
                  <div className={styles.image}>
                    <Image
                      src={article.image}
                      width="1600"
                      height="1600"
                      layout="responsive"
                      quality="1"
                      alt={article.type}
                    />
                  </div>
                  <div className={styles.details}>
                    <h4>
                      {article.type} {article.brand} {article.name}
                    </h4>
                    <p>prix : {article.totalPrice.toFixed(2)} €</p>
                  </div>
                </div>
                <div className={styles.quantity}>
                  <p>quantité</p>
                  <div className={styles.buttons}>
                    <button onClick={() => less(article.id)}>
                      <i className="far fa-minus-square"></i>
                    </button>

                    <div className={styles.value}>{article.quantity}</div>

                    <button onClick={() => more(article.id)}>
                      <i className="far fa-plus-square"></i>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {basket.length > 0 ? (
          <div className={styles.command}>
            <h5>Total : {price.toFixed(2)} €</h5>
            <button onClick={toCommand}>Commander</button>
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Votre panier est vide</p>
            <p>
              <i className="fas fa-cart-arrow-down"></i>
            </p>
            <Link href="/products">
              <a>Voir tous les produits</a>
            </Link>
          </div>
        )}

        {command && (
          <div className={styles.container_clean}>
            <div className={styles.clean_basket}>Commande effectué !</div>
            <div className={styles.checked}>
              <i className="far fa-check-circle"></i>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
