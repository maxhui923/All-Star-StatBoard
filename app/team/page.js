"use client";
import React, { useState, useEffect } from "react";

async function fetchAllTeams() {
  try {
    const response = await fetch(`https://www.balldontlie.io/api/v1/teams`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchRandomTeamsInfo() {
  try {
    const randomTeamId = Math.floor(Math.random() * 30) + 1;

    const response = await fetch(
      `https://www.balldontlie.io/api/v1/teams/${randomTeamId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default function Team() {
  const [teams, setTeams] = useState([]);
  const [showAllTeamsInfo, setShowAllTeamsInfo] = useState(false);
  const [randomTeamInfo, setRandomTeamInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const teams = await fetchAllTeams();
      setTeams(teams);
    };
    fetchData();
  }, []);

  const handleRandomTeamInfoClick = async () => {
    const info = await fetchRandomTeamsInfo();
    setRandomTeamInfo(info);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Teams</h1>

      <div className="flex mt-4 space-x-4">
        <button
          onClick={() => setShowAllTeamsInfo(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Show All Teams Info
        </button>

        <button
          onClick={handleRandomTeamInfoClick}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Random Team Info
        </button>
      </div>

      <div className="flex mt-4 space-x-4">
        {showAllTeamsInfo && (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Team</th>
                <th className="border px-4 py-2">Conference</th>
                <th className="border px-4 py-2">Division</th>
                <th className="border px-4 py-2">City</th>
                <th className="border px-4 py-2">Abbreviation</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td className="border px-4 py-2">{team.full_name}</td>
                  <td className="border px-4 py-2">{team.conference}</td>
                  <td className="border px-4 py-2">{team.division}</td>
                  <td className="border px-4 py-2">{team.city}</td>
                  <td className="border px-4 py-2">{team.abbreviation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {randomTeamInfo && (
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Random Team Info</h2>
            <p className="mb-2">Team: {randomTeamInfo.full_name}</p>
            <p className="mb-2">Conference: {randomTeamInfo.conference}</p>
            <p className="mb-2">Division: {randomTeamInfo.division}</p>
            <p className="mb-2">City: {randomTeamInfo.city}</p>
            <p className="mb-2">Abbreviation: {randomTeamInfo.abbreviation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
