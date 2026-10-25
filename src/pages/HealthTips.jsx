import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { TIPS } from "../data/tips";

function HealthTips() {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.items);

  function toggleFavourite(id) {
    if (favourites.includes(id)) {
      dispatch(removeFavourite(id));
    } else {
      dispatch(addFavourite(id));
    }
  }

  return (
    <section className="tab-panel active">
      <div className="panel-top">
        <div>
          <span className="date-pill">💚 Everyday wellness</span>
          <h1 className="panel-title">Health <em>tips</em></h1>
          <p className="panel-sub">Simple, general habits to support your everyday wellbeing.</p>
        </div>
      </div>

      <div className="health-tips-grid">
        {TIPS.map((tip) => {
          const isFav = favourites.includes(tip.id);
          return (
            <div className="card health-tip-card" key={tip.id}>
              <span className="health-tip-icon">{tip.icon}</span>
              <h3>{tip.title}</h3>
              <p>{tip.text}</p>
              <button
                type="button"
                className={"fav-btn" + (isFav ? " is-favourite" : "")}
                aria-pressed={isFav}
                onClick={() => toggleFavourite(tip.id)}
              >
                <span className="fav-heart" aria-hidden="true">{isFav ? "♥" : "♡"}</span>
                <span className="fav-label">{isFav ? "Added to Favourite" : "Add to Favourite"}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HealthTips;
