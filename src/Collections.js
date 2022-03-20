import React, { useState, useEffect } from "react";
import { Header, Dropdown, Grid } from "semantic-ui-react";
import ls from "local-storage";
import Pokedex from "pokedex-promise-v2";
import PokemonCard from "./PokemonCard";

const P = new Pokedex();
const R = require("ramda");
const { Row, Column } = Grid;
const pokemonPerRow = 4;

const getPokemonData = async (pokemonCollection) => {
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

const Collections = () => {
    const [pokemonData, setPokemonData] = useState([]);

    const rows = R.splitEvery(pokemonPerRow, pokemonData);

    useEffect(
        () =>
            getPokemonData(ls("pokemon")).then((data) => setPokemonData(data)),
        []
    );

    return (
        <div className="collections">
            <Header style={{ marginTop: "40px" }}>My Collections</Header>
            <Dropdown text="Pokemon">
                <Dropdown.Menu>
                    <Dropdown.Item text="Pokemon" />{" "}
                    <Dropdown.Item disabled text="Coming soon: Footballers" />{" "}
                </Dropdown.Menu>
            </Dropdown>
            {pokemonData && (
                <Grid style={{ marginTop: "30px" }}>
                    {rows.map((row, i) => (
                        <Row columns={pokemonPerRow}>
                            {row.map((pokemon) => (
                                <Column>
                                    <PokemonCard
                                        pokemon={pokemon.data}
                                        size="small"
                                    />
                                </Column>
                            ))}
                        </Row>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default Collections;
