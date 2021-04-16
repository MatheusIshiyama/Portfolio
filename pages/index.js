import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../css/Home.module.css";

export default function Home(data) {
    const [scroll, setScroll] = useState(false);
    const [toggle, setToggle] = useState(false);

    const { repositories, avatar } = data;

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        });
    });

    function menuToggle() {
        if (toggle) {
            setToggle(false);
        } else {
            setToggle(true);
        }
    }

    return (
        <>
            <header className={scroll ? styles.sticky : styles.nonSticky}>
                <a href="#" className={styles.logo}>
                    Matheus Ishiyama
                </a>
                <div
                    className={
                        toggle
                            ? [styles.toggle, styles.active].join(" ")
                            : styles.toggle
                    }
                    onClick={menuToggle}
                ></div>
                <ul
                    className={
                        toggle
                            ? [styles.menu, styles.active].join(" ")
                            : styles.menu
                    }
                >
                    <li>
                        <a href="#Home" onClick={menuToggle}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#About" onClick={menuToggle}>
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#Projects" onClick={menuToggle}>
                            Projects
                        </a>
                    </li>
                    <li>
                        <a href="#Contact" onClick={menuToggle}>
                            Contact
                        </a>
                    </li>
                </ul>
            </header>
            <section className={styles.banner} id="Home">
                <div className={styles.textBx}>
                    <h2>
                        Hello, I'm
                        <br /> <span>Matheus Ishiyama</span>
                    </h2>
                    <h3>Full stack Junior Developer</h3>
                    <a href="#About" className={styles.btn}>
                        About Me
                    </a>
                </div>
            </section>
            <section className={styles.about} id="About">
                <div className={styles.heading}>
                    <h2>About</h2>
                </div>
                <div className={styles.content}>
                    <div className={[styles.contentBx, styles.w50].join(" ")}>
                        <h3>Backend Junior Developer</h3>
                        <p>
                            Hi, my name is Matheus, I live in Brazil and I'm 19
                            years old, and love coding. My goal is to be a Full
                            Stack Developer.
                            <br /> <br />
                            <h4>Tecnologies</h4>
                            For now, I'm a FUll Stack Junior Developer, my
                            tecnologies are <strong>Node</strong> and{" "}
                            <strong>MongoDB</strong>.
                            <br /> <br />
                            <h4>Studying</h4>I study on my own, now I'm studying
                            Frontend with <strong>Next.js</strong> and{" "}
                            <strong>React</strong>.
                        </p>
                    </div>
                    <div className={styles.w50}>
                        <img src={avatar} className={styles.img} />
                    </div>
                </div>
            </section>
            <section className={styles.projects} id="Projects">
                <div className={[styles.heading, styles.white].join(" ")}>
                    <h2>Projects</h2>
                    <p>My repository projects in Github.</p>
                </div>
                <div className={styles.content}>
                    {repositories.map((repository, index) => (
                        <a key={index} href={repository.url} className={styles.projectBx}>
                            <h4>{repository.name}</h4>
                        </a>
                    ))}
                </div>
            </section>
            <section className={styles.contact} id="Contact">
                <div className={styles.heading}>
                    <h2>Contact Me</h2>
                    <p>To contact me, use this socials.</p>
                </div>
                <div className={styles.content}>
                    <div className={styles.social}>
                        <h3>E-mail</h3>
                        <p>semrumo3@hotmail.com</p>
                    </div>
                    <div className={styles.social}>
                        <h3>Discord</h3>
                        <p>Bravan#6013</p>
                    </div>
                </div>
            </section>
            <div className={styles.footer}>
                <p>Copyright © 2021 Matheus Ishiyama. All Rights Reserved.</p>
            </div>
        </>
    );
}

export async function getStaticProps() {
    let avatar;
    let repositories = [];
    const response = await axios.get(
        "https://api.github.com/users/MatheusIshiyama/repos"
    );
    response.data.map((repository) => {
        const info = {
            name: repository.name,
            private: repository.private,
            url: repository.html_url,
            fork: repository.fork,
        };
        if (!info.private && !info.fork && info.name != "MatheusIshiyama") {
            avatar = repository.owner.avatar_url;
            repositories.push(info);
        }
    });

    return {
        props: { repositories, avatar: avatar },
    };
}
