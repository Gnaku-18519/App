import imageLoader from "../../imageLoader";
import Image from 'next/image'
import { Character } from "../../types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import styles from "../../styles/Character.module.css";

function CharacterPage({ character }: { character: Character }) {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <h1>{character.name}</h1>

            <Image
                loader={imageLoader}
                unoptimized
                src={character.image}
                alt={character.name}
                width="200px"
                height="200px">
            </Image>
        </div>
    );
}

export const getServerSideProps:GetServerSideProps = async (context) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`);
    const character = await res.json();

    return {
        props: {
            character
        }
    };
}

CharacterPage.getLayout = function getLayout(page: typeof CharacterPage) {
    return <Layout>{page}</Layout>
}

export default CharacterPage;