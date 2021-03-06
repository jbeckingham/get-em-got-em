import "./App.css";
import MatchingGame from "./MatchingGame";
import Collections from "./Collections";
import Settings from "./Settings";
import { slide as Menu } from "react-burger-menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ls from "local-storage";

const App = () => {
    const collectionType = ls("settings")?.collectionType ?? "stars";
    return (
        <div id="outer-container">
            <main id="page-wrap">
                <Menu width={200} className="nav-menu" left>
                    <a class="nav-menu-item" href="/" key="1">
                        <span>Play</span>
                    </a>
                    <a class="nav-menu-item" href="/collections" key="2">
                        <span>Collections</span>
                    </a>
                    <a class="nav-menu-item" href="/settings" key="3">
                        <span>Settings</span>
                    </a>
                </Menu>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" index element={<MatchingGame />} />
                        <Route path="collections" element={<Collections />} />
                        <Route path="settings" element={<Settings />} />
                    </Routes>
                </BrowserRouter>
                {collectionType === "pokemon" && (
                    <p class="disclaimer">
                        Pokémon and Pokémon character names are trademarks of
                        Nintendo.
                    </p>
                )}
            </main>
        </div>
    );
};

export default App;
