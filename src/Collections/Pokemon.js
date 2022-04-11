import React, { useState, useEffect } from "react";
import { Header, Dropdown, Grid } from "semantic-ui-react";
import ls from "local-storage";
import Pokedex from "pokedex-promise-v2";
import PokemonCard from "../Prizes/PokemonCard";
const R = require("ramda");
const { Row, Column } = Grid;

const P = new Pokedex();
const pokemonPerRow = 4;

const PokemonCollection = () => {
    const pokemonCollection = ls("pokemon") ?? [];
    const getPokemonData = async () => {
        const pokemonIds = pokemonCollection.map((pokemon) => pokemon.id);
        const api = await P.getPokemonByName(pokemonIds);
        const data = R.indexBy(R.prop("id"), api);
        return R.sortBy(
            R.prop("id"),
            pokemonCollection.map((item) => ({
                id: item.id,
                number: item.number,
                data: data[item.id],
            }))
        );
    };
    const [pokemonData, setPokemonData] = useState([]);
    const rows = R.splitEvery(pokemonPerRow, pokemonData);
    const complete = pokemonCollection.length === 150;

    useEffect(() => {
        getPokemonData(ls("pokemon")).then((data) => setPokemonData(data));
    }, []);

    return (
        <>
            {pokemonData && (
                <>
                    {complete ? (
                        <Header>
                            You've won all the stars! Congratulations!
                        </Header>
                    ) : (
                        <Header>
                            You have won {pokemonCollection.length} out of 150
                            Pokemon!
                        </Header>
                    )}
                    <Grid>
                        {rows.map((row, i) => (
                            <Row columns={pokemonPerRow}>
                                {row.map((pokemon) => (
                                    <Column>
                                        <PokemonCard
                                            prize={pokemon.data}
                                            size="small"
                                        />
                                    </Column>
                                ))}
                            </Row>
                        ))}
                    </Grid>
                </>
            )}
        </>
    );
};

export default PokemonCollection;
