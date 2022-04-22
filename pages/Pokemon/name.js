/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import PokeCss from '../../styles/Poke.module.css';

export default function pokemon({ pokemon }) {
    return (
        <Layout title={pokemon.name}>
            <h1>
                {pokemon.id}. {pokemon.name}
            </h1>
            <img  src={pokemon.image} alt={pokemon.name} />
            <p>
                <span >Weight:</span> {pokemon.weight}
            </p>
            <p>
                <span >Height:</span>
                {pokemon.height}
            </p>
            <h2 >Types</h2>
            {pokemon.types.map((type, index) => (
                <p key="index">{type.type.name}</p>
            ))}
            <p >
                <Link href="/">
                    <a >Home</a>
                </Link>
            </p>
        </Layout>
    );
}

export async function getServerSideProps({ query }) {
    const { name } = query;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await res.json();
    return {
        props: {
            pokemon
        }
    };
}