import React, { useContext, useState, useEffect } from "react";
import styles from "./NavBar.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/assets/logo.png";
import { BasketContext } from "../Container/Context";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState();

  useEffect(() => {
    if (router.route === "/") {
      setActiveNav(1);
    } else if (router.route.includes("products")) {
      setActiveNav(2);
    } else if (router.route.includes("basket")) {
      setActiveNav(3);
    }
  }, [router]);

  const { quantity } = useContext(BasketContext);
  return (
    <header>
      <nav className={styles.navigation}>
        <div className={styles.logo}>
          <Image
            src={logo}
            width="145"
            height="76"
            placeholder="blur"
            quality="1"
            alt="logo geek-shop"
          />
        </div>

        <div className={styles.links}>
          <div className={styles.link}>
            <Link href="/">
              <a className={activeNav === 1 ? styles.active_nav : ""}>
                Accueil
              </a>
            </Link>
          </div>
          <div className={styles.link}>
            <Link href="/products">
              <a className={activeNav === 2 ? styles.active_nav : ""}>
                Produits
              </a>
            </Link>
          </div>
          <div className={styles.link}>
            <Link href="/basket">
              <a className={activeNav === 3 ? styles.active_nav : ""}>
                Panier <i className="fas fa-shopping-basket"></i>
                <span>{quantity}</span>
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
