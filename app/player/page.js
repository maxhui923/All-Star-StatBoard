"use client";
import React, { useState, useEffect } from "react";
import PlayerItem from "./PlayerItem.js";

async function fetchPlayerStatById(id) {
  try {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/season_averages?season=2023&player_ids[]=${id}&postseason=false`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchPlayerInfoByName(name) {
  try {
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/players?search=${name}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Player() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayerStats, setSelectedPlayerStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() !== "") {
        const playerInfo = await fetchPlayerInfoByName(searchTerm);

        const filtered = playerInfo.filter(
          (player) =>
            player.position &&
            player.height_feet &&
            player.height_inches &&
            player.weight_pounds &&
            player.team &&
            player.team.full_name &&
            player.team.conference &&
            player.team.division &&
            player.team.city &&
            player.team.abbreviation
        );

        setFilteredPlayers(filtered);
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePlayerStatButtonClick = async (id) => {
    const playerStat = await fetchPlayerStatById(id);

    if (!playerStat || playerStat.length === 0) {
      window.alert("No stats available in season 2023.");
    } else {
      setSelectedPlayerStats((prevStats) => ({
        ...prevStats,
        [id]: playerStat,
      }));
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Players</h1>
      <label htmlFor="searchInput" className="block text-lg mb-2">
        Enter Player Name:
      </label>
      <input
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={handleSearchInputChange}
        className="text-black w-half p-2 border border-gray-300 rounded"
      />
      <div className="flex flex-wrap gap-4 mt-4">
        {filteredPlayers.map((player) => (
          <PlayerItem
            key={player.id}
            player={player}
            onPlayerStatButtonClick={handlePlayerStatButtonClick}
            selectedPlayerStats={selectedPlayerStats}
          />
        ))}
      </div>
    </div>
  );
}
