import React, { useState, useEffect } from "react";
import { Header, Dropdown, Grid } from "semantic-ui-react";
import ls from "local-storage";
import PokemonCollection from "./Collections/Pokemon";
import StarCollection from "./Collections/Stars";

const R = require("ramda");
const defaultType = "stars";

const options = [
    { key: "pokemon", value: "pokemon", text: "Pokemon" },
    { key: "stars", value: "stars", text: "Stars" },
];

const Collections = () => {
    const [collectionType, setCollectionType] = useState(
        ls("settings")?.collectionType ?? defaultType
    );
    const placeholder =
        collectionType.charAt(0).toUpperCase() + collectionType.slice(1);
    const onChangeType = (event, target) => setCollectionType(target.value);

    return (
        <div className="collections">
            <Header style={{ marginTop: "40px" }}>My Collections</Header>
            <Dropdown
                style={{ marginTop: "30px" }}
                onChange={onChangeType}
                placeholder={placeholder}
                options={options}
                item
            />
            {collectionType === "pokemon" && <PokemonCollection />}
            {collectionType === "stars" && <StarCollection />}
        </div>
    );
};

export default Collections;
