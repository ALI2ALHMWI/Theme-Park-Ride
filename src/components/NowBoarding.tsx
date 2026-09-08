import { QUEUE } from "../types/queue";

interface NowBoardingProps  {
  entry: QUEUE | null;
};

function NowBoarding({ entry }: NowBoardingProps) {
  return (
    <section className="now-boarding" aria-live="polite">
      <div>
        <p className="now-boarding-label">Now Boarding</p>

        {entry ? (
          <>
            <h2 className="now-boarding-name">{entry.groupName}</h2>
            <p className="now-boarding-meta">
              {entry.riders} {entry.riders === 1 ? "rider" : "riders"}
            </p>
          </>
        ) : (
          <p className="no-boarding-yet">No group has boarded yet.</p>
        )}
      </div>
    </section>
  );
}

export default NowBoarding;
