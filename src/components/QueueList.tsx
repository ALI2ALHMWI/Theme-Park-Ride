import  { QUEUE } from "../types/queue";
import QueueEntryCard from "./QueueEntryCard";

interface QueueListProps  {
  queue: QUEUE[];
};

function QueueList({ queue }: QueueListProps) {
  if (queue.length === 0) {
    return <p className="queue-empty">No groups are waiting right now.</p>;
  }

  return (
    <ul className="queue-list">
      {queue.map((entry, index) => (
        <QueueEntryCard
          key={entry.id}
          entry={entry}
          position={index + 1}
          isNext={index === 0}
        />
      ))}
    </ul>
  );
}

export default QueueList;
