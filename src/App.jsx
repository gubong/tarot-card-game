import React, { useState } from "react";
import { tarotCards } from "./data/tarotCards";
import "./App.css";

function shuffleDeck(deck) {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function TarotCard({ card, reversed }) {
  return (
    <div className={`tarot-card${reversed ? " reversed" : ""}`}>
      <img src={card.image} alt={card.name} />
      <div className="tarot-card-name">{card.name} {reversed ? "(역방향)" : "(정방향)"}</div>
      <div className="tarot-card-meaning">{reversed ? card.reversed : card.upright}</div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState([]);
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState(3); // 1장/3장
  const [shuffled, setShuffled] = useState([]);

  const handleShuffle = () => {
    setShuffled(shuffleDeck(tarotCards));
    setSelected([]);
  };

  const handleDraw = () => {
    const draw = shuffled.length ? shuffled : shuffleDeck(tarotCards);
    const picked = draw.slice(0, mode).map(card => ({
      ...card,
      reversed: Math.random() < 0.5
    }));
    setSelected(picked);
    setShuffled(draw.slice(mode));
  };

  return (
    <div className="tarot-app">
      <h1>타로카드 점 보기</h1>
      <input
        type="text"
        placeholder="질문을 입력하세요 (선택)"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <div className="tarot-controls">
        <button onClick={() => setMode(1)}>1장 뽑기</button>
        <button onClick={() => setMode(3)}>3장 뽑기</button>
        <button onClick={handleShuffle}>셔플</button>
        <button onClick={handleDraw}>카드 뽑기</button>
      </div>
      <div className="tarot-cards">
        {selected.map((card, idx) => (
          <TarotCard key={idx} card={card} reversed={card.reversed} />
        ))}
      </div>
      {selected.length > 0 && (
        <div className="tarot-result">
          <h2>해석</h2>
          <ul>
            {selected.map((card, idx) => (
              <li key={idx}>
                <strong>{card.name} {card.reversed ? "(역방향)" : "(정방향)"}:</strong> {card.reversed ? card.reversed : card.upright}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
