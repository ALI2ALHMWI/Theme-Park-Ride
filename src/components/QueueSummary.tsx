interface QueueSummaryProps {
  waitingGroupsCount: number;
  waitingRidersCount: number;
  boardedCount: number;
}

function QueueSummary({
  waitingGroupsCount,
  waitingRidersCount,
  boardedCount,
}: QueueSummaryProps) {
  return (
    <section className="queue-summary" aria-label="Queue summary">
      <article className="queue-stat-card">
        <span className="queue-stat-label">Groups waiting</span>
        <strong className="queue-stat-value">{waitingGroupsCount}</strong>
      </article>

      <article className="queue-stat-card">
        <span className="queue-stat-label">Riders waiting</span>
        <strong className="queue-stat-value">{waitingRidersCount}</strong>
      </article>

      <article className="queue-stat-card">
        <span className="queue-stat-label">Groups boarded</span>
        <strong className="queue-stat-value">{boardedCount}</strong>
      </article>
    </section>
  );
}

export default QueueSummary;
