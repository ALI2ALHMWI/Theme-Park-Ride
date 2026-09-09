import  { QUEUE } from "../types/queue";

interface RecentlyBoardedProps  {
  entries: QUEUE[];
};

function RecentlyBoarded({ entries }: RecentlyBoardedProps) {
  return (
    <section className="recently-boarded" aria-live="polite">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow">Boarding history</p>
          <h2 className="recently-boarded-title">Recently boarded</h2>
        </div>

        <span className="recently-boarded-count">
          Last {entries.length} {entries.length === 1 ? "group" : "groups"}
        </span>
      </div>

      {entries.length === 0 ? (
        <p className="recently-boarded-empty">No groups have boarded yet.</p>
      ) : (
        <ol className="recently-boarded-list">
          {entries.map((entry, index) => (
            <li className="recently-boarded-item" key={entry.id}>
              <span className="recently-boarded-position">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <strong>{entry.groupName}</strong>
                <p>
                  {entry.riders} {entry.riders === 1 ? "rider" : "riders"}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default RecentlyBoarded;
