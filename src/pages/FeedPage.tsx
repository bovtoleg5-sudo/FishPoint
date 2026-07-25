type Catch = {
  fishName: string;
  weight: string;
  place: string;
  date: string;
  photo: string;
  location: string;
  isPublic: boolean;
};

type Props = {
  catches: Catch[];
};

export default function FeedPage({ catches }: Props) {

  const publicCatches = catches.filter(
    (item) => item.isPublic
  );

  return (
    <div className="app">

      <h1>
        🌍 Лента рыбаков
      </h1>

      {publicCatches.length === 0 && (
        <div className="card">
          Пока нет публичных уловов 🎣
        </div>
      )}

      <div className="catches">

        {publicCatches.map((item, index) => (

          <div
            className="catch-card"
            key={index}
          >

            {item.photo && (
              <img
                className="catch-photo"
                src={item.photo}
                alt={item.fishName}
              />
            )}

            <div className="catch-content">

              <h2>
                🐟 {item.fishName}
              </h2>

              <div>
                🌍 Публичный улов
              </div>

              <p>
                ⚖️ Вес: {item.weight} кг
              </p>

              <p>
                📍 {item.place}
              </p>

              <p>
                📅 {item.date}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}