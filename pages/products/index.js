import styles from "../../styles/Products.module.scss";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { BasketContext } from "../../components/Container/Context";

export default function Products({ array }) {
  const { images } = useContext(BasketContext);

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
                      src={images[id]}
                      width="1600"
                      height="1600"
                      layout="responsive"
                      quality="1"
                      placeholder="blur"
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

  return {
    props: {
      array,
    },
  };
}
