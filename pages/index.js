import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import imgHome from "/public/assets/fond.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Premier site de vente en ligne de matériel informatique"
        />
        <title>Accueil GEEK-SHOP</title>
      </Head>

      <main className={styles.container}>
        <section>
          <div className={styles.img_home}>
            <Image
              src={imgHome}
              width="1920"
              height="1280"
              layout="responsive"
              placeholder="blur"
              quality="50"
              alt="set-up gaming"
            />
          </div>
          <h1 className={styles.title}>Bienvenue sur Geek Shop</h1>
        </section>
      </main>
    </>
  );
}
