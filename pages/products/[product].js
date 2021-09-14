import styles from "../../styles/descriptionProduct.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import React, { useContext, useState } from "react";
import { BasketContext } from "../../components/Container/Context";

export default function Slug({ currentProduct }) {
  const router = useRouter();

  const { basket, setBasket } = useContext(BasketContext);

  const product = basket.find((item) => item.name === currentProduct.name);

  const addToBasket = () => {
    const arrayBasket = [...basket];

    arrayBasket.push({
      name: currentProduct.name,
      quantity: 1,
      price: currentProduct.price,
      totalPrice: currentProduct.price,
      image: currentProduct.image,
      type: currentProduct.type,
      brand: currentProduct.brand,
    });

    setBasket(arrayBasket);
  };

  const arrayBasket = [...basket];

  const more = () => {
    const currentObject = arrayBasket.find(
      (item) => item.name === currentProduct.name
    );
    currentObject.quantity++;

    const total = currentObject.quantity * currentObject.price;
    currentObject.totalPrice = total;

    setBasket(arrayBasket);
  };

  const less = () => {
    if (product.quantity > 1) {
      const currentObject = arrayBasket.find(
        (item) => item.name === currentProduct.name
      );

      currentObject.quantity--;

      const total = currentObject.quantity * currentObject.price;
      currentObject.totalPrice = total;
    } else {
      arrayBasket.pop();
    }
    setBasket(arrayBasket);
  };

  return (
    <>
      <Head>
        <meta name="description" content={currentProduct.description} />
        <title>{currentProduct.type + " " + router.query.product}</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.image}>
          <Image
            src={currentProduct.image}
            width="1600"
            height="1600"
            layout="responsive"
            quality="50"
            blurDataURL
            alt={currentProduct.type}
          />
        </div>
        <div className={styles.description}>
          <div className={styles.top}>
            <h2>
              {currentProduct.type} : {currentProduct.brand}{" "}
              {currentProduct.name}
            </h2>

            <p>{currentProduct.price} €</p>
          </div>

          <p>{currentProduct.description}</p>
          <div className={styles.bottom}>
            <div className={styles.opinions}>
              <p>{currentProduct.opinions} avis</p>
              <p>
                {currentProduct.note} / 5<i className="fas fa-star"></i>
              </p>
            </div>

            <div className={styles.buttons}>
              {product === undefined ? (
                <button onClick={addToBasket}>Ajouter au panier</button>
              ) : (
                <div className={styles.more_less}>
                  <button onClick={less}>
                    <i className="far fa-minus-square"></i>
                  </button>

                  <div className={styles.value}>{product.quantity}</div>

                  <button onClick={more}>
                    <i className="far fa-plus-square"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Link href="/basket">
        <a className={styles.link_basket}>
          aller au panier <i className="fas fa-shopping-cart"></i>
        </a>
      </Link>
    </>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.product;

  const json = await import(`/public/data.json`);
  const array = json.products;

  const currentProduct = array.find((item) => item.name === slug);

  return {
    props: {
      currentProduct,
    },
  };
}

export async function getStaticPaths() {
  const json = await import(`/public/data.json`);
  const array = json.products;

  const paths = array.map((item) => ({
    params: { product: item.name },
  }));

  return {
    paths,
    fallback: false,
  };
}
