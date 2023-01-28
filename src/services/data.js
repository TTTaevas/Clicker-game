const swords = [
  {
    id: 1,
    bought: false,
    equipped: false,
    level: 0,
    price: 10,
    damage: 1,
    name: "Wooden Sword",
    desc: `The Wooden Sword does 1 damage and cost 10. There is no enchants binded to it yet.`,
    enchant: 0,
  },
  {
    id: 2,
    bought: false,
    equipped: false,
    level: 0,
    price: 1000,
    damage: 5,
    name: "Stone Sword",
    desc: `The Stone Sword does 5 damage and cost 1000. There is no enchants binded to it yet.`,
    enchant: 0,
  },
  {
    id: 3,
    bought: false,
    equipped: false,
    level: 0,
    price: 10000,
    damage: 10,
    name: "Iron Sword",
    desc: `The Iron Sword does 10 damage and cost 10000. There is no enchants binded to it yet.`,
    enchant: 0,
  },
  {
    id: 4,
    bought: false,
    equipped: false,
    level: 0,
    price: 100000,
    damage: 100,
    name: "Diamond Sword",
    desc: `The Diamond Sword does 100 damage and cost 100000. There is no enchants binded to it yet.`,
    enchant: 0,
  },
];
const scrolls = [
  {
    id: 1,
    bought: false,
    equipped: false,
    price: 1000,
    name: "First Scroll",
    handleUse: () => {
      const intervalId = setInterval(
        () => setLife((oldLife) => oldLife - power),
        100
      );
      setTimeout(() => clearInterval(intervalId), 30000);
    },
  },
  {
    id: 2,
    bought: false,
    equipped: false,
    price: 5000,
    name: "Second Scroll",
    handleUse: () => {
      setPower((power = power * 2));
    },
  },
  {
    id: 3,
    bought: false,
    equipped: false,
    price: 8000,
    name: "Third Scroll",
  },
  {
    id: 4,
    bought: false,
    equipped: false,
    price: 15000,
    name: "Fourth Scroll",
  },
];
