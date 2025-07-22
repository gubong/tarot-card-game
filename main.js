// Tarot card data (메이저 아르카나 3장 예시, 전체 확장 가능)
const tarotCards = [
  {
    id: 0,
    name: "The Fool",
    image: "cards/0-the-fool.png",
    upright: "새로운 시작, 순수, 자유, 잠재력",
    reversed: "무모함, 방향 상실, 경솔함"
  },
  {
    id: 1,
    name: "The Magician",
    image: "cards/1-the-magician.png",
    upright: "의지, 창조력, 자원, 집중력",
    reversed: "속임수, 기회 상실, 의지 부족"
  },
  {
    id: 2,
    name: "The High Priestess",
    image: "cards/2-the-high-priestess.png",
    upright: "직관, 잠재의식, 신비, 내면의 소리",
    reversed: "비밀, 혼란, 자기기만, 내면과의 단절"
  }
  // ... (전체 22장 확장 가능)
];

function shuffleDeck(deck) {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function drawCards(mode) {
  const shuffled = shuffleDeck(tarotCards);
  return shuffled.slice(0, mode).map(card => ({
    ...card,
    reversed: Math.random() < 0.5
  }));
}

function renderCards(cards) {
  const $cards = document.getElementById('tarot-cards');
  $cards.innerHTML = '';
  cards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'tarot-card' + (card.reversed ? ' reversed' : '');
    div.innerHTML = `
      <img src="${card.image}" alt="${card.name}" />
      <div class="tarot-card-name">${card.name} ${card.reversed ? '(역방향)' : '(정방향)'}</div>
      <div class="tarot-card-meaning">${card.reversed ? card.reversed : card.upright}</div>
    `;
    $cards.appendChild(div);
  });
}

function renderResult(cards) {
  const $result = document.getElementById('tarot-result');
  if (!cards.length) return $result.innerHTML = '';
  $result.innerHTML = `<h2>해석</h2><ul>${cards.map(card => `<li><strong>${card.name} ${card.reversed ? '(역방향)' : '(정방향)'}:</strong> ${card.reversed ? card.reversed : card.upright}</li>`).join('')}</ul>`;
}

let currentCards = [];

function handleDraw(mode) {
  currentCards = drawCards(mode);
  renderCards(currentCards);
  renderResult(currentCards);
}

document.getElementById('one-card').onclick = () => handleDraw(1);
document.getElementById('three-card').onclick = () => handleDraw(3);
document.getElementById('shuffle').onclick = () => {
  currentCards = [];
  renderCards([]);
  renderResult([]);
};
