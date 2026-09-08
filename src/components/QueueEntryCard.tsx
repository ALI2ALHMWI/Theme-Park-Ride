import  { QUEUE } from "../types/queue";

interface QueueEntryCardProps  {
  entry: QUEUE;
  position: number;
  isNext: boolean;
};

function QueueEntryCard({ entry, position, isNext }: QueueEntryCardProps) {
  return (
    <li className={`queue-card ${isNext ? "next-to-board" : ""}`}>
      <span className="queue-position">
        {String(position).padStart(2, "0")}
      </span>

      <div className="queue-card-info">
        {isNext && <span className="next-label">NEXT TO BOARD</span>}

        <h2 className="queue-group-name">{entry.groupName}</h2>

        <p className="queue-rider-count">
          {entry.riders} {entry.riders === 1 ? "rider" : "riders"}
        </p>
      </div>
    </li>
  );
}

export default QueueEntryCard;
