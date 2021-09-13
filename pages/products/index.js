import React from "react";
import styles from "../../styles/Products.module.scss";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Products({ array }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Toutes les cartes graphique et processeurs en vente."
        />
        <title>Produits</title>
      </Head>

      <main className={styles.container}>
        <h2>Découvrez tous nos produits</h2>

        <section className={styles.container_cards}>
          {array.map((article, id) => (
            <Link href={"/products/" + article.name} key={id}>
              <a>
                <article className={styles.card}>
                  <div className={styles.image}>
                    <Image
                      src={article.image}
                      width="1600"
                      height="1600"
                      layout="responsive"
                      quality="1"
                      blurDataURL
                      alt={article.type}
                    />
                  </div>

                  <p className={styles.infos}>
                    {article.type} {article.brand}
                  </p>
                  <div className={styles.description}>
                    <h3>{article.name}</h3>
                    <p className={styles.text}>{article.description}</p>

                    <div className={styles.bottom}>
                      <p>
                        {article.note} / 5 <i className="fas fa-star"></i>
                      </p>
                      <p>{article.opinions} avis</p>
                      <p className={styles.price}>{article.price}€</p>
                    </div>
                  </div>
                </article>
              </a>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const json = await import(`/public/data.json`);
  const array = json.products;

  if (array.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      array,
    },
  };
}
