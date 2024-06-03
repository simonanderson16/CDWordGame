import React, { useEffect, useState } from "react";

const TodaysGame = ({ allGames }: { allGames: Array<Object> }) => {
  const [todaysGame, setTodaysGame] = useState<Object>();

  useEffect(() => {
    const today = new Date();
    const gameForToday = allGames.find((game) => {
      const fromDate = new Date(game.dates.from);
      const toDate = new Date(game.dates.to);
      return fromDate <= today && toDate >= today;
    });
    setTodaysGame(gameForToday);
  }, [allGames]);

  function formatDateString(dateString: string) {
    const date = new Date(dateString);
    return date.toDateString();
  }

  return (
    <div>
      {todaysGame ? (
        <div>
          <div className="today-grid">
            <div className="grid-item-1 grid-item">
              <p className="font-bold">Available Until</p>
              <p className="white-box">
                {formatDateString(todaysGame.dates.to)}
              </p>
            </div>
            <div className="grid-item-2 grid-item">
              <p className="font-bold">Required Letter</p>
              <p className="white-box">{todaysGame.requiredLetter}</p>
            </div>
            <div className="grid-item-3 grid-item">
              <p className="font-bold">Additional Letters</p>
              <p className="white-box">
                {todaysGame.availableLetters.join(" ")}
              </p>
            </div>
            <div className="grid-item-4 grid-item">
              <p className="font-bold">Answers</p>
              <div className="todays-answers">
                {todaysGame.answers.map((answer: string, index: number) => (
                  <p key={index} className="white-box">
                    {answer}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>No game today</h2>
      )}
    </div>
  );
};

export default TodaysGame;
