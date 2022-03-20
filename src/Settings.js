import React, { useState } from "react";
import { Dropdown, Header } from "semantic-ui-react";

const Settings = () => (
    <div className="settings">
        <Header>Settings</Header>
        <span>
            Collection type:
            <Dropdown
                style={{ marginLeft: "20px", marginTop: "20px" }}
                inline
                text="Pokemon"
            >
                <Dropdown.Menu>
                    <Dropdown.Item text="Pokemon" />
                    <Dropdown.Item disabled text="Coming soon: Footballers" />
                </Dropdown.Menu>
            </Dropdown>
        </span>
    </div>
);

export default Settings;
