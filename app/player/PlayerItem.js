// PlayerItem.js
import React from "react";

const PlayerItem = ({
  player,
  onPlayerStatButtonClick,
  selectedPlayerStats,
}) => {
  return (
    <li key={player.id} className="mt-2 flex flex-row">
      <div>
        <h2>{`${player.first_name} ${player.last_name}`}</h2>
        <p>Position: {player.position}</p>
        <p>
          Height: {player.height_feet}'{player.height_inches}"
        </p>
        <p>Weight: {player.weight_pounds} lbs</p>
        <p>Team: {player.team.full_name}</p>
        <p>Conference: {player.team.conference}</p>
        <p>Division: {player.team.division}</p>
        <p>City: {player.team.city}</p>
        <p>Abbreviation: {player.team.abbreviation}</p>
        <button
          onClick={() => onPlayerStatButtonClick(player.id)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Player Stats
        </button>
      </div>
      {selectedPlayerStats[player.id] && selectedPlayerStats[player.id][0] && (
        <div className="mt-2">
          <h3>{`${player.first_name} ${player.last_name}`}</h3>
          <h2>Season 2023 Avg Stats</h2>
          <table className="border-collapse border border-gray-800">
            <thead>
              <tr>
                <th className="border border-gray-800 px-4 py-2">Stat</th>
                <th className="border border-gray-800 px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(selectedPlayerStats[player.id][0]).map(
                ([stat, value]) => (
                  <tr key={stat}>
                    <td className="border border-gray-800 px-4 py-2">{stat}</td>
                    <td className="border border-gray-800 px-4 py-2">
                      {value}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </li>
  );
};

export default PlayerItem;
