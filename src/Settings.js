import React, { useState } from "react";
import { Dropdown, Header } from "semantic-ui-react";
import ls from "local-storage";

const collectionOptions = [
    {
        key: "pokemon",
        text: "Pokemon",
        value: "pokemon",
    },
    {
        key: "stars",
        text: "Stars",
        value: "stars",
    },
];

const Settings = () => {
    const settings = ls("settings") ?? {};
    const defaultType =
        settings["collectionType"] ?? collectionOptions[0].value;

    const onCollectionTypeChanged = (event, target) => {
        ls("settings", { ...settings, collectionType: target.value });
    };

    return (
        <div className="settings">
            <Header>Settings</Header>
            <span>
                Collection type:
                <Dropdown
                    style={{ marginLeft: "20px" }}
                    inline
                    options={collectionOptions}
                    onChange={onCollectionTypeChanged}
                    defaultValue={defaultType}
                />
            </span>
        </div>
    );
};

export default Settings;
