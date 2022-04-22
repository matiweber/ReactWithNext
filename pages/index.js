/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React from 'react';
import Link from 'next/link';
import HomeCss from '../styles/Home.module.css';

export default function Home({ mapPoke }) {
  // console.log ("mapPoke", mapPoke);
  return (
    <>
      
      
      
        <ul className={HomeCss.columns}>
          {mapPoke.map((pokemon, index) => {
            return (
              <li >
                <Link href={{
                  pathname: '/Pokemon/name',
                  query: { name: pokemon.name }
                }}>
                  <a>
                    {/* I give the class based on each type of pokemon */}
                    <div className={`${HomeCss.card} ${pokemon.types[0].type.name}`}>
                      <div className={HomeCss.nameType}>
                        <h3>{pokemon.name}</h3>
                        <div className={HomeCss.types}>
                          {pokemon.types.map((types, index) => {
                            return (
                              <p className={HomeCss.type}>{types.type.name}</p>
                            )
                          })}
                        </div>
                        <img 
                          src={pokemon.image}
                          heigt="100" 
                          width={100}
                          className={HomeCss.image}
                          alt="image pokemon"
                        />
                      </div>  
                    </div>
                  </a>
                </Link>
              </li>
            )
          })}

        </ul>
      

    </>
  )
}

export async function getServerSideProps() {
  const giveMePokemon = (number) => {
    return fetch (`https://pokeapi.co/api/v2/pokemon/${number}`)
    .then(response => response.json())
    .then(data => data)

    .catch (error => alert(error));
  }

  let arrayPokemon = [];
  //stars in 1 because 0 is not a pokemon
  for (let index = 1; index <= 151; index++) {
    let data = await giveMePokemon(index);
    arrayPokemon.push(data);
  }

  let mapPoke  = arrayPokemon.map(pokemon => {
    return({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.dream_world.front_default,
      types: pokemon.types,
    })
  })

  return {
    props: {
      mapPoke
    },
  }
}